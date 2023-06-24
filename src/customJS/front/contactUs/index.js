jQuery( document ).ready( function ( $ ) {
	jQuery( '#blpge_contact_us' ).on( 'submit', function ( e ) {
		e.preventDefault();
		let dataStored;
		let blpge_contact_us_data = jQuery( '#blpge_contact_us' ).serialize();
		jQuery
			.ajax( {
				url: blpge_params.ajaxUrl,
				type: 'post',
				data: {
					action: 'blpge_contact_form',
					dataStored: blpge_contact_us_data,
				},
			} )
			.success( function ( response ) {
				if ( response == 0 ) {
					jQuery( '.blpge-error' )
						.show()
						.html( 'Capetcha error verification' );
				} else if ( response == 1 ) {
					jQuery( '.blpge-error' ).show();
				} else if ( response == 2 ) {
					jQuery( '.blpge-success' ).show();
				}
			} )
			.error( function ( response ) {
				jQuery( '.blpge-error' ).show().html( response );
			} );
	} );
} );
