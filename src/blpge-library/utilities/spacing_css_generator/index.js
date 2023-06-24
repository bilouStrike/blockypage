// Import CSS Generator Module
import blpge_cssGen from '../../helpers/css-generator/index';

export default function blpge_spacing_cssGen(
	attribute,
	css_selector,
	css_string = ''
) {
	if ( ! attribute ) {
		return css_string;
	}

	// Get Spacing Object Values
	const spacingObject = attribute;
	const marginValues = spacingObject.margin.values;
	const paddingValues = spacingObject.padding.values;
	const marginUnit = spacingObject.margin.unit;
	const paddingUnit = spacingObject.padding.unit;

	// CSS properties array
	const properties = [
		'margin-top',
		'margin-right',
		'margin-bottom',
		'margin-left',
		'padding-top',
		'padding-right',
		'padding-bottom',
		'padding-left',
	];

	// CSS Values array
	const values = [
		[
			[
				marginValues.top ? marginValues.top[ 0 ] : null,
				`${ marginUnit[ 0 ] } !important`,
			],
			[
				marginValues.top ? marginValues.top[ 1 ] : null,
				`${ marginUnit[ 1 ] } !important`,
			],
			[
				marginValues.top ? marginValues.top[ 2 ] : null,
				`${ marginUnit[ 2 ] } !important`,
			],
			[
				marginValues.top ? marginValues.top[ 3 ] : null,
				`${ marginUnit[ 3 ] } !important`,
			],
		],
		[
			[
				marginValues.right ? marginValues.right[ 0 ] : null,
				`${ marginUnit[ 0 ] } !important`,
			],
			[
				marginValues.right ? marginValues.right[ 1 ] : null,
				`${ marginUnit[ 1 ] } !important`,
			],
			[
				marginValues.right ? marginValues.right[ 2 ] : null,
				`${ marginUnit[ 2 ] } !important`,
			],
			[
				marginValues.right ? marginValues.right[ 3 ] : null,
				`${ marginUnit[ 3 ] } !important`,
			],
		],
		[
			[
				marginValues.bottom ? marginValues.bottom[ 0 ] : null,
				`${ marginUnit[ 0 ] } !important`,
			],
			[
				marginValues.bottom ? marginValues.bottom[ 1 ] : null,
				`${ marginUnit[ 1 ] } !important`,
			],
			[
				marginValues.bottom ? marginValues.bottom[ 2 ] : null,
				`${ marginUnit[ 2 ] } !important`,
			],
			[
				marginValues.bottom ? marginValues.bottom[ 3 ] : null,
				`${ marginUnit[ 3 ] } !important`,
			],
		],
		[
			[
				marginValues.left ? marginValues.left[ 0 ] : null,
				`${ marginUnit[ 0 ] } !important`,
			],
			[
				marginValues.left ? marginValues.left[ 1 ] : null,
				`${ marginUnit[ 1 ] } !important`,
			],
			[
				marginValues.left ? marginValues.left[ 2 ] : null,
				`${ marginUnit[ 2 ] } !important`,
			],
			[
				marginValues.left ? marginValues.left[ 3 ] : null,
				`${ marginUnit[ 3 ] } !important`,
			],
		],
		[
			[
				paddingValues.top ? paddingValues.top[ 0 ] : null,
				`${ paddingUnit[ 0 ] } !important`,
			],
			[
				paddingValues.top ? paddingValues.top[ 1 ] : null,
				`${ paddingUnit[ 1 ] } !important`,
			],
			[
				paddingValues.top ? paddingValues.top[ 2 ] : null,
				`${ paddingUnit[ 2 ] } !important`,
			],
			[
				paddingValues.top ? paddingValues.top[ 3 ] : null,
				`${ paddingUnit[ 3 ] } !important`,
			],
		],
		[
			[
				paddingValues.right ? paddingValues.right[ 0 ] : null,
				`${ paddingUnit[ 0 ] } !important`,
			],
			[
				paddingValues.right ? paddingValues.right[ 1 ] : null,
				`${ paddingUnit[ 1 ] } !important`,
			],
			[
				paddingValues.right ? paddingValues.right[ 2 ] : null,
				`${ paddingUnit[ 2 ] } !important`,
			],
			[
				paddingValues.right ? paddingValues.right[ 3 ] : null,
				`${ paddingUnit[ 3 ] } !important`,
			],
		],
		[
			[
				paddingValues.bottom ? paddingValues.bottom[ 0 ] : null,
				`${ paddingUnit[ 0 ] } !important`,
			],
			[
				paddingValues.bottom ? paddingValues.bottom[ 1 ] : null,
				`${ paddingUnit[ 1 ] } !important`,
			],
			[
				paddingValues.bottom ? paddingValues.bottom[ 2 ] : null,
				`${ paddingUnit[ 2 ] } !important`,
			],
			[
				paddingValues.bottom ? paddingValues.bottom[ 3 ] : null,
				`${ paddingUnit[ 3 ] } !important`,
			],
		],
		[
			[
				paddingValues.left ? paddingValues.left[ 0 ] : null,
				`${ paddingUnit[ 0 ] } !important`,
			],
			[
				paddingValues.left ? paddingValues.left[ 1 ] : null,
				`${ paddingUnit[ 1 ] } !important`,
			],
			[
				paddingValues.left ? paddingValues.left[ 2 ] : null,
				`${ paddingUnit[ 2 ] } !important`,
			],
			[
				paddingValues.left ? paddingValues.left[ 3 ] : null,
				`${ paddingUnit[ 3 ] } !important`,
			],
		],
	];

	return blpge_cssGen( css_selector, properties, values, css_string );
}
