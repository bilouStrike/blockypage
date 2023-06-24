import blpge_cssGen from '../../helpers/css-generator/index';

export default function blpge_shapeDivider_cssGen(
	attribute,
	css_selector,
	css_string = ''
) {
	if ( ! attribute ) {
		return css_string;
	}
	let final_css = css_string;
	const shapeDivider = attribute;

	const positions = [ 'topShape', 'bottomShape' ];

	for ( let position of positions ) {
		let new_css_selector = css_selector;
		if ( position == 'topShape' ) {
			new_css_selector += ' .blpge_shape-divider-container--top svg';
		} else if ( position == 'bottomShape' ) {
			new_css_selector += ' .blpge_shape-divider-container--bottom svg';
		}

		if ( shapeDivider[ position ][ 'fill' ] ) {
			final_css = blpge_cssGen(
				`${ new_css_selector }`,
				[ 'fill' ],
				[ shapeDivider[ position ][ 'fill' ] ],
				final_css
			);
		}

		if (
			shapeDivider[ position ][ 'rotateY' ] &
			shapeDivider[ position ][ 'rotateX' ]
		) {
			final_css = blpge_cssGen(
				`${ new_css_selector }`,
				[ 'transform' ],
				[ 'rotateY(180deg) rotateX(180deg)' ],
				final_css
			);
		} else if ( shapeDivider[ position ][ 'rotateX' ] ) {
			final_css = blpge_cssGen(
				`${ new_css_selector }`,
				[ 'transform' ],
				[ 'rotateX(180deg)' ],
				final_css
			);
		} else if ( shapeDivider[ position ][ 'rotateY' ] ) {
			final_css = blpge_cssGen(
				`${ new_css_selector }`,
				[ 'transform' ],
				[ 'rotateY(180deg)' ],
				final_css
			);
		}

		if ( shapeDivider[ position ][ 'height' ] ) {
			final_css = blpge_cssGen(
				`${ new_css_selector }`,
				[ 'height' ],
				[
					[
						[
							shapeDivider[ position ].height[ 0 ]
								? `${ shapeDivider[ position ].height[ 0 ] }px`
								: null,
						],
						[
							shapeDivider[ position ].height[ 1 ]
								? `${ shapeDivider[ position ].height[ 1 ] }px`
								: null,
						],
						[
							shapeDivider[ position ].height[ 2 ]
								? `${ shapeDivider[ position ].height[ 2 ] }px`
								: null,
						],
						[
							shapeDivider[ position ].height[ 3 ]
								? `${ shapeDivider[ position ].height[ 3 ] }px`
								: null,
						],
					],
				],
				final_css
			);
		}

		// Bring to Front
		let front_css_selector = css_selector;
		if ( position == 'topShape' ) {
			front_css_selector += ' .blpge_shape-divider-container--top';
		} else if ( position == 'bottomShape' ) {
			front_css_selector += ' .blpge_shape-divider-container--bottom';
		}

		if ( shapeDivider[ position ][ 'onFront' ] ) {
			final_css = blpge_cssGen(
				`${ front_css_selector }`,
				[ 'z-index' ],
				[ '1' ],
				final_css
			);
		}
	}

	return final_css;
}
