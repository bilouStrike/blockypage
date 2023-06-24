/**
 *
 * Accordion Component
 *
 */
import '../child-blocks/accordion-item/index.js';
// Import wp dependencies
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const { dispatch, select } = wp.data;
const { Dashicon } = wp.components;

// Import blpge dependencies
const {
	blpge_spacing_cssGen,
	blpge_background_cssGen,
	blpge_border_cssGen,
	blpge_typography_cssGen,
	blpge_iconPicker_cssGen,
} = blpgelib.utilities;

const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;

export default class Accordion extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const self = this;
		const {
			attributes: {
				id,
				spacing,
				width,
				widthUnit,
				icon,
				rtl,
				accordion_icon,
				iconPosition,
				iconSize,
				accordianElements,
				accordionTitleBackground,
				accordionTitleTypo,
				accordionTitleSpacing,
				accordionTitleBorder,
				accordionContentBackground,
				accordionContentTypo,
				accordionContentSpacing,
				accordionContentBorder,
				icon_typography,
				icon_spacing,
				icon_background,
				icon_border,
				animation,
			},
			className,
			setAttributes,
		} = this.props;

		let final_css;

		// An array to hold the accordion react elements

		let accordionContainer = `blpge_accordion blpge_accordion-id_${ id }`;
		var currentAccordion = accordianElements.slice();

		/*********************************************/
		/**********  ACCORDION TITLE  ***************/
		/****************************************** */

		// General Settings
		final_css = blpge_cssGen(
			`.blpge_accordion-id_${ id }`,
			[ 'max-width' ],
			[
				[
					[ width[ 0 ], widthUnit[ 0 ] ],
					[ width[ 1 ], widthUnit[ 1 ] ],
					[ width[ 2 ], widthUnit[ 2 ] ],
					[ width[ 3 ], widthUnit[ 3 ] ],
				],
			]
		);

		// spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_accordion-id_${ id }`,
			final_css
		);

		// Icon Position
		if ( iconPosition == 'left' ) {
			final_css = blpge_cssGen(
				`.blpge_accordion-id_${ id } .blpge_accordion__items .blpge_according__items__link__title`,
				[ 'justify-content' ],
				[ 'normal' ],
				final_css
			);

			final_css = blpge_cssGen(
				`.blpge_accordion-id_${ id } .blpge_accordion__items .blpge_according__items__link__title svg`,
				[ 'order' ],
				[ -1 ],
				final_css
			);
		}

		// rtl accordion
		rtl
			? ( final_css = blpge_cssGen(
					`.blpge_accordion-id_${ id } .blpge_accordion__items .blpge_according__items__link__title`,
					[ 'flex-direction' ],
					[ 'row-reverse' ],
					final_css
			  ) )
			: null;

		/****** Iconn style  *****/
		/************************ */
		final_css = blpge_iconPicker_cssGen(
			accordion_icon,
			`.blpge_accordion-id_${ id } .blpge_according__items__link__title svg`,
			final_css
		);

		// spacing
		final_css = blpge_spacing_cssGen(
			icon_spacing,
			`.blpge_accordion-id_${ id } .blpge_according__items__link__title svg`,
			final_css
		);

		// border
		final_css = blpge_border_cssGen(
			icon_border,
			`.blpge_accordion-id_${ id } .blpge_according__items__link__title svg`,
			final_css
		);

		// background
		final_css = blpge_background_cssGen(
			icon_background,
			`.blpge_accordion-id_${ id } .blpge_according__items__link__title svg`,
			final_css
		);
		/*********************************** */

		// Accordion title Background
		final_css = blpge_background_cssGen(
			accordionTitleBackground,
			`.blpge_accordion-id_${ id } .blpge_accordion__items .blpge_according__items__link__title`,
			final_css
		);

		// Accordion title typography
		final_css = blpge_typography_cssGen(
			accordionTitleTypo,
			`.blpge_accordion-id_${ id } .blpge_accordion__items .blpge_according__items__link__title`,
			final_css
		);

		// Accordion title spacing
		final_css = blpge_spacing_cssGen(
			accordionTitleSpacing,
			`.blpge_accordion-id_${ id } .blpge_accordion__items .blpge_according__items__link__title`,
			final_css
		);

		// Accordion title border
		final_css = blpge_border_cssGen(
			accordionTitleBorder,
			`.blpge_accordion-id_${ id } .blpge_accordion__items .blpge_according__items__link__title`,
			final_css
		);

		/*********************************************/
		/**********  ACCORDION ICON  ***************/
		/****************************************** */

		// Accordion icon Background
		final_css = blpge_background_cssGen(
			icon_background,
			`.blpge_accordion-id_${ id } .blpge_according__items__link__title i`,
			final_css
		);

		// Accordion icon typography
		final_css = blpge_typography_cssGen(
			icon_typography,
			`.blpge_accordion-id_${ id } .blpge_according__items__link__title i`,
			final_css
		);

		// Accordion icon spacing
		final_css = blpge_spacing_cssGen(
			icon_spacing,
			`.blpge_accordion-id_${ id } .blpge_according__items__link__title i`,
			final_css
		);

		// Accordion icon border
		final_css = blpge_border_cssGen(
			icon_border,
			`.blpge_accordion-id_${ id } .blpge_according__items__link__title i`,
			final_css
		);

		/*********************************************/
		/**********  ACCORDION CONTENT ***************/
		/****************************************** */

		// Accordion content Background
		final_css = blpge_background_cssGen(
			accordionContentBackground,
			`.blpge_accordion-id_${ id } .blpge_accordion__items .blpge_according__items__link__content`,
			final_css
		);

		// Accordion content typography
		final_css = blpge_typography_cssGen(
			accordionContentTypo,
			`.blpge_accordion-id_${ id } .blpge_accordion__items .blpge_according__items__link__content`,
			final_css
		);

		// Accordion content spacing
		final_css = blpge_spacing_cssGen(
			accordionContentSpacing,
			`.blpge_accordion-id_${ id } .blpge_accordion__items .blpge_according__items__link__content`,
			final_css
		);

		// Accordion content border
		final_css = blpge_border_cssGen(
			accordionContentBorder,
			`.blpge_accordion-id_${ id } .blpge_accordion__items .blpge_according__items__link__content`,
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
							class={ accordionContainer }
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
							<ul className="blpge_accordion__items">
								{ this.props.editor ? (
									<InnerBlocks
										allowedBlocks={ [
											'blockypage-blocks/accordion-item',
										] }
										template={ [
											[
												'blockypage-blocks/accordion-item',
												{ icon: accordion_icon.icon },
											],
										] }
									/>
								) : (
									<InnerBlocks.Content />
								) }
								{ this.props.editor ? (
									<li
										className="blpge_accordion__items__add-item-button"
										onClick={ () => {
											const tab_id = Math.floor(
												Math.random() * 1010
											);
											const tabGeneratedTitle = `Accordion Title`;
											const tabObjectContent = {
												id: tab_id,
											};
											icon,
												iconPosition,
												iconSize,
												currentAccordion.push(
													tabObjectContent
												);
											setAttributes( {
												accordianElements: currentAccordion,
											} );
											let insertedBlock;
											insertedBlock = wp.blocks.createBlock(
												'blockypage-blocks/accordion-item',
												{
													id: tab_id,
													title: tabGeneratedTitle,
													icon: accordion_icon.icon,
												}
											);
											dispatch(
												'core/block-editor'
											).insertBlock(
												insertedBlock,
												currentAccordion.length,
												self.props.clientId
											);
										} }
									>
										<Dashicon
											icon="insert"
											title="Add Accordion"
										/>
										<span>Add Accordion</span>
									</li>
								) : null }
							</ul>
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
