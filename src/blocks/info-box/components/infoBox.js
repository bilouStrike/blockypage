/**
 *
 * InfoBox Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { dispatch, select } = wp.data;
const { RichText, InnerBlocks } = wp.blockEditor;
// Import blpge dependencies
const {
	blpge_spacing_cssGen,
	blpge_background_cssGen,
	blpge_border_cssGen,
	blpge_typography_cssGen,
	blpge_shadow_cssGen,
	blpge_iconPicker_cssGen,
} = blpgelib.utilities;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { blpge_class_based_mq_css, blpge_cssGen } = blpgelib.helpers;
const { SubBlock } = blpgelib.editor;

export default class InfoBox extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				type,
				style,
				align,
				title,
				information,
				image,
				imageWidth,
				imageWidthUnit,
				button,
				image_border,
				enabled_icon,
				infoBox_icon,
				icon_background,
				icon_spacing,
				icon_border,
				customIcon,
				spacing,
				border,
				background,
				shadow,
				titleTypo,
				titleSpacing,
				informationTypo,
				informationSpacing,
				animation,
			},
			className,
			setAttributes,
		} = this.props;

		/**********************************
    // Block Class Names 
    /******************************** */
		let infoBoxClassName = `blpge_infoBox blpge_infoBox--block blpge_infoBox--id-${ id }`;
		if ( type == 'full-width' ) {
			infoBoxClassName += ' blpge_infoBox--fluid';
		}

		let iconPiccker_object = infoBox_icon;

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block
		let final_css;

		// Image width
		final_css = blpge_cssGen(
			`.blpge_infoBox--id-${ id } img`,
			[ 'width' ],
			[
				[
					[ imageWidth[ 0 ], imageWidthUnit[ 0 ] ],
					[ imageWidth[ 1 ], imageWidthUnit[ 1 ] ],
					[ imageWidth[ 2 ], imageWidthUnit[ 2 ] ],
					[ imageWidth[ 3 ], imageWidthUnit[ 3 ] ],
				],
			]
		);

		// Align
		final_css = blpge_cssGen(
			`.blpge_infoBox--id-${ id }`,
			[ 'text-align' ],
			[ align ],
			final_css
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_infoBox--id-${ id }`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_infoBox--id-${ id }`,
			final_css
		);

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_infoBox--id-${ id }`,
			final_css
		);

		// Shadow
		final_css = blpge_shadow_cssGen(
			shadow,
			`.blpge_infoBox--id-${ id }`,
			final_css
		);

		// image border
		final_css = blpge_border_cssGen(
			image_border,
			`.blpge_infoBox--id-${ id } img`,
			final_css
		);

		/** Title *****/
		// typo
		final_css = blpge_typography_cssGen(
			titleTypo,
			`.blpge_infoBox--id-${ id } .blpge_infoBox__title, .blpge_infoBox--id-${ id } .blpge_infoBox__title p`,
			final_css,
			`.blpge_infoBox--id-${ id } .blpge_infoBox__title, .blpge_infoBox--id-${ id } .blpge_infoBox__title p`
		);

		// spacing
		final_css = blpge_spacing_cssGen(
			titleSpacing,
			`.blpge_infoBox--id-${ id } .blpge_infoBox__title`,
			final_css
		);

		/** Infor *****/
		// typo
		final_css = blpge_typography_cssGen(
			informationTypo,
			`.blpge_infoBox--id-${ id } .blpge_infoBox__information, .blpge_infoBox--id-${ id } .blpge_infoBox__information p`,
			final_css,
			`.blpge_infoBox--id-${ id } .blpge_infoBox__information, .blpge_infoBox--id-${ id } .blpge_infoBox__information p`
		);

		// spacing
		final_css = blpge_spacing_cssGen(
			informationSpacing,
			`.blpge_infoBox--id-${ id } .blpge_infoBox__information`,
			final_css
		);

		/** Icon  */
		// icon style

		final_css = blpge_iconPicker_cssGen(
			infoBox_icon,
			`.blpge_infoBox--id-${ id } .blpge_infoBox__media svg`,
			final_css
		);

		// spacing
		final_css = blpge_spacing_cssGen(
			icon_spacing,
			`.blpge_infoBox--id-${ id } .blpge_infoBox__media svg`,
			final_css
		);

		// border
		final_css = blpge_border_cssGen(
			icon_border,
			`.blpge_infoBox--id-${ id } .blpge_infoBox__media svg`,
			final_css
		);

		// background
		final_css = blpge_background_cssGen(
			icon_background,
			`.blpge_infoBox--id-${ id } .blpge_infoBox__media svg`,
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
							className={ infoBoxClassName }
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
								className={ `blpge_infoBox__layout-style-${ style }` }
							>
								{ enabled_icon ? (
									<SubBlock { ...this.props } name="media">
										<div className="blpge_infoBox__media">
											{ customIcon ? (
												image ? (
													<img src={ image } />
												) : (
													<FontAwesomeIcon
														icon={ [
															'fas',
															'info-circle',
														] }
													/>
												)
											) : iconPiccker_object.icon ? (
												<FontAwesomeIcon
													icon={
														iconPiccker_object.icon
													}
												/>
											) : (
												<FontAwesomeIcon
													icon={ [
														'fas',
														'info-circle',
													] }
												/>
											) }
										</div>
									</SubBlock>
								) : null }
								<div className="blpge_infoBox__content">
									<SubBlock { ...this.props } name="title">
										<div className="blpge_infoBox__title">
											{ this.props.editor ? (
												<RichText
													tagName="p"
													className="blpge_editor_richText"
													format="string"
													value={ title }
													onChange={ ( value ) => {
														setAttributes( {
															title: value,
														} );
													} }
												/>
											) : (
												<RichText.Content
													value={ title }
												/>
											) }
										</div>
									</SubBlock>
									<SubBlock
										{ ...this.props }
										name="information"
									>
										<div className="blpge_infoBox__information">
											{ this.props.editor ? (
												<RichText
													tagName="p"
													className="blpge_editor_richText"
													format="string"
													value={ information }
													onChange={ ( value ) => {
														setAttributes( {
															information: value,
														} );
													} }
												/>
											) : (
												<RichText.Content
													value={ information }
												/>
											) }
										</div>
									</SubBlock>
									{ button ? (
										<div className="blpge_infoBox__button">
											{ this.props.editor ? (
												<InnerBlocks
													template={ [
														[
															'blockypage-blocks/button',
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
									) : null }
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
