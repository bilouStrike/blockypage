/**
 *
 * Testimonial Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { dispatch, select } = wp.data;
const { RichText } = wp.blockEditor;
// Import blpge dependencies
const {
	blpge_spacing_cssGen,
	blpge_background_cssGen,
	blpge_border_cssGen,
	blpge_typography_cssGen,
	blpge_shadow_cssGen,
} = blpgelib.utilities;

// Container Component
const { blpge_class_based_mq_css, blpge_cssGen } = blpgelib.helpers;
const { SubBlock } = blpgelib.editor;

import quotIcons from './quotIcons';

export default class Testimonial extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				type,
				topIcon,
				iconWidth,
				iconColor,
				topIconAlign,
				topIconY,
				topIconX,
				bottomIcon,
				bottomIconAlign,
				bottomIconY,
				bottomIconX,
				message,
				avatar,
				avatarWidth,
				avatarWidthUnit,
				avatarEnabled,
				name,
				job,
				background,
				border,
				spacing,
				animation,
				shadow,
				message_spacing,
				message_typo,
				message_background,
				avatar_spacing,
				avatar_border,
				name_spacing,
				name_typo,
				job_spacing,
				job_typo,
			},
			className,
		} = this.props;

		/**********************************
    // Block Class Names 
    /******************************** */
		let testimonialClassName = `blpge_testimonial blpge_testimonial--id-${ id }`;
		if ( type == 'full-width' ) {
			testimonialClassName += ' blpge_testimonial--fluid';
		}

		/**********************************
    // Generate CSS
    /******************************** */
		let final_css;

		/**********************************
    // Quots icons CSS
    /******************************** */
		//

		final_css = blpge_cssGen(
			`.blpge_testimonial--id-${ id } .blpge_testimonial__icon--top`,
			[ 'text-align' ],
			[ topIconAlign ],
			final_css
		);

		final_css = blpge_cssGen(
			`.blpge_testimonial--id-${ id } svg`,
			[ 'width', 'fill' ],
			[ [ iconWidth, 'px' ], iconColor ],
			final_css
		);

		if ( topIconY ) {
			final_css = blpge_cssGen(
				`.blpge_testimonial--id-${ id } .blpge_testimonial__icon--top svg`,
				[ 'transform' ],
				[ 'rotateY(180deg)' ],
				final_css
			);
		}

		if ( topIconX ) {
			final_css = blpge_cssGen(
				`.blpge_testimonial--id-${ id } .blpge_testimonial__icon--top svg`,
				[ 'transform' ],
				[ 'rotateX(180deg)' ],
				final_css
			);
		}

		if ( topIconX && topIconY ) {
			final_css = blpge_cssGen(
				`.blpge_testimonial--id-${ id } .blpge_testimonial__icon--top svg`,
				[ 'transform' ],
				[ 'rotateX(180deg) rotateY(180deg)' ],
				final_css
			);
		}

		// bottom icon

		final_css = blpge_cssGen(
			`.blpge_testimonial--id-${ id } .blpge_testimonial__icon--bottom`,
			[ 'text-align' ],
			[ bottomIconAlign ],
			final_css
		);

		if ( bottomIconY ) {
			final_css = blpge_cssGen(
				`.blpge_testimonial--id-${ id } .blpge_testimonial__icon--bottom svg`,
				[ 'transform' ],
				[ 'rotateY(180deg)' ],
				final_css
			);
		}

		if ( bottomIconX ) {
			final_css = blpge_cssGen(
				`.blpge_testimonial--id-${ id } .blpge_testimonial__icon--bottom svg`,
				[ 'transform' ],
				[ 'rotateX(180deg)' ],
				final_css
			);
		}

		if ( bottomIconX && bottomIconY ) {
			final_css = blpge_cssGen(
				`.blpge_testimonial--id-${ id } .blpge_testimonial__icon--bottom svg`,
				[ 'transform' ],
				[ 'rotateX(180deg) rotateY(180deg)' ],
				final_css
			);
		}

		/**********************************
    // Avatar 
    //******************************** */
		//  width
		if ( ! avatarEnabled ) {
			final_css = blpge_cssGen(
				`.blpge_testimonial--id-${ id } img`,
				[ 'width' ],
				[
					[
						[ avatarWidth[ 0 ], avatarWidthUnit[ 0 ] ],
						[ avatarWidth[ 1 ], avatarWidthUnit[ 1 ] ],
						[ avatarWidth[ 2 ], avatarWidthUnit[ 2 ] ],
						[ avatarWidth[ 3 ], avatarWidthUnit[ 3 ] ],
					],
				],
				final_css
			);

			// Spacing
			final_css = blpge_spacing_cssGen(
				avatar_spacing,
				`.blpge_testimonial--id-${ id } img`,
				final_css
			);

			// border
			final_css = blpge_border_cssGen(
				avatar_border,
				`.blpge_testimonial--id-${ id } img`,
				final_css
			);
		}

		/**********************************
    // Box 
    //******************************** */

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_testimonial--id-${ id }`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_testimonial--id-${ id }`,
			final_css
		);

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_testimonial--id-${ id }`,
			final_css
		);

		// Shadow
		final_css = blpge_shadow_cssGen(
			shadow,
			`.blpge_testimonial--id-${ id }`,
			final_css
		);

		/**********************************
    // Message 
    //******************************** */

		// Spacing
		final_css = blpge_spacing_cssGen(
			message_spacing,
			`.blpge_testimonial--id-${ id } .blpge_testimonial__message`,
			final_css
		);

		// Typography
		final_css = blpge_typography_cssGen(
			message_typo,
			`.blpge_testimonial--id-${ id } .blpge_testimonial__message, .blpge_testimonial--id-${ id } .blpge_testimonial__message .block-editor-rich-text__editable`,
			final_css,
			`.blpge_testimonial--id-${ id } .blpge_testimonial__message, .blpge_testimonial--id-${ id } .blpge_testimonial__message .block-editor-rich-text__editable`
		);

		// Background
		final_css = blpge_background_cssGen(
			message_background,
			`.blpge_testimonial--id-${ id } .blpge_testimonial__message`,
			final_css
		);

		/**********************************
    // Name 
    //******************************** */
		// Spacing
		final_css = blpge_spacing_cssGen(
			name_spacing,
			`.blpge_testimonial--id-${ id } .blpge_testimonial__details__info__name`,
			final_css
		);

		// Typography
		final_css = blpge_typography_cssGen(
			name_typo,
			`.blpge_testimonial--id-${ id } .blpge_testimonial__details__info__name`,
			final_css,
			`.blpge_testimonial--id-${ id } .blpge_testimonial__details__info__name`
		);

		/**********************************
    // Job 
    //******************************** */
		// Spacing
		final_css = blpge_spacing_cssGen(
			job_spacing,
			`.blpge_testimonial--id-${ id } .blpge_testimonial__details__info__job`,
			final_css
		);

		// Typography
		final_css = blpge_typography_cssGen(
			job_typo,
			`.blpge_testimonial--id-${ id } .blpge_testimonial__details__info__job`,
			final_css,
			`.blpge_testimonial--id-${ id } .blpge_testimonial__details__info__job`
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
							className={ testimonialClassName }
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
							<div>
								{ topIcon && topIcon != 0 ? (
									<div className="blpge_testimonial__icon--top">
										{ quotIcons[ topIcon ] }
									</div>
								) : null }
								<SubBlock { ...this.props } name="message">
									<div class="blpge_testimonial__message">
										{ this.props.editor ? (
											<RichText
												className="blpge_editor_richText"
												format="string"
												value={ message }
												onChange={ ( value ) => {
													this.props.setAttributes( {
														message: value,
													} );
												} }
											/>
										) : (
											<RichText.Content
												value={ message }
											/>
										) }
									</div>
								</SubBlock>
								<div className="blpge_testimonial__details">
									<SubBlock { ...this.props } name="avatar">
										<div className="blpge_testimonial__details__avatar">
											{ ! avatarEnabled ? (
												<img
													src={
														avatar
															? avatar
															: 'https://store.blockypage.com/wp-content/uploads/2019/09/testimonial_Block_0.jpg'
													}
												/>
											) : null }
										</div>
									</SubBlock>
									<div className="blpge_testimonial__details__info">
										<div className="blpge_testimonial__details__info__wrapper">
											<SubBlock
												{ ...this.props }
												name="name"
											>
												<div className="blpge_testimonial__details__info__name">
													{ this.props.editor ? (
														<RichText
															className="blpge_editor_richText"
															format="string"
															placeholder="Client Name"
															value={ name }
															onChange={ (
																value
															) => {
																this.props.setAttributes(
																	{
																		name: value,
																	}
																);
															} }
														/>
													) : (
														<RichText.Content
															value={ name }
														/>
													) }
												</div>
											</SubBlock>
											<SubBlock
												{ ...this.props }
												name="role"
											>
												<div className="blpge_testimonial__details__info__job">
													{ this.props.editor ? (
														<RichText
															className="blpge_editor_richText"
															format="string"
															placeholder="Client Job"
															value={ job }
															onChange={ (
																value
															) => {
																this.props.setAttributes(
																	{
																		job: value,
																	}
																);
															} }
														/>
													) : (
														<RichText.Content
															value={ job }
														/>
													) }
												</div>
											</SubBlock>
										</div>
									</div>
								</div>
								{ bottomIcon && bottomIcon != 0 ? (
									<div className="blpge_testimonial__icon--bottom">
										{ quotIcons[ bottomIcon ] }
									</div>
								) : null }
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
