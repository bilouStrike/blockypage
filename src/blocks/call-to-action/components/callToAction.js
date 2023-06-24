/**
 *
 * Container Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { dispatch, select } = wp.data;
const { InnerBlocks, RichText } = wp.blockEditor;
// Import blpge dependencies
const {
	blpge_spacing_cssGen,
	blpge_background_cssGen,
	blpge_border_cssGen,
	blpge_typography_cssGen,
} = blpgelib.utilities;

// Container Component
const { blpge_class_based_mq_css } = blpgelib.helpers;

const { SubBlock } = blpgelib.editor;

export default class CallToAction extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				type,
				layout,
				imageEnable,
				image,
				title,
				text,
				title_typo,
				title_spacing,
				text_typo,
				text_spacing,
				spacing,
				border,
				background,
				animation,
			},
			setAttributes,
			className,
		} = this.props;

		/**********************************
    // Block Class Names 
    /******************************** */
		let callToActionClassName = `blpge_calltoaction blpge_calltoaction--block blpge_calltoaction--id-${ id }`;
		if ( type == 'full-width' ) {
			headingClassName += ' blpge_calltoaction--fluid';
		}

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block
		let final_css;

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_calltoaction--id-${ id }`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_calltoaction--id-${ id }`,
			final_css
		);

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_calltoaction--id-${ id }`,
			final_css
		);

		/********** Title ************/
		// typo
		final_css = blpge_typography_cssGen(
			title_typo,
			`.blpge_calltoaction--id-${ id } .blpge_calltoaction__title`,
			final_css,
			`.blpge_calltoaction--id-${ id } .blpge_calltoaction__title`
		);
		// spacing
		final_css = blpge_spacing_cssGen(
			title_spacing,
			`.blpge_calltoaction--id-${ id } .blpge_calltoaction__title`,
			final_css
		);

		/********** Text ************/
		// typo
		final_css = blpge_typography_cssGen(
			text_typo,
			`.blpge_calltoaction--id-${ id } .blpge_calltoaction__text`,
			final_css,
			`.blpge_calltoaction--id-${ id } .blpge_calltoaction__text`
		);
		// spacing
		final_css = blpge_spacing_cssGen(
			text_spacing,
			`.blpge_calltoaction--id-${ id } .blpge_calltoaction__text`,
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
							className={ callToActionClassName }
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
							<div
								className={ `blpge_calltoaction__layout-style-${ layout }` }
							>
								{ imageEnable ? (
									<div className="blpge_calltoaction__image"></div>
								) : null }
								<SubBlock { ...this.props } name="title">
									<div className="blpge_calltoaction__title">
										{ this.props.editor ? (
											<RichText
												className="blpge_editor_richText"
												tagName="span"
												format="string"
												value={ title }
												onChange={ ( value ) => {
													setAttributes( {
														title: value,
													} );
												} }
											/>
										) : (
											<RichText.Content value={ title } />
										) }
									</div>
								</SubBlock>
								<SubBlock { ...this.props } name="description">
									<div className="blpge_calltoaction__text">
										{ this.props.editor ? (
											<RichText
												className="blpge_editor_richText"
												tagName="span"
												format="string"
												value={ text }
												onChange={ ( value ) => {
													setAttributes( {
														text: value,
													} );
												} }
											/>
										) : (
											<RichText.Content value={ text } />
										) }
									</div>
								</SubBlock>
								<div className="blpge_calltoaction__button">
									{ this.props.editor ? (
										<InnerBlocks
											template={ [
												[
													'blockypage-blocks/button',
													{ text: 'Subscribe Now!' },
												],
											] }
											templateLock="all"
											templateInsertUpdatesSelection={
												false
											}
										/>
									) : (
										<InnerBlocks.Content />
									) }
								</div>
							</div>
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
