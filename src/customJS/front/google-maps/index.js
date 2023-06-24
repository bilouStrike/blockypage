jQuery( document ).ready( function ( $ ) {
	let zoom_control = jQuery( '.blpge_googleMaps' ).attr( 'data-zoomControl' );
	let pan_control = jQuery( '.blpge_googleMaps' ).attr( 'data-panControl' );
	let mapType_Control = jQuery( '.blpge_googleMaps' ).attr(
		'data-mapTypeControl'
	);
	let scale_Control = jQuery( '.blpge_googleMaps' ).attr(
		'data-scaleControl'
	);
	let streetView_Control = jQuery( '.blpge_googleMaps' ).attr(
		'data-streetViewControl'
	);
	let overviewMap_Control = jQuery( '.blpge_googleMaps' ).attr(
		'data-overviewMapControl'
	);
	let rotate_Control = jQuery( '.blpge_googleMaps' ).attr(
		'data-rotateControl'
	);
	let map_ApiKey = jQuery( '.blpge_googleMaps' ).attr( 'data-mapApiKey' );
	let maps_address = jQuery( '.blpge_googleMaps' ).attr( 'data-address' );
	function callMaps() {
		var mapProp = {
			zoom: 5,
			panControl: pan_control,
			zoomControl: zoom_control,
			mapTypeControl: mapType_Control,
			scaleControl: scale_Control,
			streetViewControl: streetView_Control,
			overviewMapControl: overviewMap_Control,
			rotateControl: rotate_Control,
		};
		var blpge_map = new google.maps.Map(
			document.getElementById( 'map' ),
			mapProp
		);
		new google.maps.Geocoder().geocode(
			{
				address: maps_address,
			},
			function ( results, status ) {
				if ( status == google.maps.GeocoderStatus.OK ) {
					new google.maps.Marker( {
						position: results[ 0 ].geometry.location,
						map: blpge_map,
					} );
					blpge_map.setCenter( results[ 0 ].geometry.location );
				}
			}
		);
	}
	let googleapiUrl = `https://maps.google.com/maps/api/js?key=${ map_ApiKey }`;
	jQuery.getScript( googleapiUrl, function () {
		callMaps();
	} );
} );
