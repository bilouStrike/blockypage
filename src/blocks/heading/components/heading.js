/**
 *
 * Container Component.
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

export default class Heading extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				type,
				headingTag,
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
		let headingClassName = `blpge_heading blpge_heading--block blpge_heading-${ id }`;
		if ( type == 'full-width' ) {
			headingClassName += ' blpge_heading--fluid';
		}

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block
		let final_css;

		// Typography
		final_css = blpge_typography_cssGen(
			typography,
			`.blpge_heading-${ id }`,
			final_css,
			`.blpge_heading-${ id }`
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_heading-${ id }`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_heading-${ id }`,
			final_css
		);

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_heading-${ id }`,
			final_css
		);

		let HeadingTag = headingTag;

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
						<HeadingTag
							className={ headingClassName }
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
						</HeadingTag>
					</div>
				</div>
			</div>
		);
	}
}
