// Import CSS Generator Module
import blpge_cssGen from '../../helpers/css-generator/index';
export default function blpge_typography_cssGen(
	attribute,
	css_selector,
	css_string = '',
	block_class
) {
	if ( ! attribute ) {
		return css_string;
	}

	const typography = attribute;
	const properties = [
		'color',
		'font-size',
		'line-height',
		'letter-spacing',
	];

	let final_css = css_string;

	final_css = blpge_cssGen(
		css_selector,
		[ 'line-height' ],
		[ '32px' ],
		final_css
	);

	if ( typography.fontFamily ) {
		let fontImport = `@import url("https://fonts.googleapis.com/css?family=${ typography.fontFamily.value }");`;
		if ( typography.fontFamily.fontWeight ) {
			if ( typography.fontFamily.fontWeight == 'italic' ) {
				fontImport =
					fontImport.substring( 0, fontImport.length - 3 ) +
					':400i' +
					'");';
				final_css += fontImport;
				final_css = blpge_cssGen(
					css_selector,
					[ 'font-style', 'font-weight' ],
					[ 'italic', '400' ],
					final_css
				);
			} else if (
				typography.fontFamily.fontWeight.indexOf( 'i' ) != -1
			) {
				fontImport +=
					fontImport.substring( 0, fontImport.length - 3 ) +
					`:${ typography.fontFamily.fontWeight }` +
					'");';
				final_css += fontImport;
				final_css = blpge_cssGen(
					css_selector,
					[ 'font-style', 'font-weight' ],
					[
						'italic',
						typography.fontFamily.fontWeight.replace( 'i', '' ),
					],
					final_css
				);
			} else if ( typography.fontFamily.fontWeight == 'regular' ) {
				final_css += fontImport;
				final_css = blpge_cssGen(
					css_selector,
					[ 'font-weight' ],
					[ '400' ],
					final_css
				);
			} else {
				fontImport +=
					fontImport.substring( 0, fontImport.length - 3 ) +
					`:${ typography.fontFamily.fontWeight }` +
					'");';
				final_css += fontImport;
				final_css = blpge_cssGen(
					css_selector,
					[ 'font-weight' ],
					[ typography.fontFamily.fontWeight ],
					final_css
				);
			}
		} else {
			final_css += fontImport;
			final_css = blpge_cssGen(
				css_selector,
				[ 'font-weight' ],
				[ '400' ],
				final_css
			);
		}
		final_css = blpge_cssGen(
			css_selector,
			[ 'font-family' ],
			[ [ typography.fontFamily.label, ', sans-serif' ] ],
			final_css
		);
	}

	let final_text_shadow = '';
	const values = [
		typography.color,
		[
			[
				( typography.size ? typography.size[ 0 ] : null )
					? `${ typography.size[ 0 ] }px`
					: null,
			],
			[
				( typography.size ? typography.size[ 1 ] : null )
					? `${ typography.size[ 1 ] }px`
					: null,
			],
			[
				( typography.size ? typography.size[ 2 ] : null )
					? `${ typography.size[ 2 ] }px`
					: null,
			],
			[
				( typography.size ? typography.size[ 3 ] : null )
					? `${ typography.size[ 3 ] }px`
					: null,
			],
		],
		[
			[
				typography.line_height ? typography.line_height[ 0 ] : null,
				`${ typography.lineHeightUnit[ 0 ] }`,
			],
			[
				typography.line_height ? typography.line_height[ 1 ] : null,
				`${ typography.lineHeightUnit[ 1 ] }`,
			],
			[
				typography.line_height ? typography.line_height[ 2 ] : null,
				`${ typography.lineHeightUnit[ 2 ] }`,
			],
			[
				typography.line_height ? typography.line_height[ 3 ] : null,
				`${ typography.lineHeightUnit[ 3 ] }`,
			],
		],
		[
			[
				(
					typography.letter_spacing
						? typography.letter_spacing[ 0 ]
						: null
				 )
					? `${ typography.letter_spacing[ 0 ] }px`
					: null,
			],
			[
				(
					typography.letter_spacing
						? typography.letter_spacing[ 1 ]
						: null
				 )
					? `${ typography.letter_spacing[ 1 ] }px`
					: null,
			],
			[
				(
					typography.letter_spacing
						? typography.letter_spacing[ 2 ]
						: null
				 )
					? `${ typography.letter_spacing[ 2 ] }px`
					: null,
			],
			[
				(
					typography.letter_spacing
						? typography.letter_spacing[ 3 ]
						: null
				 )
					? `${ typography.letter_spacing[ 3 ] }px`
					: null,
			],
		],
	];

	if ( typography.aligment ) {
		final_css = blpge_cssGen(
			`${ css_selector }`,
			[ 'text-align' ],
			[ `${ typography.aligment }` ],
			final_css
		);
	}

	if ( typography.transform ) {
		final_css = blpge_cssGen(
			`${ css_selector }`,
			[ 'text-transform' ],
			[ `${ typography.transform }` ],
			final_css
		);
	}

	typography.textShadow.hShadow
		? ( final_text_shadow += `${ typography.textShadow.hShadow }px ` )
		: '';
	typography.textShadow.vShadow
		? ( final_text_shadow += `${ typography.textShadow.vShadow }px ` )
		: '';
	typography.textShadow.blur
		? ( final_text_shadow += `${ typography.textShadow.blur }px ` )
		: '';
	typography.textShadow.spread
		? ( final_text_shadow += `${ typography.textShadow.spread }px ` )
		: '';
	typography.textShadow.color
		? ( final_text_shadow += `${ typography.textShadow.color } ` )
		: '';

	if ( typography.textShadow.hShadow && typography.textShadow.vShadow ) {
		final_css = blpge_cssGen(
			`${ css_selector }`,
			[ 'text-shadow' ],
			[ final_text_shadow ],
			final_css
		);
	}

	final_css = blpge_cssGen( css_selector, properties, values, final_css );

	if ( typography.selections ) {
		for ( let key in typography.selections ) {
			if ( typography.selections.hasOwnProperty( key ) ) {
				let splited_block_class = block_class.split( ',' );
				let result_class = '';
				for ( let el of splited_block_class ) {
					result_class += `${ el } .${ key },`;
				}
				result_class = result_class.substring(
					0,
					result_class.length - 1
				);
				final_css = blpge_typography_cssGen(
					typography.selections[ key ],
					`${ result_class }`,
					final_css
				);
			}
		}
	}
	return final_css;
}
