/**
 *
 * Single accordion component.
 *
 */

// Import wp dependencies
const { __ } = wp.i18n;
const { InnerBlocks, RichText } = wp.blockEditor;
const { Component } = wp.element;
const { dispatch, select } = wp.data;

// Import block dependencies
const {
	blpge_spacing_cssGen,
	blpge_background_cssGen,
	blpge_typography_cssGen,
	blpge_border_cssGen,
} = blpgelib.utilities;
const { blpge_class_based_mq_css } = blpgelib.helpers;
const { BlockAppender } = blpgelib.editor;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Register Block
export default class AccordionItem extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				title,
				icon,
				tabBackground,
				tabTypography,
				tabSpacing,
				tabBorder,
				contentBackground,
				contentBorder,
				contentSpacing,
				contentTypo,
			},
			setAttributes,
			className,
		} = this.props;

		let theIcon = icon;
		function jqueryaccordion( e, boxName ) {
			var box = document.getElementById( boxName );
			let accordionContent;
			accordionContent = box.getElementsByClassName(
				'blpge_according__items__link__content'
			);
			if ( accordionContent[ 0 ].style.display == 'block' ) {
				accordionContent[ 0 ].style.display = 'none';
			} else {
				accordionContent[ 0 ].style.display = 'block';
			}
			let blpge_accordion;
			let helper_selector;
			if ( e.target.tagName == 'H3' ) {
				blpge_accordion = e.target.childNodes[ 1 ];
			} else if ( e.target.tagName == 'svg' ) {
				blpge_accordion = e.target;
			} else if ( e.target.tagName == 'DIV' ) {
				helper_selector = e.target.closest(
					'.blpge_according__items__link__title'
				);
				blpge_accordion = helper_selector.getElementsByTagName(
					'svg'
				)[ 0 ];
			}
			if ( jQuery( blpge_accordion ).hasClass( 'is-open' ) ) {
				jQuery( blpge_accordion ).removeClass( 'is-open' );
			} else {
				jQuery( blpge_accordion ).addClass( 'is-open' );
			}
		}
		let final_css;
		const accordionCardContainer = `blpge_accordion_container-${ id }`;

		////////////////////////////////////////////////
		///// Accordion title /////////////////////////
		//////////////////////////////////////////////

		// Title Background
		final_css = blpge_background_cssGen(
			tabBackground,
			`#${ accordionCardContainer } .blpge_according__items__link__title`,
			final_css
		);

		// Title typography
		final_css = blpge_typography_cssGen(
			tabTypography,
			`#${ accordionCardContainer } .blpge_according__items__link__title`,
			final_css
		);

		// Title spacing
		final_css = blpge_spacing_cssGen(
			tabSpacing,
			`#${ accordionCardContainer } .blpge_according__items__link__title`,
			final_css
		);

		// Title border
		final_css = blpge_border_cssGen(
			tabBorder,
			`#${ accordionCardContainer } .blpge_according__items__link__title`,
			final_css
		);

		///////////////////////////////////////////////////
		///////// Acoordion content ///////////////////////
		//////////////////////////////////////////////////

		// Content Background
		final_css = blpge_background_cssGen(
			contentBackground,
			`#${ accordionCardContainer } .blpge_according__items__link__content`,
			final_css
		);

		// Content border
		final_css = blpge_border_cssGen(
			contentBorder,
			`#${ accordionCardContainer } .blpge_according__items__link__content`,
			final_css
		);

		// Content Background
		final_css = blpge_spacing_cssGen(
			contentSpacing,
			`#${ accordionCardContainer } .blpge_according__items__link__content`,
			final_css
		);

		// Content Typography
		final_css = blpge_typography_cssGen(
			contentTypo,
			`#${ accordionCardContainer } .blpge_according__items__link__content`,
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

		return [
			// Include Inspector
			<li
				className={ `${ className } blpge_block-container blpge_accordion__items__link` }
				id={ accordionCardContainer }
			>
				<h3
					className="blpge_according__items__link__title"
					onClick={ () =>
						jqueryaccordion( event, accordionCardContainer )
					}
				>
					{ this.props.editor ? (
						<RichText
							format="string"
							value={ title }
							onChange={ ( value ) => {
								setAttributes( { title: value } );
							} }
						/>
					) : (
						<RichText.Content value={ title } />
					) }
					<FontAwesomeIcon icon={ theIcon } />
				</h3>
				<div className="blpge_according__items__link__content">
					{ this.props.editor ? (
						[
							<InnerBlocks templateLock={ false } />,
							<BlockAppender { ...this.props } />,
						]
					) : (
						<InnerBlocks.Content />
					) }
				</div>
				{ this.props.editor ? (
					<style dangerouslySetInnerHTML={ { __html: editor_css } } />
				) : null }
			</li>,
		];
	}
}
