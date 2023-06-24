/**
 *
 * InfoBox Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { dispatch, select } = wp.data;
const { InnerBlocks } = wp.blockEditor;
// Import blpge dependencies
const {
	blpge_spacing_cssGen,
	blpge_background_cssGen,
	blpge_border_cssGen,
	blpge_iconPicker_cssGen,
} = blpgelib.utilities;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const { blpge_class_based_mq_css } = blpgelib.helpers;

export default class IconBox extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				type,
				iconBox_icon,
				icon_background,
				icon_spacing,
				icon_border,
				animation,
			},
			className,
		} = this.props;

		/**********************************
    // Block Class Names 
    /******************************** */
		let iconBoxClassName = `blpge_iconBox blpge_iconBox--block blpge_iconBox--id-${ id }`;
		if ( type == 'full-width' ) {
			infoBoxClassName += ' blpge_iconBox--fluid';
		}

		let iconPiccker_object = iconBox_icon;

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block
		let final_css;

		let theIcon = ! iconPiccker_object.icon
			? 'info-circle'
			: iconPiccker_object.icon;

		/** Icon  */
		// icon style

		final_css = blpge_iconPicker_cssGen(
			iconBox_icon,
			`.blpge_iconBox--id-${ id } svg`,
			final_css
		);

		// spacing
		final_css = blpge_spacing_cssGen(
			icon_spacing,
			`.blpge_iconBox--id-${ id } svg`,
			final_css
		);

		// border
		final_css = blpge_border_cssGen(
			icon_border,
			`.blpge_iconBox--id-${ id } svg`,
			final_css
		);

		// background
		final_css = blpge_background_cssGen(
			icon_background,
			`.blpge_iconBox--id-${ id } svg`,
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
							className={ iconBoxClassName }
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
							<div className="blpge_iconBox__layout-style-1">
								<FontAwesomeIcon icon={ theIcon } />
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
