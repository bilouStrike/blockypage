/**
 *
 * Text Component.
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
	blpge_typography_cssGen,
} = blpgelib.utilities;

// Container Component
const { blpge_class_based_mq_css } = blpgelib.helpers;

export default class Text extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				type,
				typography,
				spacing,
				border,
				background,
				animation,
			},
			className,
		} = this.props;

		/**********************************
    // Block Class Names 
    /******************************** */
		let textClassName = `blpge_textBlock blpge_textblock--id-${ id }`;
		if ( type == 'full-width' ) {
			textClassName += ' blpge_textBlock--fluid';
		}

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block
		let final_css;

		// Typography
		final_css = blpge_typography_cssGen(
			typography,
			`.blpge_textblock--id-${ id }`,
			final_css,
			`.blpge_textblock--id-${ id }`
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_textblock--id-${ id }`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_textblock--id-${ id }`,
			final_css
		);

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_textblock--id-${ id }`,
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
							className={ textClassName }
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
