/**
 *
 * Container Component.
 *
 */

// Import wp dependencies
const { Component, Fragment } = wp.element;
const { dispatch, select } = wp.data;
const { MediaUpload, RichText } = wp.blockEditor;
const { __ } = wp.i18n;

// Import blpge dependencies
const {
	blpge_spacing_cssGen,
	blpge_border_cssGen,
	blpge_typography_cssGen,
	blpge_overlay_cssGen,
	blpge_shadow_cssGen,
} = blpgelib.utilities;

const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;
// Container Component

export default class Text extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				type,
				imageBlockUrl,
				imageBlockCaption,
				imageBlockAlt,
				imgAlign,
				typography,
				spacing,
				overlay,
				border,
				shadow,
				animation,
				width,
				widthUnit,
				height,
				heightUnit,
				showCaption,
			},
			className,
		} = this.props;

		/**********************************
    // Block Class Names 
    /******************************** */
		let imageClassName = `blpge_image blpge_image--id-${ id }`;
		if ( type == 'full-width' ) {
			imageClassName += ' blpge_image--fluid';
		}

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block
		let final_css;

		// Image Align
		final_css = blpge_cssGen(
			`.blpge_image--id-${ id }`,
			[ 'text-align' ],
			[ imgAlign ],
			final_css
		);

		// Image Width and Height
		final_css = blpge_cssGen(
			`.blpge_image--id-${ id } img`,
			[ 'width', 'height' ],
			[
				[
					[ width[ 0 ], widthUnit[ 0 ] ],
					[ width[ 1 ], widthUnit[ 1 ] ],
					[ width[ 2 ], widthUnit[ 2 ] ],
					[ width[ 3 ], widthUnit[ 3 ] ],
				],
				[
					[ height[ 0 ], heightUnit[ 0 ] ],
					[ height[ 1 ], heightUnit[ 1 ] ],
					[ height[ 2 ], heightUnit[ 2 ] ],
					[ height[ 3 ], heightUnit[ 3 ] ],
				],
			],
			final_css
		);

		// Typography
		final_css = blpge_typography_cssGen(
			typography,
			`.blpge_image--id-${ id } figcaption`,
			final_css
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_image--id-${ id }`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_image--id-${ id } img`,
			final_css
		);

		// Overlay
		final_css = blpge_overlay_cssGen(
			overlay,
			`.blpge_image--id-${ id } img`,
			final_css
		);

		// Shadow
		final_css = blpge_shadow_cssGen(
			shadow,
			`.blpge_image--id-${ id } img`,
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
							className={ imageClassName }
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
							{ imageBlockUrl ? (
								<Fragment>
									<img
										src={ imageBlockUrl }
										alt={ imageBlockAlt }
									/>
									{ showCaption ? (
										<figcaption>
											{ this.props.editor ? (
												<RichText
													format="string"
													value={ imageBlockCaption }
													onChange={ ( value ) => {
														this.props.setAttributes(
															{
																imageBlockCaption: value,
															}
														);
													} }
												/>
											) : (
												imageBlockCaption
											) }
										</figcaption>
									) : null }
								</Fragment>
							) : (
								<div className="blpge_upload_image">
									<MediaUpload
										onSelect={ ( imgObject ) =>
											this.props.setAttributes( {
												imageBlockUrl:
													imgObject.sizes.full.url,
											} )
										}
										type="image"
										render={ ( { open } ) => (
											<button
												className="blpge_upload_img_btn"
												onClick={ open }
											>
												{ __( 'Choose an image ' ) }
												<i className="fas fa-image" />
											</button>
										) }
									/>
								</div>
							) }
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
