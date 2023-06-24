/**
 * Library component
 */

// Import wp components
const { Component, Fragment } = wp.element;
const { parse } = wp.blocks;

import logo from './logo.js';
import loading from './loading.js';
import BlpgeSideNav from './sidenav';

export default class BlpgeLibrary extends Component {
	constructor( props ) {
		super( ...arguments );
		this.state = {
			catgeory_selected: 'Section',
			sub_categories_list: null,
		};
		this.set_category_selected.bind( this );
		this.set_subCategories_list.bind( this );
	}

	set_category_selected( cat_name ) {
		this.setState( {
			catgeory_selected: cat_name,
		} );
	}

	set_subCategories_list( categories ) {
		this.setState( {
			sub_categories_list: categories,
		} );
	}

	render() {
		// Clear on startup if expired
		let hours = 1;
		let saved = localStorage.getItem( 'blpge_lib' );
		if ( saved && new Date().getTime() - saved > hours * 60 * 60 * 1000 ) {
			localStorage.clear();
			//localStorage.setItem("localAjaxStoreSections", "");
		}

		localStorage.setItem( 'blpge_lib', new Date().getTime() );
		//localStorage.setItem("localAjaxStoreSections", "");

		function set_category_selected( cat_name ) {
			this.setState( {
				catgeory_selected: cat_name,
			} );
		}

		function blpge_lib_category( category, evt, thiss ) {
			let cat_name = jQuery( evt.target ).attr( 'value' );
			jQuery( '.blpge_library__nav__main__element' ).removeClass(
				'blpge_active_cat'
			);
			jQuery( evt.target ).addClass( 'blpge_active_cat' );
			jQuery( '.blpge_library__loading' ).show();
			thiss.set_category_selected( cat_name );
			blpge_get_categories( category, thiss );
			blpge_lib_ajax( category );
		}

		function blpge_get_categories( curent_category, thiss ) {
			// Here request category by parent (id of category)
			let category = curent_category == 'Layout' ? 2 : 3;
			let localLayoutsCategories = localStorage.getItem(
				'localLayoutsCategories'
			);
			let localSectionsCategories = localStorage.getItem(
				'localSectionsCategories'
			);
			let localCategories =
				category == 2
					? localLayoutsCategories
					: localSectionsCategories;

			if ( localCategories != null ) {
				thiss.set_subCategories_list( JSON.parse( localCategories ) );
				return;
			}

			jQuery.ajax( {
				url: blpge_params.ajaxUrl,
				type: 'post',
				dataType: 'json',
				cache: true,
				data: {
					action: 'blpge_get_categories',
					category_id: category, //
				},
				success: function ( response ) {
					thiss.set_subCategories_list( response );
					if ( category == 2 ) {
						localStorage.setItem(
							'localLayoutsCategories',
							JSON.stringify( response )
						);
					} else if ( category == 3 ) {
						localStorage.setItem(
							'localSectionsCategories',
							JSON.stringify( response )
						);
					}
				},
				error: function () {
					console.log( 'Failed to load categories' );
				},
			} );
		}

		function blpge_lib_ajax( category ) {
			let localAjaxdataLayouts = localStorage.getItem(
				'localAjaxStoreLayouts'
			);
			let localAjaxdataSections = localStorage.getItem(
				'localAjaxStoreSections'
			);
			let localAjaxStore =
				category == 'Layout'
					? localAjaxdataLayouts
					: localAjaxdataSections;
			console.log( localAjaxStore );
			if ( localAjaxStore != null ) {
				blpge_library_output( JSON.parse( localAjaxStore ) );
				return;
			}

			jQuery( '.blpge_library__items_wrapper' ).hide();
			jQuery( '.blpge_library__loading' ).show();
			jQuery.ajax( {
				url: blpge_params.ajaxUrl,
				type: 'post',
				dataType: 'json',
				cache: true,
				data: {
					action: 'blpge_get_layouts',
					category_id: category,
				},
				success: function ( response ) {
					blpge_library_output( response );
					if ( category == 'Layout' ) {
						localStorage.setItem(
							'localAjaxStoreLayouts',
							JSON.stringify( response )
						);
					} else if ( category == 'Section' ) {
						localStorage.setItem(
							'localAjaxStoreSections',
							JSON.stringify( response )
						);
					}
				},
				error: function () {
					console.log( 'Failed to load the layouts' );
				},
			} );
		}

		function blpge_library_output( result ) {
			jQuery( '.blpge_library__loading' ).hide();
			let all_layouts = '';
			jQuery.each( result, function ( key, value ) {
				if ( value._embedded[ 'wp:featuredmedia' ] != undefined ) {
					let item_id =
						value._embedded[ 'wp:term' ][ '0' ][ '0' ].name.replace(
							/\s/g,
							''
						) != 'Section'
							? value._embedded[ 'wp:term' ][ '0' ][
									'0'
							  ].name.replace( /\s/g, '' )
							: value._embedded[ 'wp:term' ][ '0' ][
									'1'
							  ].name.replace( /\s/g, '' );
					all_layouts += `
						<div class="blpge_library__body__item" id="${ item_id }">
							<div class="blpge_library__body__item__thumbnail">
								<img src="${ value._embedded[ 'wp:featuredmedia' ][ '0' ].source_url }">
							</div>
							<div class="blpge_library__body__item--overlay">
								<a class="blpge_library__body__item--button" data-tab="${ value.id }">
									<i class="fas fa-download blpge_danwload_layout_icon"></i>
									<i class="fas fa-spinner fa-spin blpge_loading_layout_gif"></i> 
									Import 
								  </a>
							</div>
						</div>
					  `;
				}
			} );
			jQuery( '.blpge_library__items_wrapper' ).show();
			jQuery( '.blpge_library__items_wrapper' ).html( all_layouts );
			jQuery( '.blpge_library__body__item--button' ).bind(
				'click',
				function ( e ) {
					var layout_id = jQuery( this ).attr( 'data-tab' );
					jQuery( '.blpge_danwload_layout_icon', this ).hide();
					jQuery( '.blpge_loading_layout_gif', this ).show();
					jQuery.ajax( {
						url: blpge_params.ajaxUrl,
						type: 'post',
						dataType: 'json',
						data: {
							action: 'blpge_get_layout_by_id',
							blpge_layout_id: layout_id,
						},
						success: function ( response ) {
							let final_block = parse( response );
							wp.data
								.dispatch( 'core/block-editor' )
								.insertBlocks( final_block );
							jQuery( '.blpge_danwload_layout_icon' ).show();
							jQuery( '.blpge_loading_layout_gif' ).hide();
							jQuery( '#blpge-lib' ).css( 'display', 'none' );
						},
						error: function () {
							console.log( 'Failed to import layout' );
						},
					} );
				}
			);
		}

		function blpge_load_library( lib_state ) {
			jQuery( '#blpge-lib' ).css( { display: 'block' } );
			jQuery( '.blpge_library__nav__close' ).click( function () {
				jQuery( '.blpge_library' ).css( { display: 'none' } );
			} );
			let active_category =
				lib_state.state.catgeory_selected == 'Section'
					? 'Section'
					: 'Layout'; // default category value 2 : layouts
			blpge_lib_ajax( active_category );
			blpge_get_categories( active_category, lib_state );
		}

		return (
			<Fragment>
				<div className="blpge_library" id="blpge-lib">
					<div className="blpge_library__wrapper">
						<div className="blpge_library__nav">
							<div className="blpge_library__nav__logo">
								<i class="fas fa-th-large"></i>{ ' ' }
								<span style={ { marginLeft: '5px' } }>
									Library
								</span>
							</div>
							<div className="blpge_library__nav__main">
								<a
									href="#"
									className="blpge_library__nav__main__element"
								>
									Layouts
								</a>
								<a
									onClick={ () =>
										blpge_lib_category(
											'Section',
											event,
											this
										)
									}
									className="blpge_library__nav__main__element blpge_active_cat"
									value="Section"
								>
									Sections
								</a>
								<a
									href="#"
									className="blpge_library__nav__main__element"
								>
									Saved
								</a>
							</div>
							<div className="blpge_library__nav__close">
								{ ' ' }
								<i className="far fa-times-circle"></i>{ ' ' }
							</div>
						</div>
						<div className="blpge_library__content">
							<div className="blpge_library__content__sidebar">
								<div className="blpge_library__menuNav__category">
									<h3>Categories:</h3>
									<BlpgeSideNav
										categories={
											this.state.sub_categories_list
										}
									></BlpgeSideNav>
								</div>
							</div>
							<div className="blpge_library__content__body">
								<div className="blpge_library__loading">
									<img width="70" src={ loading() } />
								</div>
								<div className="blpge_library__items_wrapper"></div>
							</div>
						</div>
					</div>
				</div>
				<a
					href="#"
					className="blpge_layout_button"
					onClick={ () => blpge_load_library( this ) }
				>
					Templates
					<i class="fas fa-th"></i>
				</a>
			</Fragment>
		);
	}
}
