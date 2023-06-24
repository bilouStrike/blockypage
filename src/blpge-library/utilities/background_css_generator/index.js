// Import CSS Generator Module
import blpge_cssGen from '../../helpers/css-generator/index';

// CSS Generator For The Background Collection
export default function blpge_background_cssGen(
	attribute,
	css_selector,
	css_string = '',
	target_block = null
) {
	if ( ! attribute ) {
		return css_string;
	}

	const background = attribute;
	let gradientType = '';

	// Final CSS
	let final_css = css_string;

	// CSS Properties Array
	const properties = [
		'background-color',
		'background-image',
		'background-size',
		'background-repeat',
		'background-position',
	];

	// CSS Values Array
	const values = [
		background.color,
		[
			[
				( background.image ? background.image[ 0 ] : null )
					? `url(${ background.image[ 0 ] })`
					: null,
			],
			[
				( background.image ? background.image[ 1 ] : null )
					? `url(${ background.image[ 1 ] })`
					: null,
			],
			[
				( background.image ? background.image[ 2 ] : null )
					? `url(${ background.image[ 2 ] })`
					: null,
			],
			[
				( background.image ? background.image[ 3 ] : null )
					? `url(${ background.image[ 3 ] })`
					: null,
			],
		],
		[
			[
				( background.size ? background.size[ 0 ] : null )
					? background.size[ 0 ]
					: null,
			],
			[
				( background.size ? background.size[ 1 ] : null )
					? background.size[ 1 ]
					: null,
			],
			[
				( background.size ? background.size[ 2 ] : null )
					? background.size[ 2 ]
					: null,
			],
			[
				( background.size ? background.size[ 3 ] : null )
					? background.size[ 3 ]
					: null,
			],
		],
		[
			[
				( background.repeat ? background.repeat[ 0 ] : null )
					? background.repeat[ 0 ]
					: null,
			],
			[
				( background.repeat ? background.repeat[ 1 ] : null )
					? background.repeat[ 1 ]
					: null,
			],
			[
				( background.repeat ? background.repeat[ 2 ] : null )
					? background.repeat[ 2 ]
					: null,
			],
			[
				( background.repeat ? background.repeat[ 3 ] : null )
					? background.repeat[ 3 ]
					: null,
			],
		],
		[
			[
				( background.position ? background.position[ 0 ] : null )
					? background.position[ 0 ]
					: null,
			],
			[
				( background.position ? background.position[ 1 ] : null )
					? background.position[ 1 ]
					: null,
			],
			[
				( background.position ? background.position[ 2 ] : null )
					? background.position[ 2 ]
					: null,
			],
			[
				( background.position ? background.position[ 3 ] : null )
					? background.position[ 3 ]
					: null,
			],
		],
	];

	final_css = blpge_cssGen( css_selector, properties, values, final_css );

	/*******************************************************
	 * Normal Background
	 *******************************************************/

	// Opacity
	if ( background.overlayOpacity ) {
		final_css = blpge_cssGen(
			`${ css_selector }`,
			[ 'opacity' ],
			[ background.overlayOpacity ],
			final_css
		);
	}

	// Parallax Effect
	if ( background.parallax ) {
		final_css = blpge_cssGen(
			`${ css_selector }`,
			[ 'background-attachment' ],
			[ 'fixed' ],
			final_css
		);
	}

	// Transition
	if ( background.transition ) {
		final_css = blpge_cssGen(
			`${ css_selector }`,
			[ 'transition' ],
			[ [ background.transition, 's' ] ],
			final_css
		);
	}

	// Gradient
	gradientType = ! background.gradientType
		? 'linear'
		: background.gradientType;
	if ( background.backgroundState == 'Gradient' ) {
		let gradientDirection = '';
		gradientDirection =
			gradientType == 'linear'
				? `${ background.gradientLinearDirection }deg`
				: `circle at ${ background.gradientRadialDirection }`;
		if (
			gradientType &&
			gradientType != 'none' &&
			gradientDirection &&
			background.gradientFirstColor &&
			background.gradientFirstColorLocation &&
			background.gradientSecondColor &&
			background.gradientSecondColorLocation
		) {
			final_css = blpge_cssGen(
				`${ css_selector }`,
				[ 'background-image' ],
				[
					`${ gradientType }-gradient(${ gradientDirection },${ background.gradientFirstColor } ${ background.gradientFirstColorLocation }% ,${ background.gradientSecondColor } ${ background.gradientSecondColorLocation }% )`,
				],
				final_css
			);
		}
	} else if ( background.backgroundState == 'Classic' ) {
		if ( background.image ) {
			final_css = blpge_cssGen(
				`${ css_selector }`,
				[ 'background-image' ],
				[
					[
						[
							background.image[ 0 ]
								? `url(${ background.image[ 0 ] })`
								: null,
						],
						[
							background.image[ 1 ]
								? `url(${ background.image[ 1 ] })`
								: null,
						],
						[
							background.image[ 2 ]
								? `url(${ background.image[ 2 ] })`
								: null,
						],
						[
							background.image[ 3 ]
								? `url(${ background.image[ 3 ] })`
								: null,
						],
					],
				],
				final_css
			);
		}
	}

	/*******************************************************
	 * Hover Background
	 *******************************************************/

	let gradientTypeHover, gradientHoverDirection, hover_css;

	const {
		backgroundHoverState,
		imageAsHover,
		hoverOverlayOpacity,
		hoverColor,
		gradientFirstColorLocationHover,
		gradientFirstColorHover,
		gradientSecondColorHover,
		gradientSecondColorLocationHover,
		gradientLinearDirectionHover,
		gradientRadialDirectionHover,
	} = background;

	gradientTypeHover = ! background.gradientTypeHover
		? 'linear'
		: background.gradientTypeHover;
	gradientHoverDirection =
		gradientTypeHover == 'linear'
			? `${ gradientLinearDirectionHover }deg`
			: `circle at ${ gradientRadialDirectionHover }`;

	if ( backgroundHoverState == 'Classic' ) {
		hover_css = hoverColor
			? `background-color:${ hoverColor } !important;`
			: '';
		hover_css += imageAsHover
			? `background-image:url("${ imageAsHover }")`
			: '';
	} else if ( backgroundHoverState == 'Gradient' ) {
		if (
			gradientTypeHover &&
			gradientHoverDirection &&
			background.gradientFirstColorHover &&
			background.gradientFirstColorLocationHover &&
			background.gradientSecondColorHover &&
			background.gradientSecondColorLocationHover
		) {
			hover_css = `background-image:${ gradientTypeHover }-gradient(${ gradientHoverDirection },${ gradientFirstColorHover } ${ gradientFirstColorLocationHover }% ,${ gradientSecondColorHover } ${ gradientSecondColorLocationHover }% )!important`;
		}
	}

	// Opacity hover
	if ( hoverOverlayOpacity ) {
		final_css += `${ css_selector }:hover{opacity:${ hoverOverlayOpacity }}`;
	}

	if ( hover_css && target_block == 'image_block' ) {
		final_css += `${ css_selector }:hover .blpge_image_block_wrapper{${ hover_css }}`;
	} else if ( hover_css ) {
		final_css += `${ css_selector }:hover{${ hover_css }}`;
	}

	// Return Final CSS
	return final_css;
}
