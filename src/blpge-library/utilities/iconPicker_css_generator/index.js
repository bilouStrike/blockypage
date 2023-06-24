// Import CSS Generator Module
import blpge_cssGen from '../../helpers/css-generator/index';

export default function blpge_iconPicker_cssGen(
	attribute,
	css_selector,
	css_string = ''
) {
	if ( ! attribute ) {
		return css_string;
	}

	const iconPicker = attribute;
	let final_css = css_string;

	if ( iconPicker.iconSize ) {
		final_css = blpge_cssGen(
			`${ css_selector }`,
			[ 'width' ],
			[
				[
					[
						iconPicker.iconSize[ 0 ]
							? `${ iconPicker.iconSize[ 0 ] }px`
							: null,
					],
					[
						iconPicker.iconSize[ 1 ]
							? `${ iconPicker.iconSize[ 1 ] }px`
							: null,
					],
					[
						iconPicker.iconSize[ 2 ]
							? `${ iconPicker.iconSize[ 2 ] }px`
							: null,
					],
					[
						iconPicker.iconSize[ 3 ]
							? `${ iconPicker.iconSize[ 3 ] }px`
							: null,
					],
				],
			],
			final_css
		);
	}

	if ( iconPicker.fill ) {
		final_css = blpge_cssGen(
			`${ css_selector }`,
			[ 'color' ],
			[ `${ iconPicker.fill }` ],
			final_css
		);
	}

	if ( iconPicker.color ) {
		final_css = blpge_cssGen(
			`${ css_selector }`,
			[ 'color' ],
			[ `${ iconPicker.color }` ],
			final_css
		);
	}

	if ( iconPicker.rotateX & iconPicker.rotateX ) {
		final_css = blpge_cssGen(
			`${ css_selector }`,
			[ 'transform' ],
			[ 'rotateY(180deg) rotateX(180deg)' ],
			final_css
		);
	} else if ( iconPicker.rotateX ) {
		final_css = blpge_cssGen(
			`${ css_selector }`,
			[ 'transform' ],
			[ 'rotateX(180deg)' ],
			final_css
		);
	} else if ( iconPicker.rotateY ) {
		final_css = blpge_cssGen(
			`${ css_selector }`,
			[ 'transform' ],
			[ 'rotateY(180deg)' ],
			final_css
		);
	}
	return final_css;
}
