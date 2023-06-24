/**
 *
 * Column Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { dispatch, select, subscribe } = wp.data;

// Import blpge dependencies
const {
	blpge_spacing_cssGen,
	blpge_background_cssGen,
	blpge_border_cssGen,
	blpge_shadow_cssGen,
	blpge_overlay_cssGen,
	blpge_typography_cssGen,
} = blpgelib.utilities;
const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				animation,
				brp_columnSize,
				border,
				verticalAlign,
				columnSize,
				spacing,
				background,
				overlay,
				typography,
				shadow,
				order,
			},
			className,
			clientId,
		} = this.props;

		// Get Device state
		const deviceStateIndex = blpge_getDeviceStateIndex();

		// Columns ClassName
		let col_className = `blpge_row__col--${ columnSize }`;
		if ( brp_columnSize[ 0 ] ) {
			col_className += ` blpge_row__col--md-${ brp_columnSize[ 0 ] }`;
		}
		if ( brp_columnSize[ 1 ] ) {
			col_className += ` blpge_row__col--sm-${ brp_columnSize[ 1 ] }`;
		}
		if ( brp_columnSize[ 2 ] ) {
			col_className += ` blpge_row__col--xs-${ brp_columnSize[ 2 ] }`;
		}
		col_className += ` blpge_col-${ id }`;

		// Holds the CSS of the block
		let final_css;

		// General Settings
		final_css = blpge_cssGen(
			`.blpge_col-${ id }`,
			[ 'align-items', 'order' ],
			[
				verticalAlign,
				[
					[ order[ 0 ] ],
					[ order[ 1 ] ],
					[ order[ 2 ] ],
					[ order[ 3 ] ],
				],
			],
			final_css
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_col-${ id }`,
			final_css
		);

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_col-${ id }`,
			final_css
		);

		// Typography
		final_css = blpge_typography_cssGen(
			typography,
			`.blpge_col-${ id }`,
			final_css
		);

		// Shadow
		final_css = blpge_shadow_cssGen(
			shadow,
			`.blpge_col-${ id }`,
			final_css
		);

		// Overlay
		final_css = blpge_overlay_cssGen(
			overlay,
			`.blpge_col-${ id } > .blpge_backgroundOverlay`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_col-${ id }`,
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

		let editor_css = blpge_class_based_mq_css( final_css );

		// Column order on the editor
		let column_order_css = '';
		for ( let i = 0; i < order.length; i++ ) {
			if ( order[ i ] && clientId ) {
				switch ( i ) {
					case 0:
						column_order_css += `#block-${ clientId } {
              order: ${ order[ i ] }}`;
						break;

					case 1:
						column_order_css += ` .blpge_is-tablet #block-${ clientId } {
              order: ${ order[ i ] }}`;
						break;
					case 2:
						column_order_css += ` .blpge_is-mobile-landscape #block-${ clientId } {
              order: ${ order[ i ] }}`;
						break;

					case 3:
						column_order_css += ` .blpge_is-mobile-portrait #block-${ clientId } {
              order: ${ order[ i ] }}`;
						break;

					default:
						break;
				}
				if ( column_order_css ) {
					if ( ! jQuery( `#block-${ clientId }-style` ).length ) {
						jQuery( 'body' ).append(
							`<div id="block-${ clientId }-style"><style>${ column_order_css }</style></div>`
						);
					} else {
						jQuery( `#block-${ clientId }-style` ).html(
							`<style>${ column_order_css }</style>`
						);
					}
				}
			}
		}

		return (
			<div
				className={ `${ col_className } ${ className }` }
				data-aos={ ! this.props.editor ? animation.type : null }
				data-aos-delay={ ! animation.type ? null : animation.delay }
				data-aos-duration={
					! animation.type ? null : animation.duration
				}
				data-aos-once={ ! animation.type ? null : true }
			>
				{ this.props.children }
				{ this.props.editor ? (
					<style dangerouslySetInnerHTML={ { __html: editor_css } } />
				) : null }
			</div>
		);
	}
}
