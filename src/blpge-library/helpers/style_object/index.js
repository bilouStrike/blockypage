/**
 * Return true if the object is empty
 *
 * @param {Object}
 *
 * @return {Boolean} true if empty
 */
function isEmpty( obj ) {
	for ( let prop in obj ) {
		if ( obj.hasOwnProperty( prop ) ) return false;
	}
	return true;
}

/**
 * Return Style object to use for JSX element
 *
 * @param {Array} properties style properties
 * @param {Array} value  properties values
 * @param {Object} init_style_object to be merged with the style object created
 *
 * @return {object}
 */

export default function blpge_style_object(
	properties,
	values,
	init_style_object = {}
) {
	// Validate Arguments
	if (
		! Array.isArray( properties ) ||
		! Array.isArray( values ) ||
		typeof init_style_object != 'object'
	) {
		console.error(
			'You should provide two arrays and an object as arguments'
		);
		return null;
		// arrays should have the same length
	} else if ( properties.length != values.length ) {
		console.error( 'styleObject arguments should have the same length' );
		return null;
	} else {
		// Array' values should be strings
		for ( let i = 0; i < properties.length; i++ ) {
			if ( ! properties[ i ] ) {
				console.error( 'styleObject properties should not be empty' );
				return null;
			} else if ( properties[ i ] && values[ i ] ) {
				if ( typeof properties[ i ] != 'string' ) {
					console.error( 'Style Properties Should Be Only Strings' );
					return null;
				}
			}
		}

		// Create the style object
		let result = {};

		for ( let i = 0; i < properties.length; i++ ) {
			// Only add style properties if they have values
			if ( properties[ i ] && values[ i ] ) {
				if ( Array.isArray( values[ i ] ) ) {
					if ( values[ i ][ 0 ] && values[ i ][ 1 ] ) {
						result[ properties[ i ] ] =
							values[ i ][ 0 ] + values[ i ][ 1 ];
					}
				} else {
					result[ properties[ i ] ] = values[ i ];
				}
			}
		}

		if ( ! isEmpty( result ) ) {
			return { ...init_style_object, ...result };
		} else {
			return init_style_object;
		}
	}
}
