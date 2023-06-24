/**
 *
 * The Button component
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { RichText } = wp.blockEditor;
const { dispatch, select } = wp.data;

// Import blpge dependencies
const {
	blpge_spacing_cssGen,
	blpge_background_cssGen,
	blpge_shadow_cssGen,
	blpge_border_cssGen,
	blpge_overlay_cssGen,
	blpge_typography_cssGen,
} = blpgelib.utilities;
const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;

// Import external dependencies
import classNames from 'classnames/bind';
import blpge_iconPicker_cssGen from '../../../blpge-library/utilities/iconPicker_css_generator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default class Button extends Component {
	constructor( props ) {
		super( ...arguments );
	}
	render() {
		const {
			attributes: {
				id,
				url,
				text,
				size,
				linkNoFollow,
				linkBlank,
				align,
				iconAlign,
				iconEnable,
				typography,
				spacing,
				background,
				overlay,
				border,
				shadow,
				animation,
				icon_background,
				icon_border,
				icon_spacing,
				btn_icon,
			},
			className,
			setAttributes,
		} = this.props;

		// General Settings
		let btn_wrapper = `blpge_btn-wrapper blpge_btn-wrapper-${ id }`;
		let final_css;

		let iconObject = btn_icon;

		final_css = blpge_cssGen(
			`.blpge_btn-wrapper-${ id }`,
			[ 'justify-content' ],
			[ align ],
			final_css
		);

		// Typography
		final_css = blpge_typography_cssGen(
			typography,
			`.blpge_btn--style-${ id }`,
			final_css,
			`.blpge_btn--style-${ id }`
		);

		// Shadow
		final_css = blpge_shadow_cssGen(
			shadow,
			`.blpge_btn--style-${ id }`,
			final_css
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_btn--style-${ id }`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_btn--style-${ id }`,
			final_css
		);

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_btn--style-${ id }`,
			final_css
		);

		// Overlay
		final_css = blpge_overlay_cssGen(
			overlay,
			`.blpge_btn--style-${ id }`,
			final_css
		);

		// Icon direction
		final_css = blpge_cssGen(
			`.blpge_btn__icon--${ id }`,
			[ 'order' ],
			[ iconAlign ],
			final_css
		);

		/******* ICON Styling ***************/
		// icon Spacing
		final_css = blpge_spacing_cssGen(
			icon_spacing,
			`.blpge_btn__icon--${ id }`,
			final_css
		);

		// icon Border
		final_css = blpge_border_cssGen(
			icon_border,
			`.blpge_btn__icon--${ id }`,
			final_css
		);

		// icon Background
		final_css = blpge_background_cssGen(
			icon_background,
			`.blpge_btn__icon--${ id }`,
			final_css
		);

		// icon
		final_css = blpge_iconPicker_cssGen(
			btn_icon,
			`.blpge_btn__icon--${ id } svg`,
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
							className={ btn_wrapper }
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
							{ this.props.editor ? (
								<a
									href={ url }
									className={ classNames(
										'blpge_btn',
										`blpge_btn--${ size } blpge_btn--style-${ id }`
									) }
									rel={
										linkBlank && linkNoFollow === true
											? 'noreferrer noopener nofollow'
											: linkBlank
											? 'noreferrer noopener'
											: linkNoFollow
											? 'nofollow'
											: undefined
									}
									target={ linkBlank ? '_blank' : null }
								>
									<span className="blpge_btn__text">
										<RichText
											className="blpge_editor_richText"
											format="string"
											value={ text }
											onChange={ ( value ) => {
												setAttributes( {
													text: value,
												} );
											} }
										/>
									</span>
									{ iconEnable ? (
										<div
											className={ classNames(
												`blpge_btn__icon blpge_btn__icon--${ id }`
											) }
										>
											<FontAwesomeIcon
												icon={ iconObject.icon }
											/>
										</div>
									) : null }
								</a>
							) : (
								<a
									href={ url }
									className={ classNames(
										'blpge_btn',
										`blpge_btn--${ size } blpge_btn--style-${ id }`
									) }
									rel={
										linkBlank && linkNoFollow === true
											? 'noreferrer noopener nofollow'
											: linkBlank
											? 'noreferrer noopener'
											: linkNoFollow
											? 'nofollow'
											: undefined
									}
									target={ linkBlank ? '_blank' : null }
								>
									<span className="blpge_btn__text">
										<RichText.Content value={ text } />
									</span>
									{ iconEnable ? (
										<div
											className={ classNames(
												`blpge_btn__icon blpge_btn__icon--${ id }`
											) }
										>
											<FontAwesomeIcon
												icon={ iconObject.icon }
											/>
										</div>
									) : null }
								</a>
							) }
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
