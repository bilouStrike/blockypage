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
	blpge_shadow_cssGen,
	blpge_iconPicker_cssGen,
	blpge_overlay_cssGen,
} = blpgelib.utilities;

// Container Component
const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { blpge_video_popup } from './popup';

export default class VideoPopup extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				type,
				url,
				height,
				heightUnit,
				width,
				widthUnit,
				video_icon,
				video_cover_overlay,
				spacing,
				border,
				background,
				shadow,
				icon_background,
				icon_border,
				icon_spacing,
				animation,
			},
			className,
		} = this.props;

		/**********************************
    // Block Class Names 
    /******************************** */
		let videoClassName = `blpge_video blpge_video--block blpge_video--id-${ id }`;
		if ( type == 'full-width' ) {
			videoClassName += ' blpge_video--fluid';
		}

		let videourl = ! url
			? 'https://www.youtube.com/watch?v=T4wD93hssVw&t=3s'
			: url;

		let iconPiccker_object = video_icon;
		let videoIcon = iconPiccker_object.icon
			? iconPiccker_object.icon
			: 'play';

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block
		let final_css;

		// General Settings
		final_css = blpge_cssGen(
			`.blpge_video--id-${ id } > .blpge_video__layout--style_1`,
			[ 'max-width', 'min-height' ],
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
			]
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_video--id-${ id } .blpge_video__layout--style_1`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_video--id-${ id } .blpge_video__layout--style_1`,
			final_css
		);

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_video--id-${ id } .blpge_video__layout--style_1`,
			final_css
		);

		// Overlay
		final_css = blpge_overlay_cssGen(
			video_cover_overlay,
			`.blpge_video--id-${ id } > .blpge_video__layout--style_1 > .blpge_backgroundOverlay`,
			final_css
		);

		// Shadow
		final_css = blpge_shadow_cssGen(
			shadow,
			`.blpge_video--id-${ id } .blpge_video__layout--style_1`,
			final_css
		);

		/** Icon */
		// spacing
		final_css = blpge_iconPicker_cssGen(
			video_icon,
			`.blpge_video--id-${ id } svg`,
			final_css
		);
		// spacing
		final_css = blpge_spacing_cssGen(
			icon_spacing,
			`.blpge_video--id-${ id } svg`,
			final_css
		);

		// border
		final_css = blpge_border_cssGen(
			icon_border,
			`.blpge_video--id-${ id } svg`,
			final_css
		);

		// background
		final_css = blpge_background_cssGen(
			icon_background,
			`.blpge_video--id-${ id } svg`,
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
							className={ videoClassName }
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
							<div className="blpge_video__layout--style_1">
								<div class="blpge_backgroundOverlay" />

								<a
									href="#"
									onClick={ () => blpge_video_popup() }
									className="youtube-link"
									videoSrc={ videourl }
								>
									<FontAwesomeIcon icon={ videoIcon } />
								</a>
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
