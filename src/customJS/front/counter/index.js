jQuery( document ).ready( function ( $ ) {
	jQuery( '.Count' ).each( function () {
		let blpge_setting = JSON.parse( jQuery( this ).attr( 'data-counter' ) );

		duration: parseInt( blpge_setting.counter_duration ),
			jQuery( this )
				.prop( 'Counter', parseInt( blpge_setting.start_from ) )
				.animate(
					{
						Counter: jQuery( this ).text(),
					},
					{
						duration: parseInt( blpge_setting.counter_duration ),
						easing: 'swing',
						step: function ( now ) {
							jQuery( this ).text( Math.ceil( now ) );
						},
					}
				);
	} );
} );
