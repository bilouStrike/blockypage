/**
 * Accordion Block
 *
 * Changes the className of the icon onClick an item
 * @param {object} DOM Element
 */

function changeAccordionIcon( e ) {
	blpge_accordion = document.getElementById( e );
	blpge_accordionIconClassName = blpge_accordion.childNodes[ 0 ].className;

	if ( RegExp( 'plus' ).test( blpge_accordionIconClassName ) ) {
		blpge_accordion.childNodes[ 0 ].className = 'fas fa-minus';
	} else if ( RegExp( 'minus' ).test( blpge_accordionIconClassName ) ) {
		blpge_accordion.childNodes[ 0 ].className = 'fas fa-plus';
	} else if ( RegExp( 'down' ).test( blpge_accordionIconClassName ) ) {
		blpge_accordion.childNodes[ 0 ].className = blpge_accordionIconClassName.replace(
			'down',
			'up'
		);
	} else if ( RegExp( 'up' ).test( blpge_accordionIconClassName ) ) {
		blpge_accordion.childNodes[ 0 ].className = blpge_accordionIconClassName.replace(
			'up',
			'down'
		);
	}
}
