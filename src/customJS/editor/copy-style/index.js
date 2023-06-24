import not_allowed_to_copy from './allowed_style';
const { dispatch, select } = wp.data;

function isMenuRendredBefore() {
	let menuElementDom = document.getElementById( 'blpge_block_right_menu' );
	if ( typeof menuElementDom != 'undefined' && menuElementDom != null ) {
		return true;
	}
	return false;
}

var source_block;

function createMenu() {
	// check if menu already created
	if ( isMenuRendredBefore() == false ) {
		var menu = [
			{ text: 'Copy style', action: 'copy' },
			{ text: 'Paste style', action: 'paste' },
			{ text: 'Cancel', action: 'cancel' },
		];
		var MenuDiv = document.createElement( 'ul' );
		MenuDiv.className = 'blpge-div-copy';
		MenuDiv.id = 'blpge_block_right_menu';
		var menuLength = menu.length;
		for ( let i = 0; i < menuLength; i++ ) {
			let MenuElement = document.createElement( 'li' );
			MenuElement.innerHTML = menu[ i ].text;
			MenuElement.setAttribute( 'data-action', menu[ i ].action );
			MenuDiv.appendChild( MenuElement );
		}
		document.body.appendChild( MenuDiv );
	}
}

function handelPast( block_id, event ) {
	let target_block = select( 'core/editor' ).getBlock( block_id );
	let target_block_attributes = target_block ? target_block.attributes : null;
	let source_block_attributes = source_block ? source_block.attributes : null;

	let target_block_name = target_block ? target_block.name : NaN;
	let source_block_name = source_block ? source_block.name : NaN;
	if ( source_block != null && target_block_name == source_block_name ) {
		let final_style = {};
		let targe_allowed_style = not_allowed_to_copy[ source_block_name ];
		const target_style =
			target_block_attributes != null
				? Object.entries( target_block_attributes )
				: null;
		const source_style =
			source_block_attributes != null
				? Object.entries( source_block_attributes )
				: null;

		final_style = generate_applied_style(
			source_style,
			target_style,
			targe_allowed_style
		);

		if ( source_block_attributes != null ) {
			dispatch( 'core/editor' ).updateBlockAttributes(
				block_id,
				final_style
			);
		}
		return;
	}
	return;
}

function handelCancel() {
	return;
}

function generate_applied_style(
	source_style,
	target_style,
	targe_allowed_style
) {
	let generated_style = {};
	let objlength = source_style.length;
	let i = 0;
	do {
		try {
			if (
				source_style[ i ][ 1 ] != target_style[ i ][ 1 ] &&
				! targe_allowed_style.includes( source_style[ i ][ 0 ] )
			) {
				generated_style[ source_style[ i ][ 0 ] ] =
					source_style[ i ][ 1 ];
			}
		} catch ( e ) {
			return generated_style;
		}
		i++;
	} while ( i < objlength );
	return generated_style;
}

function handelCopy( block_id ) {
	source_block = select( 'core/block-editor' ).getBlock( block_id );
}

function handelMenuClick( event, block_id ) {
	let trigged_action = event.target.getAttribute( 'data-action' );
	switch ( trigged_action ) {
		case 'copy':
			handelCopy( block_id );
			break;
		case 'paste':
			handelPast( block_id, event );
			break;
		case 'cancel':
			handelCancel();
			break;
	}
	event.target.parentNode.style.display = 'none';
}

function docReady( fn ) {
	if (
		document.readyState === 'complete' ||
		document.readyState === 'interactive'
	) {
		setTimeout( fn, 1 );
	} else {
		document.addEventListener( 'DOMContentLoaded', fn );
	}
}

docReady( function () {
	createMenu();
	var block_id;
	document.addEventListener( 'click', function ( event ) {
		Array.from(
			document.querySelectorAll( '.blpge_block-container' )
		).forEach( ( blockDiv, i ) => {
			blockDiv.addEventListener( 'contextmenu', function ( event ) {
				block_id = select(
					'core/block-editor'
				).getSelectedBlockClientId();

				Array.from(
					document.querySelectorAll( '.blpge-div-copy' )
				).forEach( ( theMenuDiv, i ) => {
					theMenuDiv.style.display = 'none';
				} );
				event.preventDefault();
				let newActiveMenu = document.querySelector( '.blpge-div-copy' );
				newActiveMenu.style.display = 'block';
				newActiveMenu.style.left = event.pageX + 'px';
				newActiveMenu.style.top = event.pageY + 'px';
			} );
		} );
	} );
	Array.from( document.querySelectorAll( '.blpge-div-copy li' ) ).forEach(
		( x, i ) => {
			x.addEventListener( 'click', function ( e ) {
				handelMenuClick( e, block_id );
				e.preventDefault();
			} );
		}
	);
	document.addEventListener( 'click', function () {
		document.getElementsByClassName( 'blpge-div-copy' )[ 0 ].style.display =
			'none';
	} );
} );
