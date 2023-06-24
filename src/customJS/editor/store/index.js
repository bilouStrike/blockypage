import csso from 'csso';
import ejs from 'extract-json-string';

// Import wp dependencies
const { dispatch, select, subscribe, registerStore } = wp.data;

/********************************************************************************************
 *
 * Post CSS Store
 *
 ********************************************************************************************/
// Reducer
function blpge_post_css_reducer( state = {}, action ) {
	if ( action.type === 'ADD_CSS' ) {
		return { ...state, ...action.css };
	} else if ( action.type === 'REMOVE_CSS' ) {
		return action.css;
	}

	return state;
}

// Selectors
function blpge_getCSS( state ) {
	return state;
}

// Actions
function blpge_addCSS( key, value ) {
	let obj = {};
	obj[ key ] = value;
	////(obj);

	return {
		type: 'ADD_CSS',
		css: obj,
	};
}

function blpge_removeCSS( id ) {
	let obj = select( 'blockypage-css' ).getCSS();
	if ( obj[ id ] ) {
		delete obj[ id ];
	}
	return {
		type: 'REMOVE_CSS',
		css: obj,
	};
}

// Remove CSS from the store for removed blocks
// check nested blocks as well
function blpge_blocks_list_loop( blockList = [], result_array ) {
	if ( blockList.length == 0 ) {
		return result_array;
	} else {
		for ( let block of blockList ) {
			if ( block.name.startsWith( 'blockypage' ) ) {
				result_array.push( block.attributes.id );
				if ( block.innerBlocks.length > 0 ) {
					blpge_blocks_list_loop( block.innerBlocks, result_array );
				}
			} else if ( block.name == 'core/block' ) {
				const getPost = select( 'core' ).getEntityRecords(
					'postType',
					'wp_block',
					{ id: block.attributes.ref }
				);
				if ( Array.isArray( getPost ) ) {
					if ( getPost.length > 0 ) {
						for ( const post of getPost ) {
							const block_id = ejs.extract(
								post.content.raw
							)[ 0 ].id;
							result_array.push( block_id );
						}
					}
				}

				////(block);
				if ( block.innerBlocks.length > 0 ) {
					blpge_blocks_list_loop( block.innerBlocks, result_array );
				}
			}
		}
	}
}

subscribe( function () {
	let blpge_blocks_ids = [];
	let currentBlocks = select( 'core/editor' ).getBlocks();

	blpge_blocks_list_loop( currentBlocks, blpge_blocks_ids );

	for ( let property in select( 'blockypage-css' ).getCSS() ) {
		if ( ! blpge_blocks_ids.includes( property ) ) {
			////("Some CSS key has been deleted!");
			dispatch( 'blockypage-css' ).removeCSS( property );
		}
	}
} );

// Registering The custom space for the post css store
let blpge_post_css = 'blockypage-css';
let blpge_store = registerStore( blpge_post_css, {
	reducer: blpge_post_css_reducer,
	selectors: { getCSS: blpge_getCSS },
	actions: { addCSS: blpge_addCSS, removeCSS: blpge_removeCSS },
} );

// Storing CSS on blpge_post_css post meta
blpge_store.subscribe( function () {
	let final_css = '';
	const new_css = select( 'blockypage-css' ).getCSS();
	for ( let css of Object.values( new_css ) ) {
		final_css += css;
	}
	// Compress google fonts imports
	let imports_statements = [];
	let fonts = '';

	// Array of all the import statemnet on the css
	imports_statements = final_css.match(
		/(\@import\ url\(\"https:\/\/fonts.googleapis.com.*?\;)/g
	);

	if ( Array.isArray( imports_statements ) ) {
		if ( imports_statements.length > 0 ) {
			// Remove All import Statement
			final_css = final_css.replace(
				/(\@import\ url\(\"https:\/\/fonts.googleapis.com.*?\;)/g,
				''
			);

			// push the fonts to the arrays
			for ( let ele of imports_statements ) {
				fonts += `${ ele.slice( 53, -3 ) }|`;
			}

			// Remove the last character " | "
			fonts = fonts.slice( 0, -1 );

			// Add single import statement to the top of CSS
			final_css =
				`@import url("https://fonts.googleapis.com/css?family=${ fonts }");` +
				final_css;
		}
	}

	// Save CSS On The Database
	dispatch( 'core/editor' ).editPost( {
		meta: {
			blpge_post_css: csso.minify( final_css, {
				restructure: true,
				forceMediaMerge: true,
			} ).css,
		},
	} );
} );

/********************************************************************************************
 *
 * Device State Store for The blpge mode
 *
 ********************************************************************************************/

// Reducer
function blpge_device_state_reducer( state = '', action ) {
	if ( action.type === 'UPDATE_STORE_STATE' ) {
		return action.newState;
	}
	return state;
}

// Selectors
function blpge_getDeviceState( state ) {
	return state;
}

// Actions
function blpge_updateDeviceState( value ) {
	return {
		type: 'UPDATE_STORE_STATE',
		newState: value,
	};
}

// Registering The custom space for the post css store
let blpge_device_state_store = registerStore( 'blockypage-device-state', {
	reducer: blpge_device_state_reducer,
	selectors: { getDeviceState: blpge_getDeviceState },
	actions: { updateDeviceState: blpge_updateDeviceState },
} );

blpge_device_state_store.subscribe( function () {
	const currentState = select( 'blockypage-device-state' ).getDeviceState();
	if ( select( 'core/editor' ).getEditedPostAttribute( 'meta' ).blpge_mode ) {
		// Inject Classes depending on the state value
		if ( currentState == 'portrait-mobile' ) {
			if ( jQuery( 'body' ).hasClass( 'blpge_is-mobile-portrait' ) ) {
				return;
			} else {
				blpge_remove_device_classes();
				jQuery( 'body' ).addClass( 'blpge_is-mobile-portrait' );
				jQuery( `[data-device=${ currentState }]` ).addClass(
					'blpge_editor_device-icons__span--active'
				);
				jQuery( '.edit-post-visual-editor' ).css(
					'background',
					'#6b6a6a'
				);
			}
		} else if ( currentState == 'landscape-mobile' ) {
			if ( jQuery( 'body' ).hasClass( 'blpge_is-mobile-landscape' ) ) {
				return;
			} else {
				blpge_remove_device_classes();
				jQuery( 'body' ).addClass( 'blpge_is-mobile-landscape' );
				jQuery( `[data-device=${ currentState }]` ).addClass(
					'blpge_editor_device-icons__span--active'
				);
				jQuery( '.edit-post-visual-editor' ).css(
					'background',
					'#6b6a6a'
				);
			}
		} else if ( currentState == 'tablet' ) {
			blpge_remove_device_classes();
			if ( jQuery( 'body' ).hasClass( 'blpge_is-tablet' ) ) {
				return;
			} else {
				blpge_remove_device_classes();
				jQuery( 'body' ).addClass( 'blpge_is-tablet' );
				jQuery( `[data-device=${ currentState }]` ).addClass(
					'blpge_editor_device-icons__span--active'
				);
				jQuery( '.edit-post-visual-editor' ).css(
					'background',
					'#6b6a6a'
				);
			}
		} else {
			blpge_remove_device_classes();
			jQuery( `[data-device=${ currentState }]` ).addClass(
				'blpge_editor_device-icons__span--active'
			);
			jQuery( '.edit-post-visual-editor' ).css( 'background', '#ffffff' );
		}
	}
} );

// Remove Other device Classes function
function blpge_remove_device_classes() {
	const classes = [
		'blpge_is-mobile-portrait',
		'blpge_is-mobile-landscape',
		'blpge_is-tablet',
	];

	for ( const classname of classes ) {
		if ( jQuery( 'body' ).hasClass( classname ) ) {
			jQuery( 'body' ).removeClass( classname );
		}
	}
	jQuery( '.blpge_editor_device-icons__span' ).removeClass(
		'blpge_editor_device-icons__span--active'
	);
}
