/**
 *
 * Column Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { dispatch, select } = wp.data;
const { InnerBlocks, RichText } = wp.blockEditor;
// Import blpge dependencies
const {
	blpge_spacing_cssGen,
	blpge_background_cssGen,
	blpge_border_cssGen,
	blpge_shadow_cssGen,
	blpge_typography_cssGen,
} = blpgelib.utilities;
const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;
const { SubBlock } = blpgelib.editor;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const self = this;
		const {
			attributes: {
				id,
				animation,
				brp_columnSize,
				title,
				subtitle,
				subtitleEnable,
				price,
				currency,
				per,
				border,
				verticalAlign,
				columnSize,
				spacing,
				background,
				shadow,
				header_background,
				header_border,
				footer_background,
				footer_border,
				title_typo,
				title_spacing,
				subtitle_typo,
				subtitle_spacing,
				price_typo,
				price_spacing,
				currency_typo,
				currency_spacing,
				per_typo,
				per_spacing,
				footerOptionEnable,
				footerOptionTxt,
				footerOption_typo,
				iconsList,
				currentItem,
				iconsColor,
				iconsSize,
				features_background,
				features_spacing,
				features_border,
				features_typo,
				direction,
				order,
			},
			className,
			clientId,
			setAttributes,
		} = this.props;

		let pricingClassName = `blpge_pricing blpge_pricing--block blpge_pricing--id-${ id }`;

		/*********************************************************/
		/************** Features list ************************* */
		/******************************************************/
		let iconsListInstance = iconsList.slice();
		let listItems = [];

		function updateTextOfItem( value ) {
			if ( currentItem != null ) {
				let newIconList = iconsList.slice();
				iconsList[ currentItem ].content = value;
				setAttributes( { iconsList: newIconList } );
			} else {
				console.log( 'You have to chose item from the list' );
			}
		}

		for ( let i = 0; i < iconsListInstance.length; i++ ) {
			let fontAwesomeArr;
			//console.log(iconsListInstance[i].icon);
			if ( typeof iconsListInstance[ i ].icon != 'undefined' ) {
				fontAwesomeArr = [
					iconsListInstance[ i ].icon.split( '__' )[ 0 ],
					iconsListInstance[ i ].icon.split( '__' )[ 1 ],
				];
			}

			listItems.push(
				<div
					className="blpge_pricing__item"
					data-id={ i }
					data-svg={ iconsListInstance[ i ].icon }
					onClick={ () => getcurrentItem( event ) }
				>
					<FontAwesomeIcon icon={ fontAwesomeArr } />
					<span className="blpge_pricing__item__text">
						{ this.props.editor ? (
							<RichText
								format="string"
								value={ iconsListInstance[ i ].content }
								onChange={ ( value ) =>
									updateTextOfItem( value )
								}
							/>
						) : (
							<RichText.Content
								value={ iconsListInstance[ i ].content }
							/>
						) }
					</span>
					{ this.props.editor ? (
						<span
							className="blpge_pricing__item__removeIcon"
							onClick={ () => removeItemList( event ) }
							item-id={ i }
						>
							<FontAwesomeIcon icon={ [ 'far', 'trash-alt' ] } />
						</span>
					) : null }
				</div>
			);
		}

		function removeItemList( evt ) {
			let target = evt.target;
			var elemnTarget = target.closest(
				'.blpge_pricing__item__removeIcon'
			);
			let id = jQuery( elemnTarget ).attr( 'item-id' );
			if ( id > -1 ) {
				iconsListInstance.splice( id, 1 );
				setAttributes( { iconsList: iconsListInstance } );
				self.forceUpdate();
			}
		}

		function getcurrentItem( evt ) {
			let target = evt.target;
			var elemnTarget = target.closest( '.blpge_pricing__item' );
			let currentItemId = jQuery( elemnTarget ).attr( 'data-id' );
			setAttributes( { currentItem: currentItemId } );
		}

		function blpge_add_new_ListItem() {
			iconsListInstance.push( {
				icon: 'fas__check',
				content: 'New item list',
			} );
			setAttributes( { iconsList: iconsListInstance } );
			self.forceUpdate();
		}

		/******************************************************** */

		let animationObject = animation;
		// Columns ClassName
		let col_className = `blpge_row__col--${ columnSize }`;
		if ( brp_columnSize[ 0 ] ) {
			col_className += ` blpge_row__col--md-${ brp_columnSize[ 0 ] }`;
		}
		if ( brp_columnSize[ 1 ] ) {
			col_className += ` blpge_row__col--sm-${ brp_columnSize[ 1 ] }`;
		}
		if ( brp_columnSize[ 2 ] ) {
			col_className += ` blpge_row__col--xs-${ brp_columnSize[ 2 ] }`;
		}
		col_className += ` blpge_col-${ id }`;

		// Holds the CSS of the block
		let final_css;

		final_css = blpge_cssGen(
			`.blpge_pricing--id-${ id } svg`,
			[ 'color' ],
			[ iconsColor ],
			final_css
		);

		final_css = blpge_cssGen(
			`.blpge_pricing--id-${ id } svg`,
			[ 'width' ],
			[ [ iconsSize, 'px' ] ],
			final_css
		);

		// General Settings
		final_css = blpge_cssGen(
			`.blpge_col-${ id }`,
			[ 'align-items', 'order' ],
			[
				verticalAlign,
				[
					[ order[ 0 ] ],
					[ order[ 1 ] ],
					[ order[ 2 ] ],
					[ order[ 3 ] ],
				],
			],
			final_css
		);

		final_css = blpge_cssGen(
			`.blpge_pricing--id-${ id } .blpge_pricing__item`,
			[ 'justify-content' ],
			[ direction ],
			final_css
		);

		/*********************** ************/
		/******* Pricing Wrapper **********/
		/*********************** ************/
		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_col-${ id }`,
			final_css
		);

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_col-${ id }`,
			final_css
		);

		// Shadow
		final_css = blpge_shadow_cssGen(
			shadow,
			`.blpge_col-${ id }`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_col-${ id }`,
			final_css
		);

		/********** Header *********/
		// Background
		final_css = blpge_background_cssGen(
			header_background,
			`.blpge_col-${ id } .blpge_pricing__header`,
			final_css
		);
		// Border
		final_css = blpge_border_cssGen(
			header_border,
			`.blpge_col-${ id } .blpge_pricing__header`,
			final_css
		);

		/********** Footer *********/
		// Background
		final_css = blpge_background_cssGen(
			footer_background,
			`.blpge_col-${ id } .blpge_pricing__footer`,
			final_css
		);
		// Border
		final_css = blpge_border_cssGen(
			footer_border,
			`.blpge_col-${ id } .blpge_pricing__footer`,
			final_css
		);

		/***********************************/
		/******* Pricing title **********/
		// typo
		final_css = blpge_typography_cssGen(
			title_typo,
			`.blpge_col-${ id } .blpge_pricing__header__title`,
			final_css,
			`.blpge_col-${ id } .blpge_pricing__header__title`
		);
		// spacing
		final_css = blpge_spacing_cssGen(
			title_spacing,
			`.blpge_col-${ id } .blpge_pricing__header__title`,
			final_css
		);

		/******* sub title title **********/
		// typo
		final_css = blpge_typography_cssGen(
			subtitle_typo,
			`.blpge_col-${ id } .blpge_pricing__header__subtitle`,
			final_css,
			`.blpge_col-${ id } .blpge_pricing__header__subtitle`
		);
		// spacing
		final_css = blpge_spacing_cssGen(
			subtitle_spacing,
			`.blpge_col-${ id } .blpge_pricing__header__subtitle`,
			final_css
		);

		/******* price **********/
		// typo
		final_css = blpge_typography_cssGen(
			price_typo,
			`.blpge_col-${ id } .blpge_pricing__header__price__value`,
			final_css
		);
		// spacing
		final_css = blpge_spacing_cssGen(
			price_spacing,
			`.blpge_col-${ id } .blpge_pricing__header__price__value`,
			final_css
		);

		/******* price **********/
		// typo
		final_css = blpge_typography_cssGen(
			currency_typo,
			`.blpge_col-${ id } .blpge_pricing__header__price__currency`,
			final_css
		);
		// spacing
		final_css = blpge_spacing_cssGen(
			currency_spacing,
			`.blpge_col-${ id } .blpge_pricing__header__price__currency`,
			final_css
		);

		/******* price **********/
		// typo
		final_css = blpge_typography_cssGen(
			per_typo,
			`.blpge_col-${ id } .blpge_pricing__header__price__per`,
			final_css
		);
		// spacing
		final_css = blpge_spacing_cssGen(
			per_spacing,
			`.blpge_col-${ id } .blpge_pricing__header__price__per`,
			final_css
		);

		/******* features **********/
		// typo
		final_css = blpge_typography_cssGen(
			features_typo,
			`.blpge_col-${ id } .blpge_pricing__item__text`,
			final_css
		);
		// spacing
		final_css = blpge_spacing_cssGen(
			features_spacing,
			`.blpge_col-${ id } .blpge_pricing__body`,
			final_css
		);
		// border
		final_css = blpge_border_cssGen(
			features_border,
			`.blpge_col-${ id } .blpge_pricing__body`,
			final_css
		);
		// border
		final_css = blpge_background_cssGen(
			features_background,
			`.blpge_col-${ id } .blpge_pricing__body`,
			final_css
		);

		/******* Footer option ******* */
		// typo
		final_css = blpge_typography_cssGen(
			footerOption_typo,
			`.blpge_col-${ id } .blpge_pricing__footer__option`,
			final_css,
			`.blpge_col-${ id } .blpge_pricing__footer__option`
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

		// Column order on the editor
		let column_order_css = '';
		for ( let i = 0; i < order.length; i++ ) {
			if ( order[ i ] && clientId ) {
				switch ( i ) {
					case 0:
						column_order_css += `#block-${ clientId } {
              order: ${ order[ i ] }}`;
						break;

					case 1:
						column_order_css += ` .blpge_is-tablet #block-${ clientId } {
              order: ${ order[ i ] }}`;
						break;
					case 2:
						column_order_css += ` .blpge_is-mobile-landscape #block-${ clientId } {
              order: ${ order[ i ] }}`;
						break;

					case 3:
						column_order_css += ` .blpge_is-mobile-portrait #block-${ clientId } {
              order: ${ order[ i ] }}`;
						break;

					default:
						break;
				}
				if ( column_order_css ) {
					if ( ! jQuery( `#block-${ clientId }-style` ).length ) {
						jQuery( 'body' ).append(
							`<div id="block-${ clientId }-style"><style>${ column_order_css }</style></div>`
						);
					} else {
						jQuery( `#block-${ clientId }-style` ).html(
							`<style>${ column_order_css }</style>`
						);
					}
				}
			}
		}

		return (
			<div
				className={ `${ col_className } ${ className } ${ pricingClassName } blpge_block-container` }
				data-aos={ ! this.props.editor ? animationObject.type : null }
				data-aos-delay={
					! animationObject.type ? null : animationObject.delay
				}
				data-aos-duration={
					! animationObject.type ? null : animationObject.duration
				}
				data-aos-once={ ! animationObject.type ? null : true }
			>
				<div class="blpge_pricing__layout--style_2">
					<SubBlock { ...this.props } name="header">
						<div class="blpge_pricing__header">
							<div class="blpge_pricing__header__icon"></div>
							<SubBlock { ...this.props } name="title">
								<div class="blpge_pricing__header__title">
									{ this.props.editor ? (
										<RichText
											className="blpge_editor_richText"
											format="string"
											value={ title }
											onChange={ ( value ) => {
												this.props.setAttributes( {
													title: value,
												} );
											} }
										/>
									) : (
										<RichText.Content value={ title } />
									) }
								</div>
							</SubBlock>
							<div class="blpge_pricing__header__price">
								<SubBlock
									{ ...this.props }
									name="currency"
									style={ { display: 'inline-block' } }
								>
									<span class="blpge_pricing__header__price__currency">
										{ ' ' }
										{ currency }{ ' ' }
									</span>
								</SubBlock>
								<SubBlock
									{ ...this.props }
									name="price"
									style={ { display: 'inline-block' } }
								>
									<span class="blpge_pricing__header__price__value">
										{ ' ' }
										{ price }{ ' ' }
									</span>
								</SubBlock>
								<SubBlock
									{ ...this.props }
									name="subscription period"
									style={ { display: 'inline-block' } }
								>
									{ per ? (
										<span class="blpge_pricing__header__price__per">
											/ { per }{ ' ' }
										</span>
									) : null }
								</SubBlock>
							</div>
							{ subtitleEnable ? (
								<SubBlock { ...this.props } name="Sub Title">
									<div class="blpge_pricing__header__subtitle">
										{ this.props.editor ? (
											<RichText
												className="blpge_editor_richText"
												format="string"
												value={ subtitle }
												onChange={ ( value ) => {
													this.props.setAttributes( {
														subtitle: value,
													} );
												} }
											/>
										) : (
											<RichText.Content
												value={ subtitle }
											/>
										) }
									</div>
								</SubBlock>
							) : null }
						</div>
					</SubBlock>
					<SubBlock { ...this.props } name="general">
						{ this.props.editor ? (
							<div>
								<SubBlock
									{ ...this.props }
									name="features"
									style={ { display: 'inline-block' } }
								>
									<div class="blpge_pricing__body">
										{ listItems }
										{ this.props.editor ? (
											<div
												className="blpge_pricing__add_newItem"
												onClick={ () =>
													blpge_add_new_ListItem()
												}
											>
												<FontAwesomeIcon
													icon={ [
														'fas',
														'plus-circle',
													] }
												/>
												New feature
											</div>
										) : null }
									</div>
								</SubBlock>
							</div>
						) : (
							<SubBlock
								{ ...this.props }
								name="features"
								style={ { display: 'inline-block' } }
							>
								<div class="blpge_pricing__body">
									{ listItems }
									{ this.props.editor ? (
										<div
											className="blpge_pricing__add_newItem"
											onClick={ () =>
												blpge_add_new_ListItem()
											}
										>
											<FontAwesomeIcon
												icon={ [
													'fas',
													'plus-circle',
												] }
											/>
											New feature
										</div>
									) : null }
								</div>
							</SubBlock>
						) }
					</SubBlock>
					<SubBlock { ...this.props } name="footer">
						<div class="blpge_pricing__footer">
							<div class="blpge_pricing__footer__button">
								{ this.props.editor ? (
									<InnerBlocks
										template={ [
											[
												'blockypage-blocks/button',
												{ text: 'Subscribe' },
											],
										] }
										templateLock="all"
										templateInsertUpdatesSelection={ false }
									/>
								) : (
									<InnerBlocks.Content />
								) }
							</div>
							{ footerOptionEnable ? (
								<SubBlock { ...this.props } name="footer text">
									<div class="blpge_pricing__footer__option">
										{ this.props.editor ? (
											<RichText
												className="blpge_editor_richText"
												format="string"
												value={ footerOptionTxt }
												onChange={ ( value ) => {
													this.props.setAttributes( {
														footerOptionTxt: value,
													} );
												} }
											/>
										) : (
											<RichText.Content
												value={ footerOptionTxt }
											></RichText.Content>
										) }
									</div>
								</SubBlock>
							) : null }
						</div>
					</SubBlock>
				</div>
				{ this.props.editor ? (
					<style dangerouslySetInnerHTML={ { __html: editor_css } } />
				) : null }
			</div>
		);
	}
}
