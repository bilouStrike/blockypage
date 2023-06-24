/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls, ColorPalette } = wp.blockEditor;
const {
	PanelBody,
	ButtonGroup,
	Button,
	Dashicon,
	ToggleControl,
	TextControl,
	SelectControl,
	RangeControl,
} = wp.components;

const { Devices } = blpgelib.components;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;

const { BlpgeSubPanel, SubBlockInspector } = blpgelib.components;
const {
	Border,
	Background,
	Spacing,
	Shadow,
	Typography,
} = blpgelib.collections;
import iconsListArray from './icons';
let allIcons = iconsListArray;
import currency_symbols from './currencyList';
export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				verticalAlign,
				subtitleEnable,
				price,
				currency,
				per,
				footerOptionEnable,
				iconsList,
				currentItem,
				iconsColor,
				iconsSize,
				direction,
				order,
			},
			setAttributes,
		} = this.props;

		let iconsListInstance = iconsList;

		// Get Device state
		const deviceStateIndex = blpge_getDeviceStateIndex();

		function searchChange( e ) {
			if ( self._input.value ) {
				const regexpValue = RegExp( self._input.value );
				allIcons = iconsListArray.filter( function ( ele ) {
					if ( regexpValue.test( ele ) ) {
						return ele;
					}
				} );
				self.forceUpdate();
			} else {
				allIcons = iconsListArray;
				self.forceUpdate();
			}
			e.preventDefault();
		}

		function extractIconName( value ) {
			let icon_format = `${ value.slice( 0, 3 ) }__${ value.slice( 7 ) }`;
			return icon_format;
		}

		function updateIconOfItem( value ) {
			if ( currentItem != null ) {
				let newIconList = iconsListInstance.slice();
				iconsListInstance[ currentItem ].icon = extractIconName(
					value
				);
				setAttributes( { iconsList: newIconList } );
			} else {
				console.log( 'You have to chose item from the list' );
			}
		}

		return (
			<InspectorControls>
				{ /* General Settings */ }
				<SubBlockInspector { ...this.props } name="general">
					<PanelBody initialOpen={ true }>
						<span className="blpge_inspector_property-title">
							Vertical Align
						</span>
						<ButtonGroup className="blpge_inspector_btn-group blpge_inspector_columns-vertical-align">
							<Button
								className={ `blpge_inspector_btn-group__btn
                ${
					verticalAlign == 'flex-start'
						? 'blpge_inspector_btn-group__btn--active'
						: ''
				} ` }
								title="Top"
								onClick={ () => {
									setAttributes( {
										verticalAlign: 'flex-start',
									} );
								} }
							>
								<Dashicon icon="align-left" />
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                ${
					verticalAlign == 'center'
						? 'blpge_inspector_btn-group__btn--active'
						: ''
				} ` }
								title="Middle"
								onClick={ () => {
									setAttributes( {
										verticalAlign: 'center',
									} );
								} }
							>
								<Dashicon icon="align-center" />
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                ${
					verticalAlign == 'flex-end'
						? 'blpge_inspector_btn-group__btn--active'
						: ''
				} ` }
								title="Bottom"
								onClick={ () => {
									setAttributes( {
										verticalAlign: 'flex-end',
									} );
								} }
							>
								<Dashicon icon="align-right" />
							</Button>
						</ButtonGroup>

						<div>
							<span className="blpge_inspector_property-title">
								{ __( 'Column Order' ) }
								<Devices
									className="blpge_inspector_device-icons--small"
									onChange={ () => this.forceUpdate() }
								/>
							</span>
							<SelectControl
								help={
									'You should set order for all other columns for this change to take a place'
								}
								value={
									order[ deviceStateIndex ] == null
										? ''
										: order[ deviceStateIndex ]
								}
								options={ [
									{ label: __( 'Default' ), value: null },
									{ label: __( '1' ), value: 1 },
									{ label: __( '2' ), value: 2 },
									{ label: __( '3' ), value: 3 },
									{ label: __( '4' ), value: 4 },
									{ label: __( '5' ), value: 5 },
									{ label: __( '6' ), value: 6 },
								] }
								onChange={ ( value ) => {
									let currentValue = order.slice();
									currentValue[ deviceStateIndex ] = value;
									setAttributes( { order: currentValue } );
								} }
							/>
						</div>
					</PanelBody>

					<PanelBody title="Background" initialOpen={ true }>
						<Background
							attributeName="background"
							excluded={ [ 'video' ] }
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing attributeName="spacing" { ...this.props } />
					</PanelBody>

					<PanelBody title="Border" initialOpen={ false }>
						<Border attributeName="border" { ...this.props } />
					</PanelBody>

					<PanelBody title="Shadow" initialOpen={ false }>
						<Shadow attributeName="shadow" { ...this.props } />
					</PanelBody>
				</SubBlockInspector>
				<SubBlockInspector { ...this.props } name="header">
					<PanelBody title="Background" initialOpen={ true }>
						<Background
							excluded={ [ 'video' ] }
							attributeName="header_background"
							ex
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Border" initialOpen={ false }>
						<Border
							attributeName="header_border"
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>
				<SubBlockInspector { ...this.props } name="title">
					<PanelBody title="Typography" initialOpen={ true }>
						<Typography
							attributeName="title_typo"
							textAttribute="title"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="title_spacing"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Sub Title" initialOpen={ false }>
						<ToggleControl
							label={ __( 'Enable' ) }
							checked={ subtitleEnable }
							onChange={ ( value ) =>
								setAttributes( { subtitleEnable: value } )
							}
						/>
					</PanelBody>
				</SubBlockInspector>

				<SubBlockInspector { ...this.props } name="Sub Title">
					<PanelBody title="Typography" initialOpen={ true }>
						<Typography
							attributeName="subtitle_typo"
							textAttribute="subtitle"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="subtitle_spacing"
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>

				<SubBlockInspector { ...this.props } name="price">
					<span
						className="blpge_inspector_property-title"
						style={ { marginTop: '30px' } }
					>
						{ __( 'Price' ) }
					</span>
					<br />
					<TextControl
						type="text"
						value={ price }
						onChange={ ( value ) =>
							setAttributes( { price: value } )
						}
					/>

					<PanelBody title="Typography" initialOpen={ false }>
						<Typography
							attributeName="price_typo"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="price_spacing"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Year / Month" initialOpen={ false }>
						<TextControl
							type="text"
							value={ per }
							onChange={ ( value ) =>
								setAttributes( { per: value } )
							}
						/>
						<br />
						<BlpgeSubPanel
							activeCollections={ {
								Typography: { attrb: 'per_typo', excluded: [] },
								Spacing: { attrb: 'per_spacing', excluded: [] },
							} }
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>
				<SubBlockInspector { ...this.props } name="currency">
					<span
						className="blpge_inspector_property-title"
						style={ { marginTop: '30px' } }
					>
						{ __( 'Currency' ) }
					</span>
					<SelectControl
						value={ currency }
						options={ currency_symbols }
						onChange={ ( value ) =>
							setAttributes( { currency: value } )
						}
					/>

					<PanelBody title="Typography" initialOpen={ false }>
						<Typography
							attributeName="currency_typo"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="currency_spacing"
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>

				<SubBlockInspector { ...this.props } name="subscription period">
					<span
						className="blpge_inspector_property-title"
						style={ { marginTop: '30px' } }
					>
						{ __( 'Period' ) }
					</span>
					<TextControl
						type="text"
						placeholder="per month"
						value={ per }
						onChange={ ( value ) =>
							setAttributes( { per: value } )
						}
					/>

					<PanelBody title="Typography" initialOpen={ false }>
						<Typography
							attributeName="per_typo"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="per_spacing"
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>
				<SubBlockInspector { ...this.props } name="features">
					<PanelBody title="Typography" initialOpen={ true }>
						<Typography
							attributeName="features_typo"
							textAttribute="iconsList"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Icons" initialOpen={ false }>
						<div>
							<span className="gtnw_label">
								{ ' ' }
								{ __( 'Choose an icon' ) }{ ' ' }
							</span>
							<input
								onChange={ searchChange }
								ref={ function ( el ) {
									self._input = el;
								} }
								type="text"
								placeholder="Search..."
								className="blpge_iconInputSearch"
							/>
							<div className="blpge_iconsContainer">
								{ allIcons.map( ( value ) => {
									return (
										<span className="blpge_iconPickerWrraper">
											<i
												onClick={ () =>
													updateIconOfItem( value )
												}
												className={ value }
											/>
										</span>
									);
								} ) }
							</div>
						</div>
						<span className="blpge_inspector_property-title">
							{ __( 'Color' ) }
						</span>
						<ColorPalette
							className="blpge_inspector_color-palette"
							value={ iconsColor }
							onChange={ ( value ) =>
								setAttributes( { iconsColor: value } )
							}
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'Size (px)' ) }
						</span>
						<div>
							<RangeControl
								value={ iconsSize }
								onChange={ ( value ) =>
									setAttributes( { iconsSize: value } )
								}
								min={ 8 }
								max={ 100 }
							/>
						</div>
					</PanelBody>

					<PanelBody title="Background" initialOpen={ false }>
						<Background
							attributeName="features_background"
							excluded={ [ 'video' ] }
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Border" initialOpen={ false }>
						<Border
							attributeName="features_border"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="features_spacing"
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>
				<SubBlockInspector { ...this.props } name="footer">
					<PanelBody title="Background" initialOpen={ true }>
						<Background
							attributeName="footer_background"
							excluded={ [ 'video' ] }
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Border" initialOpen={ false }>
						<Border
							attributeName="footer_border"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Footer Text" initialOpen={ false }>
						<ToggleControl
							label={ __( 'Enable' ) }
							checked={ footerOptionEnable }
							onChange={ ( value ) =>
								setAttributes( { footerOptionEnable: value } )
							}
						/>
						{ footerOptionEnable ? (
							<BlpgeSubPanel
								activeCollections={ {
									Typography: {
										attrb: 'footerOption_typo',
										excluded: [],
									},
								} }
								{ ...this.props }
							/>
						) : null }
					</PanelBody>
				</SubBlockInspector>
				<SubBlockInspector { ...this.props } name="footer text">
					<span
						className="blpge_inspector_property-title"
						style={ { marginTop: '30px' } }
					>
						{ __( 'Footer text' ) }
					</span>
					<ToggleControl
						label={ __( 'Enable' ) }
						checked={ footerOptionEnable }
						onChange={ ( value ) =>
							setAttributes( { footerOptionEnable: value } )
						}
					/>

					{ footerOptionEnable ? (
						<PanelBody title="Typography" initialOpen={ true }>
							<Typography
								attributeName="footerOption_typo"
								textAttribute={ 'footerOptionTxt' }
								{ ...this.props }
							/>
						</PanelBody>
					) : null }
				</SubBlockInspector>
			</InspectorControls>
		);
	}
}
