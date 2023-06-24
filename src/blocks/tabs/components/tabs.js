/**
 *
 * Tabs Component
 *
 */

import '../child-blocks/tabContent/index.js';

// import wp dependencies
const { Component } = wp.element;
const { RichText, InnerBlocks } = wp.blockEditor;
const { dispatch, select } = wp.data;
const { createBlock } = wp.blocks;
const { Dashicon } = wp.components;

// Import blpge dependencies
const {
	blpge_spacing_cssGen,
	blpge_background_cssGen,
	blpge_border_cssGen,
	blpge_typography_cssGen,
} = blpgelib.utilities;
const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;
const { SubBlock } = blpgelib.editor;

export default class EditorTabs extends Component {
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
				navAlign,
				tabs,
				Navigation_background,
				Navigation_typo,
				content_background,
				activeNav_background,
				activeNav_typo,
				activeNav_border,
				activeNav_spacing,
				tabsContent_typo,
				navigation_spacing,
				content_spacing,
				navigation_border,
				content_border,
				animation,
			},
			setAttributes,
			className,
		} = this.props;

		function opentab( evt ) {
			let target = evt.target;
			if ( target.tagName.toLowerCase() == 'p' ) {
				target = target.closest( '.blpge_tabs__titles__link' );
			}

			// Clicked Tab jQuery element
			const $clickedTab = jQuery( target );

			// Activate Current Title
			$clickedTab
				.parent()
				.siblings()
				.children( 'li' )
				.removeClass( 'blpge_tabs__titles__link--current' );
			$clickedTab.addClass( 'blpge_tabs__titles__link--current' );

			// Activate Tab content

			const $clickedTabIndex = $clickedTab.parent().index();

			const $selectedTabContent = $clickedTab.parent().parent().next();

			const $targetTabContent = $selectedTabContent
				.find( '.editor-block-list__layout' )
				.first()
				.children()
				.eq( $clickedTabIndex );

			$targetTabContent.siblings().css( 'display', 'none' );

			$targetTabContent.fadeIn( 'fast' );
		}

		// Define style objects
		let currentTabs = tabs.slice();
		let tabContentTemplate = [];

		// Arrays to hold tab react elements
		let tabTitles = [];

		for ( let i = 0; i < currentTabs.length; i++ ) {
			let titleClassName = `blpge_tabs__titles__link`;
			const attributeTitleName = currentTabs[ i ].title;
			const thisTab = currentTabs[ i ].id;

			if ( i == 0 ) {
				titleClassName += ' blpge_tabs__titles__link--current';
			}

			tabTitles.push(
				<SubBlock
					{ ...this.props }
					name="tab title"
					style={ { display: 'inline-block' } }
				>
					<li
						className={ titleClassName }
						onClick={ () => opentab( event ) }
					>
						{ this.props.editor ? (
							<RichText
								tagName="p"
								format="string"
								value={ attributeTitleName }
								onChange={ ( value ) => {
									const newArray = currentTabs.slice();
									newArray[ i ] = {
										id: thisTab,
										title: value,
									};
									setAttributes( { tabs: newArray } );
								} }
							/>
						) : (
							<RichText.Content value={ attributeTitleName } />
						) }
						{ this.props.editor ? (
							<a
								onClick={ () => {
									const newArray = currentTabs.slice();
									newArray.splice( i, 1 );
									setAttributes( { tabs: newArray } );
									// Remove The Block Content
									let currentTabBlock = select(
										'core/block-editor'
									).getBlock( self.props.clientId );
									for ( let contentBlock of currentTabBlock.innerBlocks ) {
										if (
											contentBlock.attributes.id ==
											thisTab
										) {
											dispatch(
												'core/block-editor'
											).removeBlock(
												contentBlock.clientId
											);
										}
									}
								} }
							>
								<span className="blpge_tabs__titles__link__remove">
									<i class="fas fa-times-circle" />
								</span>
							</a>
						) : null }
					</li>
				</SubBlock>
			);

			// Template of Tabs content
			tabContentTemplate.push( [ 'blockypage-blocks/tab-content' ] );
		}

		//  ClassName
		const tabsContainer = `blpge_tabs-${ id }`;
		const blockClassName = `blpge_tabs blpge_tabs-${ id }`;

		// CSS generation
		let final_css;

		final_css = blpge_cssGen(
			`.${ tabsContainer } .blpge_tabs__titles`,
			[ 'justify-content' ],
			[ navAlign ]
		);

		final_css = blpge_cssGen(
			`.blpge_tabs-${ id }`,
			[ 'width' ],
			[
				[
					[ width[ 0 ], widthUnit[ 0 ] ],
					[ width[ 1 ], widthUnit[ 1 ] ],
					[ width[ 2 ], widthUnit[ 2 ] ],
					[ width[ 3 ], widthUnit[ 3 ] ],
				],
			],
			final_css
		);

		// spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_tabs-${ id }`,
			final_css
		);

		// Navigation Background
		final_css = blpge_background_cssGen(
			Navigation_background,
			`.${ tabsContainer } .blpge_tabs__titles__link`,
			final_css
		);

		// Navigation Spacing
		final_css = blpge_spacing_cssGen(
			navigation_spacing,
			`.${ tabsContainer } .blpge_tabs__titles__link`,
			final_css
		);

		// Navigation typography
		final_css = blpge_typography_cssGen(
			Navigation_typo,
			`.${ tabsContainer } .blpge_tabs__titles__link, .${ tabsContainer } .blpge_tabs__titles__link .editor-rich-text p`,
			final_css
		);

		// Navigation border
		final_css = blpge_border_cssGen(
			navigation_border,
			`.${ tabsContainer } .blpge_tabs__titles__link`,
			final_css
		);

		// Active tab background
		final_css = blpge_background_cssGen(
			activeNav_background,
			`.${ tabsContainer } .blpge_tabs__titles .blpge_tabs__titles__link--current`,
			final_css
		);

		// Active tab typo
		final_css = blpge_typography_cssGen(
			activeNav_typo,
			`.${ tabsContainer } .blpge_tabs__titles .blpge_tabs__titles__link--current, .${ tabsContainer } .blpge_tabs__titles .blpge_tabs__titles__link--current .editor-rich-text p`,
			final_css
		);

		// Active tab border
		final_css = blpge_border_cssGen(
			activeNav_border,
			`.${ tabsContainer } .blpge_tabs__titles .blpge_tabs__titles__link--current`,
			final_css
		);

		// Active tab spacing
		final_css = blpge_spacing_cssGen(
			activeNav_spacing,
			`.${ tabsContainer } .blpge_tabs__titles .blpge_tabs__titles__link--current, .${ tabsContainer } .blpge_tabs__titles .blpge_tabs__titles__link--current .editor-rich-text p`,
			final_css
		);

		/************* Tabs Content *********/
		// Tabs content background
		final_css = blpge_background_cssGen(
			content_background,
			`.${ tabsContainer } .blpge_tabs__contents__tab-content`,
			final_css
		);

		// Tabs content typography
		final_css = blpge_typography_cssGen(
			tabsContent_typo,
			`.${ tabsContainer } .blpge_tabs__contents__tab-content`,
			final_css
		);

		// Content Spacing
		final_css = blpge_spacing_cssGen(
			content_spacing,
			`.${ tabsContainer } .blpge_tabs__contents__tab-content`,
			final_css
		);

		// Content border
		final_css = blpge_border_cssGen(
			content_border,
			`.${ tabsContainer } .blpge_tabs__contents__tab-content`,
			final_css
		);
		/*********************************************** */

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
							id={ tabsContainer }
							className={ blockClassName }
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
							<ul className="blpge_tabs__titles">
								{ tabTitles }
								{ this.props.editor ? (
									<li
										id="addTab"
										className="blpge_tabs__titles__add-icon"
										onClick={ () => {
											const tab_id = Math.floor(
												Math.random() * 1010
											);
											const tabObjectContainer = {
												id: tab_id,
												title: 'Tab title',
											};

											currentTabs.push(
												tabObjectContainer
											);
											setAttributes( {
												tabs: currentTabs,
											} );
											let insertedBlock = createBlock(
												'blockypage-blocks/tab-content'
											);
											dispatch(
												'core/block-editor'
											).insertBlock(
												insertedBlock,
												tabTitles.length,
												self.props.clientId
											);
										} }
									>
										<Dashicon icon="insert" />
									</li>
								) : null }
							</ul>

							<div className="blpge_tabs__contents">
								{ this.props.editor ? (
									<InnerBlocks
										templateLock="all"
										template={ tabContentTemplate }
									/>
								) : (
									<InnerBlocks.Content />
								) }
							</div>
						</div>
					</div>
				</div>
				{ this.props.editor ? (
					<style dangerouslySetInnerHTML={ { __html: editor_css } } />
				) : null }
			</div>
		);
	}
}
