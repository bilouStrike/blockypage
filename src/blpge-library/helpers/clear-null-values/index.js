/*
 * Clear Null Values in a collection's object
 */

export default function clear_null_values( object = {} ) {
	if ( typeof object != 'object' ) {
		console.error( 'Tha argument for clear_null_values must be an object' );
		return;
	}

	for ( var property in object ) {
		if ( object.hasOwnProperty( property ) ) {
			if ( object[ property ] == null || object[ property ] == false ) {
				delete object[ property ];
			}

			if ( Array.isArray( object[ property ] ) ) {
				if ( object[ property ].every( ( val ) => val === null ) ) {
					delete object[ property ];
				}
			}

			if ( typeof object[ property ] === 'object' ) {
				clear_null_values( object[ property ] );
			}
		}
	}
}
