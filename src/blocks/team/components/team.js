/**
 *
 * Container Component.
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

import social_icons_list from './social-icons';

// Container Component
const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;
const { SubBlock } = blpgelib.editor;

export default class Team extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				type,
				style,
				name,
				role,
				description,
				descriptionOpt,
				image,
				imageWidth,
				imageWidthUnit,
				direction,
				background,
				border,
				name_spacing,
				name_typo,
				role_spacing,
				role_typo,
				desc_spacing,
				desc_typo,
				content_background,
				content_spacing,
				content_border,
				image_border,
				spacing,
				shadow,
				animation,
				facebook,
				twitter,
				youtube,
				linkedin,
				pinterest,
				github,
				instagram,
				dribbble,
				behance,
				flickr,
				iconSize,
			},
			className,
		} = this.props;

		/**********************************
    // Block Class Names 
    /******************************** */
		let teamClassName = `blpge_team blpge_team--id-${ id }`;

		// Get The Stored CSS
		let storedCSS = select( 'blockypage-css' ).getCSS();

		let final_css;

		// Image width
		final_css = blpge_cssGen(
			`.blpge_team--id-${ id } img`,
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

		// Icon size
		final_css = blpge_cssGen(
			`.blpge_team--id-${ id } .blpge_team__content__social_links svg`,
			[ 'width' ],
			[ [ `${ iconSize }`, 'px' ] ],
			final_css
		);

		if ( direction == 'right' ) {
			final_css = blpge_cssGen(
				`.blpge_team--id-${ id } .blpge_team__layout--style_2`,
				[ 'flex-direction' ],
				[ 'row-reverse' ],
				final_css
			);
		}

		// Image border
		final_css = blpge_border_cssGen(
			image_border,
			`.blpge_team--id-${ id } img`,
			final_css
		);

		// content background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_team--id-${ id }`,
			final_css
		);

		// content border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_team--id-${ id }`,
			final_css
		);
		// content spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_team--id-${ id }`,
			final_css
		);

		// content background
		final_css = blpge_shadow_cssGen(
			shadow,
			`.blpge_team--id-${ id }`,
			final_css
		);

		/***********************************/
		/********* Name styling ************/
		/**********************************/
		// Typography
		final_css = blpge_typography_cssGen(
			name_typo,
			`.blpge_team--id-${ id } .blpge_team__content__name`,
			final_css,
			`.blpge_team--id-${ id } .blpge_team__content__name`
		);
		// Spacing
		final_css = blpge_spacing_cssGen(
			name_spacing,
			`.blpge_team--id-${ id } .blpge_team__content__name`,
			final_css
		);

		/***********************************/
		/********* Roel styling ************/
		/**********************************/
		// Typography
		final_css = blpge_typography_cssGen(
			role_typo,
			`.blpge_team--id-${ id } .blpge_team__content__role`,
			final_css,
			`.blpge_team--id-${ id } .blpge_team__content__role`
		);
		// Spacing
		final_css = blpge_spacing_cssGen(
			role_spacing,
			`.blpge_team--id-${ id } .blpge_team__content__role`,
			final_css
		);

		/***********************************/
		/*************** Role  ************/
		/**********************************/
		// Typography
		final_css = blpge_typography_cssGen(
			desc_typo,
			`.blpge_team--id-${ id } .blpge_team__content__description`,
			final_css,
			`.blpge_team--id-${ id } .blpge_team__content__description`
		);
		// Spacing
		final_css = blpge_spacing_cssGen(
			desc_spacing,
			`.blpge_team--id-${ id } .blpge_team__content__description`,
			final_css
		);

		/***********************************/
		/********* Content text box ************/
		/**********************************/
		// Background
		final_css = blpge_background_cssGen(
			content_background,
			`.blpge_team--id-${ id } .blpge_team__content`,
			final_css
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			content_spacing,
			`.blpge_team--id-${ id } .blpge_team__content`,
			final_css
		);

		// border
		final_css = blpge_border_cssGen(
			content_border,
			`.blpge_team--id-${ id } .blpge_team__content`,
			final_css
		);

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
							className={ teamClassName }
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
								className={ `blpge_team__layout-style-${ style }` }
							>
								<SubBlock { ...this.props } name="picture">
									<div className="blpge_team__image">
										{ ! image ? null : (
											<img src={ image } />
										) }
									</div>
								</SubBlock>
								<SubBlock { ...this.props } name="content">
									<div className="blpge_team__content">
										<div>
											<SubBlock
												{ ...this.props }
												name="name"
											>
												<div className="blpge_team__content__name">
													{ this.props.editor ? (
														<RichText
															className="blpge_editor_richText"
															format="string"
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
												style={ { display: 'block' } }
											>
												<div className="blpge_team__content__role">
													{ this.props.editor ? (
														<RichText
															className="blpge_editor_richText"
															format="string"
															value={ role }
															onChange={ (
																value
															) => {
																this.props.setAttributes(
																	{
																		role: value,
																	}
																);
															} }
														/>
													) : (
														<RichText.Content
															value={ role }
														/>
													) }
												</div>
											</SubBlock>
											{ descriptionOpt ? (
												<SubBlock
													{ ...this.props }
													name="description"
													style={ {
														display: 'inline-block',
													} }
												>
													<div className="blpge_team__content__description">
														{ this.props.editor ? (
															<RichText
																className="blpge_editor_richText"
																format="string"
																value={
																	description
																}
																onChange={ (
																	value
																) => {
																	this.props.setAttributes(
																		{
																			description: value,
																		}
																	);
																} }
															/>
														) : (
															<RichText.Content
																value={
																	description
																}
															/>
														) }
													</div>
												</SubBlock>
											) : null }
											<SubBlock
												{ ...this.props }
												name="social links"
											>
												<div className="blpge_team__content__social_links">
													{ facebook ? (
														<a
															className="blpge-facebook"
															href={ facebook }
															target="_blank"
															rel="noopener noreferrer"
															style={
																this.props
																	.editor
																	? {
																			pointerEvents:
																				'none',
																	  }
																	: null
															}
														>
															{
																social_icons_list.facebook
															}
														</a>
													) : null }
													{ twitter ? (
														<a
															className="blpge-twitter"
															href={ twitter }
															target="_blank"
															rel="noopener noreferrer"
															style={
																this.props
																	.editor
																	? {
																			pointerEvents:
																				'none',
																	  }
																	: null
															}
														>
															{
																social_icons_list.twitter
															}
														</a>
													) : null }
													{ github ? (
														<a
															className="blpge-github"
															href={ github }
															target="_blank"
															rel="noopener noreferrer"
															style={
																this.props
																	.editor
																	? {
																			pointerEvents:
																				'none',
																	  }
																	: null
															}
														>
															{
																social_icons_list.github
															}
														</a>
													) : null }
													{ youtube ? (
														<a
															className="blpge-youtube"
															href={ youtube }
															target="_blank"
															rel="noopener noreferrer"
															style={
																this.props
																	.editor
																	? {
																			pointerEvents:
																				'none',
																	  }
																	: null
															}
														>
															{
																social_icons_list.youtube
															}
														</a>
													) : null }
													{ instagram ? (
														<a
															className="blpge-instagram"
															href={ instagram }
															target="_blank"
															rel="noopener noreferrer"
															style={
																this.props
																	.editor
																	? {
																			pointerEvents:
																				'none',
																	  }
																	: null
															}
														>
															{
																social_icons_list.instagram
															}
														</a>
													) : null }
													{ pinterest ? (
														<a
															className="blpge-pinterest"
															href={ pinterest }
															target="_blank"
															rel="noopener noreferrer"
															style={
																this.props
																	.editor
																	? {
																			pointerEvents:
																				'none',
																	  }
																	: null
															}
														>
															{
																social_icons_list.pinterest
															}
														</a>
													) : null }
													{ linkedin ? (
														<a
															className="blpge-linkedin"
															href={ linkedin }
															target="_blank"
															rel="noopener noreferrer"
															style={
																this.props
																	.editor
																	? {
																			pointerEvents:
																				'none',
																	  }
																	: null
															}
														>
															{
																social_icons_list.linkedin
															}
														</a>
													) : null }
													{ dribbble ? (
														<a
															className="blpge-dribbble"
															href={ dribbble }
															target="_blank"
															rel="noopener noreferrer"
															style={
																this.props
																	.editor
																	? {
																			pointerEvents:
																				'none',
																	  }
																	: null
															}
														>
															{
																social_icons_list.dribbble
															}
														</a>
													) : null }
													{ flickr ? (
														<a
															className="blpge-flickr"
															href={ flickr }
															target="_blank"
															rel="noopener noreferrer"
															style={
																this.props
																	.editor
																	? {
																			pointerEvents:
																				'none',
																	  }
																	: null
															}
														>
															{
																social_icons_list.flickr
															}
														</a>
													) : null }
													{ behance ? (
														<a
															className="blpge-behance"
															href={ behance }
															target="_blank"
															rel="noopener noreferrer"
															style={
																this.props
																	.editor
																	? {
																			pointerEvents:
																				'none',
																	  }
																	: null
															}
														>
															{
																social_icons_list.behance
															}
														</a>
													) : null }
												</div>
											</SubBlock>
										</div>
									</div>
								</SubBlock>
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
