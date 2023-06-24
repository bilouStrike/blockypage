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
	blpge_shadow_cssGen,
	blpge_border_cssGen,
	blpge_shapeDivider_cssGen,
	blpge_overlay_cssGen,
	blpge_typography_cssGen,
} = blpgelib.utilities;
const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;

// Import component dependencies
import shapes from './shapes';

export default class Container extends Component {
	constructor( props ) {
		super( ...arguments );
		const self = this;
		let cWidth, cHeight;
	}

	componentDidMount() {
		if ( self._container ) {
			this.cWidth = self._container.clientWidth;
			this.cHeight = this.cWidth / 1.77;
		} else {
			this.forceUpdate();
		}
	}

	componentDidUpdate() {
		if ( self._container ) {
			this.cWidth = self._container.clientWidth;
			this.cHeight = this.cWidth / 1.77;
		} else {
			this.forceUpdate();
		}
	}

	render() {
		const {
			attributes: {
				id,
				type,
				width,
				innerMaxWidth,
				innerMaxWidthUnit,
				widthUnit,
				minHeight,
				minHeightUnit,
				htmlTag,
				animation,
				shadow,
				typography,
				spacing,
				border,
				background,
				shapeDivider,
				overlay,
			},
			className,
		} = this.props;
		/**********************************
    // Block ClassName 
    /******************************** */

		// container className
		let containerClassName = `blpge_container blpge_container--block blpge_container-${ id }`;

		if ( type == 'full-width' ) {
			containerClassName += ' blpge_container--fluid';
		}

		let containerId = `blpge_container-${ id }`;

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block
		let final_css;

		final_css = blpge_cssGen(
			`.blpge_container-${ id } .blpge_container--block__wrapper`,
			[ 'max-width' ],
			[ [ innerMaxWidth, innerMaxWidthUnit ] ]
		);

		// General Settings
		final_css = blpge_cssGen(
			`.blpge_container-${ id }`,
			[ 'max-width', 'min-height' ],
			[
				[
					[ width[ 0 ], widthUnit[ 0 ] ],
					[ width[ 1 ], widthUnit[ 1 ] ],
					[ width[ 2 ], widthUnit[ 2 ] ],
					[ width[ 3 ], widthUnit[ 3 ] ],
				],
				[
					[ minHeight[ 0 ], minHeightUnit[ 0 ] ],
					[ minHeight[ 1 ], minHeightUnit[ 1 ] ],
					[ minHeight[ 2 ], minHeightUnit[ 2 ] ],
					[ minHeight[ 3 ], minHeightUnit[ 3 ] ],
				],
			],
			final_css
		);

		// Typography
		final_css = blpge_typography_cssGen(
			typography,
			`.blpge_container-${ id }`,
			final_css
		);

		// Shadow
		final_css = blpge_shadow_cssGen(
			shadow,
			`.blpge_container-${ id }`,
			final_css
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_container-${ id }`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_container-${ id }`,
			final_css
		);

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_container-${ id }`,
			final_css
		);

		// Shape Divider
		final_css = blpge_shapeDivider_cssGen(
			shapeDivider,
			`.blpge_container-${ id } `,
			final_css
		);

		// Overlay
		final_css = blpge_overlay_cssGen(
			overlay,
			`.blpge_container-${ id } > .blpge_backgroundOverlay`,
			final_css
		);

		// Get the shape divider Object
		const shapeDividerObject = shapeDivider;

		// Get background object
		const backgroundObject = background;
		let url = backgroundObject.video;
		let videoURL, src;

		//videoURL = extract_url(url);
		if ( url ) {
			if (
				( videoURL = url.match(
					/(youtube|youtu|vimeo|dailymotion)\.(com|be)\/((watch\?v=([-\w]+))|(video\/([-\w]+))|([-\w]+))/
				) )
			) {
				if ( videoURL[ 1 ] == 'youtube' ) {
					src =
						'https://www.youtube.com/embed/' +
						videoURL[ 5 ] +
						'?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1';
				} else if ( videoURL[ 1 ] == 'youtu' ) {
					src =
						'https://www.youtube.com/embed/' +
						videoURL[ 3 ] +
						'?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1';
				} else if ( videoURL[ 1 ] == 'vimeo' ) {
					src = 'https://player.vimeo.com/video/' + videoURL[ 3 ];
				} else if ( videoURL[ 1 ] == 'dailymotion' ) {
					src =
						'https://www.dailymotion.com/embed/video/' +
						videoURL[ 6 ];
				}
			} else {
				src = url;
			}
		}

		let background_video = `background-video-${ id }`;
		let videoCalcule = `
        var cwidth = document.getElementById('blpge_container-${ id }').clientWidth;
        var cheight = cwidth / 1.77;
        document.getElementById('background-video-${ id }').width = cwidth;
        document.getElementById('background-video-${ id }').height = cheight;
    `;

		// Custom HTML tag
		const CustomTag = htmlTag;

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
						<CustomTag
							ref={ function ( el ) {
								self._container = el;
							} }
							id={ containerId }
							className={ containerClassName }
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
							<div class="blpge_backgroundOverlay" />
							<div className="blpge_container--block__wrapper">
								{ shapeDividerObject.topShape.shape ? (
									<div className="blpge_shape-divider-container blpge_shape-divider-container--top">
										{
											shapes[
												shapeDividerObject.topShape
													.shape
											]
										}
									</div>
								) : null }

								{ backgroundObject.backgroundState == 'video' &&
								backgroundObject.video ? (
									<div className="blpge_container__videoContainer">
										<iframe
											src={ src }
											width={ this.cWidth }
											height={ this.cHeight }
											id={ background_video }
											frameborder="0"
										/>
										<img
											src={ backgroundObject.videoPoster }
										/>
										<script
											dangerouslySetInnerHTML={ {
												__html: videoCalcule,
											} }
										/>
									</div>
								) : null }
								{ shapeDividerObject.bottomShape.shape ? (
									<div className="blpge_shape-divider-container blpge_shape-divider-container--bottom">
										{
											shapes[
												shapeDividerObject.bottomShape
													.shape
											]
										}
									</div>
								) : null }
								{ this.props.children }
							</div>
						</CustomTag>
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
		);
	}
}
