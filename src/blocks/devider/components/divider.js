/**
 *
 * Devider Component
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { dispatch, select } = wp.data;
// Import blpge dependencies
const {
	blpge_spacing_cssGen,
	blpge_background_cssGen,
	blpge_border_cssGen,
	blpge_iconPicker_cssGen,
} = blpgelib.utilities;

const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Divider extends Component {
	constructor( props ) {
		super( ...arguments );
		let self = this;
	}

	render() {
		const {
			attributes: {
				id,
				divider_icon,
				size,
				width,
				widthUnit,
				color,
				align,
				style,
				iconEnable,
				icon_spacing,
				icon_background,
				icon_border,
				divider_spacing,
				background,
				border,
				animation,
			},
			className,
		} = this.props;

		let final_css;
		let iconObject = divider_icon;

		// Divider General settings
		final_css = blpge_cssGen(
			`.blpge_divider--id-${ id } .blpge_divider__wrapper__line`,
			[
				'display',
				'border-top-width',
				'width',
				'border-top-color',
				'border-top-style',
			],
			[
				'inline-block',
				`${ size }px`,
				[
					[ width[ 0 ], widthUnit[ 0 ] ],
					[ width[ 1 ], widthUnit[ 1 ] ],
					[ width[ 2 ], widthUnit[ 2 ] ],
					[ width[ 3 ], widthUnit[ 3 ] ],
				],
				color,
				style,
			]
		);

		// Divider align
		final_css = blpge_cssGen(
			`.blpge_divider--id-${ id } .blpge_divider__wrapper`,
			[ 'text-align' ],
			[ align ],
			final_css
		);

		// Define icon wrapper alignment
		if ( align == 'left' ) {
			final_css = blpge_cssGen(
				`.blpge_divider--id-${ id } .blpge_divider__wrapper__icon`,
				[ 'margin-right' ],
				[ 'auto' ],
				final_css
			);
		} else if ( align == 'center' ) {
			final_css = blpge_cssGen(
				`.blpge_divider--id-${ id } .blpge_divider__wrapper__icon`,
				[ 'margin-right', 'margin-left' ],
				[ 'auto', 'auto' ],
				final_css
			);
		} else if ( align == 'right' ) {
			final_css = blpge_cssGen(
				`.blpge_divider--id-${ id } .blpge_divider__wrapper__icon`,
				[ 'margin-left' ],
				[ 'auto' ],
				final_css
			);
		}

		final_css = blpge_cssGen(
			`.blpge_divider--id-${ id } .blpge_divider__wrapper__icon`,
			[ 'position', 'width', 'text-align' ],
			[
				'relative',
				[
					[ width[ 0 ], widthUnit[ 0 ] ],
					[ width[ 1 ], widthUnit[ 1 ] ],
					[ width[ 2 ], widthUnit[ 2 ] ],
					[ width[ 3 ], widthUnit[ 3 ] ],
				],

				'center',
			],
			final_css
		);

		// Icon Typography
		final_css = blpge_iconPicker_cssGen(
			divider_icon,
			`.blpge_divider--id-${ id } .blpge_divider__wrapper__icon svg`,
			final_css
		);

		// Icon Padding
		final_css = blpge_spacing_cssGen(
			icon_spacing,
			`.blpge_divider--id-${ id } .blpge_divider__wrapper__icon svg`,
			final_css
		);

		// Icon Background
		final_css = blpge_background_cssGen(
			icon_background,
			`.blpge_divider--id-${ id } .blpge_divider__wrapper__icon svg`,
			final_css
		);

		// Icon Border
		final_css = blpge_border_cssGen(
			icon_border,
			`.blpge_divider--id-${ id } .blpge_divider__wrapper__icon svg`,
			final_css
		);

		// Divider Padding
		final_css = blpge_spacing_cssGen(
			divider_spacing,
			`.blpge_divider--id-${ id }`,
			final_css
		);

		// Icon background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_divider--id-${ id } .blpge_divider__wrapper__icon i`,
			final_css
		);

		// Icon border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_divider--id-${ id } .blpge_divider__wrapper__icon i`,
			final_css
		);

		// Get The Stored CSS
		let storedCSS = select( 'blockypage-css' ).getCSS();

		// Store the final CSS
		if ( final_css ) {
			if ( storedCSS[ id ] != final_css ) {
				dispatch( 'blockypage-css' ).addCSS( id, final_css );
			}
		} else {
			if ( id in storedCSS ) {
				dispatch( 'blockypage-css' ).removeCSS( id );
			}
		}

		const editor_css = blpge_class_based_mq_css( final_css );

		return (
			<div className={ `${ className } blpge_block-container` }>
				<div className="blpge_block-first-wrapper">
					<div className="blpge_block-second-wrapper">
						<div
							className={ `blpge_divider blpge_divider--id-${ id }` }
							data-aos={
								! this.props.editor ? animation.type : null
							}
							data-aos-delay={
								! animation.type ? null : animation.delay
							}
							data-aos-duration={
								! animation.type ? null : animation.duration
							}
							data-aos-once={ ! animation.type ? null : true }
						>
							<div className="blpge_divider__wrapper">
								<span class="blpge_divider__wrapper__line" />
								{ iconEnable ? (
									<div class="blpge_divider__wrapper__icon">
										<FontAwesomeIcon
											icon={ iconObject.icon }
										/>
									</div>
								) : null }
							</div>
							{ this.props.editor ? (
								<style
									dangerouslySetInnerHTML={ {
										__html: editor_css,
									} }
								/>
							) : null }
						</div>
					</div>
				</div>
			</div>
		);
	}
}
