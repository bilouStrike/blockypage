jQuery( document ).ready( function ( $ ) {
	jQuery( '.blpge_accordion li h3' ).click( function () {
		jQuery( this ).next().slideToggle();
		var blpge_accordion_className = jQuery( this ).children();
		if ( jQuery( blpge_accordion_className ).hasClass( 'is-open' ) ) {
			jQuery( this ).children().removeClass( 'is-open' );
		} else {
			jQuery( this ).children().addClass( 'is-open' );
		}
	} );
} );
