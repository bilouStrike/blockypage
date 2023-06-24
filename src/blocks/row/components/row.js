/**
 *
 * Row Component.
 *
 */

const { Component } = wp.element;
const { dispatch, select } = wp.data;

const {
	blpge_spacing_cssGen,
	blpge_background_cssGen,
	blpge_border_cssGen,
	blpge_shadow_cssGen,
	blpge_typography_cssGen,
	blpge_overlay_cssGen,
} = blpgelib.utilities;

const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;

export default class Row extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		// Destructuring variables
		const {
			attributes: {
				id,
				typography,
				shadow,
				gutterClassName,
				rowLayout,
				brp_rowLayout,
				width,
				widthUnit,
				minHeight,
				minHeightUnit,
				animation,
				spacing,
				border,
				background,
				overlay,
			},
			className,
		} = this.props;

		/**********************************
    // Block ClassName
    /**********************************/
		let rowClassName = `blpge_row blpge_row--block`;
		if ( this.props.editor && rowLayout != '1' ) {
			rowClassName += ' blpge_row-styled';
			rowClassName += ` blpge_row-style-${ rowLayout }`;
			if ( brp_rowLayout[ 0 ] ) {
				rowClassName += ` blpge_row-style--md-${ brp_rowLayout[ 0 ] }`;
			}
			if ( brp_rowLayout[ 1 ] ) {
				rowClassName += ` blpge_row-style--sm-${ brp_rowLayout[ 1 ] }`;
			}
			if ( brp_rowLayout[ 2 ] ) {
				rowClassName += ` blpge_row-style--xs-${ brp_rowLayout[ 2 ] }`;
			}
		}
		rowClassName += ` blpge_row-${ id }`;

		// Add Gutter ClassName
		if ( gutterClassName ) {
			rowClassName += ` ${ gutterClassName }`;
		}

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block
		let final_css;

		// General Settings
		final_css = blpge_cssGen(
			`.blpge_row-${ id }`,
			[ 'max-width', 'min-height' ],
			[
				[
					[ width[ 0 ], widthUnit[ 0 ] ],
					[ width[ 1 ], widthUnit[ 1 ] ],
					[ width[ 2 ], widthUnit[ 2 ] ],
					[ width[ 3 ], widthUnit[ 3 ] ],
				],
				[
					[ minHeight[ 0 ], minHeightUnit[ 0 ] ],
					[ minHeight[ 1 ], minHeightUnit[ 1 ] ],
					[ minHeight[ 2 ], minHeightUnit[ 2 ] ],
					[ minHeight[ 3 ], minHeightUnit[ 3 ] ],
				],
			]
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_row-${ id }`,
			final_css
		);

		// Typography
		final_css = blpge_typography_cssGen(
			typography,
			`.blpge_row-${ id }`,
			final_css
		);

		// Shadow
		final_css = blpge_shadow_cssGen(
			shadow,
			`.blpge_row-${ id }`,
			final_css
		);

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_row-${ id }`,
			final_css
		);

		// Overlay
		final_css = blpge_overlay_cssGen(
			overlay,
			`.blpge_row-${ id } > .blpge_backgroundOverlay`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_row-${ id }`,
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
							className={ rowClassName }
							data-aos={
								! this.props.editor ? animation.type : null
							}
							data-aos-delay={
								! this.props.editor ? animation.delay : null
							}
							data-aos-duration={
								! this.props.editor ? animation.duration : null
							}
							data-aos-once={
								! this.props.editor ? 'true' : null
							}
						>
							<div class="blpge_backgroundOverlay" />

							{ this.props.children }
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
