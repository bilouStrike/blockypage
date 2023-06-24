// Import CSS Generator Module
import blpge_cssGen from '../../helpers/css-generator/index';

// CSS border Generator
export default function blpge_border_cssGen(
	attribute,
	css_selector,
	css_string = ''
) {
	if ( ! attribute ) {
		return css_string;
	}

	const borderObject = attribute;
	let final_css = css_string;
	let final_properties = [];
	let final_values = [];
	const borderRadiusValues = borderObject.borderRadius.values;
	const borderRadiusUnit = borderObject.borderRadius.unit;
	let i = 0;
	const properties = [
		'border-style',
		'border-width',
		'border-color',

		'border-top-style',
		'border-top-width',
		'border-top-color',

		'border-right-style',
		'border-right-width',
		'border-right-color',

		'border-bottom-style',
		'border-bottom-width',
		'border-bottom-color',

		'border-left-style',
		'border-left-width',
		'border-left-color',

		'border-top-left-radius',
		'border-top-right-radius',
		'border-bottom-right-radius',
		'border-bottom-left-radius',
	];
	const values = [
		borderObject[ 'style' ][ 'all' ]
			? `${ borderObject[ 'style' ][ 'all' ] }`
			: null,
		borderObject[ 'size' ][ 'all' ]
			? `${ borderObject[ 'size' ][ 'all' ] }px`
			: null,
		borderObject[ 'color' ][ 'all' ]
			? `${ borderObject[ 'color' ][ 'all' ] }`
			: null,

		borderObject[ 'style' ][ 'top' ]
			? `${ borderObject[ 'style' ][ 'top' ] }`
			: null,
		borderObject[ 'size' ][ 'top' ]
			? `${ borderObject[ 'size' ][ 'top' ] }px`
			: null,
		borderObject[ 'color' ][ 'top' ]
			? `${ borderObject[ 'color' ][ 'top' ] }`
			: null,

		borderObject[ 'style' ][ 'right' ]
			? `${ borderObject[ 'style' ][ 'right' ] }`
			: null,
		borderObject[ 'size' ][ 'right' ]
			? `${ borderObject[ 'size' ][ 'right' ] }px`
			: null,
		borderObject[ 'color' ][ 'right' ]
			? `${ borderObject[ 'color' ][ 'right' ] }`
			: null,

		borderObject[ 'style' ][ 'bottom' ]
			? `${ borderObject[ 'style' ][ 'bottom' ] } `
			: null,
		borderObject[ 'size' ][ 'bottom' ]
			? `${ borderObject[ 'size' ][ 'bottom' ] }px`
			: null,
		borderObject[ 'style' ][ 'bottom' ]
			? `${ borderObject[ 'color' ][ 'bottom' ] }`
			: null,

		borderObject[ 'style' ][ 'left' ]
			? `${ borderObject[ 'style' ][ 'left' ] }`
			: null,
		borderObject[ 'size' ][ 'left' ]
			? `${ borderObject[ 'size' ][ 'left' ] }px`
			: null,
		borderObject[ 'color' ][ 'left' ]
			? `${ borderObject[ 'color' ][ 'left' ] }`
			: null,

		borderRadiusValues.topLeft + borderRadiusUnit,
		borderRadiusValues.topRight + borderRadiusUnit,
		borderRadiusValues.bottomRight + borderRadiusUnit,
		borderRadiusValues.bottomLeft + borderRadiusUnit,
	];

	for ( i = 0; i < values.length; i++ ) {
		if (
			values[ i ] != 'null' &&
			values[ i ] != 'nullpx' &&
			values[ i ] != 'undefinedpx'
		) {
			final_properties.push( properties[ i ] );
			final_values.push( values[ i ] );
		}
	}

	final_css = blpge_cssGen(
		css_selector,
		final_properties,
		final_values,
		final_css
	);
	return final_css;
}
