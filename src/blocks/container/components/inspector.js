/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl, RangeControl } = wp.components;

// Import blockypage dependencies
const {
	Spacing,
	Background,
	Border,
	Shadow,
	Animation,
	ShapeDivider,
	Overlay,
	Typography,
} = blpgelib.collections;
const { CssUnits, Devices } = blpgelib.components;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				type,
				width,
				innerMaxWidth,
				innerMaxWidthUnit,
				widthUnit,
				minHeight,
				minHeightUnit,
				htmlTag,
			},
			setAttributes,
		} = this.props;

		// Get Device state
		const deviceStateIndex = blpge_getDeviceStateIndex();

		// This variable sets the value to the help prop on the container type setting component
		let blpge_help;
		switch ( type ) {
			case 'full-width':
				blpge_help = 'Inherits its parent width';
				break;

			case 'fixed-width':
				blpge_help = 'Specify the width below';
				break;

			default:
				blpge_help = 'Tacontainerkes its parent width';
				break;
		}
		return (
			<InspectorControls>
				{ /* Main Block Settings */ }
				<PanelBody initialOpen={ true }>
					<div className="blpge_inspector_options-set">
						<span className="blpge_inspector_property-title">
							{ __( 'Container Type' ) }
						</span>
						<SelectControl
							help={ blpge_help }
							value={ type }
							options={ [
								{
									label: __( 'Full Width' ),
									value: 'full-width',
								},
								{
									label: __( 'Fixed Width' ),
									value: 'fixed-width',
								},
							] }
							onChange={ ( value ) => {
								setAttributes( { type: value } );
								if ( value == 'full-width' ) {
									setAttributes( {
										width: [ null, null, null, null ],
									} );
								}
							} }
						/>

						<div
							className="blpge_row blpge_row--no-padding-col"
							style={
								type == 'fixed-width'
									? { display: 'flex' }
									: { display: 'none' }
							}
						>
							<div className="blpge_row__col--7">
								<span className="blpge_inspector_property-title">
									{ __( 'Width' ) }
									<Devices
										className="blpge_inspector_device-icons--small"
										onChange={ () => this.forceUpdate() }
									/>
								</span>
							</div>
							<div className="blpge_row__col--5">
								<CssUnits
									units={ [ 'px', '%' ] }
									attribute={
										widthUnit[ deviceStateIndex ] == null
											? ''
											: widthUnit[ deviceStateIndex ]
									}
									onChange={ ( value ) => {
										let currentValue = widthUnit.slice();
										currentValue[
											deviceStateIndex
										] = value;
										setAttributes( {
											widthUnit: currentValue,
										} );
									} }
								/>
							</div>
							<div style={ { width: '100%' } }>
								<RangeControl
									value={
										width[ deviceStateIndex ] == null
											? ''
											: width[ deviceStateIndex ]
									}
									onChange={ ( value ) => {
										let currentValue = width.slice();
										currentValue[
											deviceStateIndex
										] = value;
										setAttributes( {
											width: currentValue,
										} );
									} }
									min={
										widthUnit[ deviceStateIndex ] == 'px'
											? 200
											: 1
									}
									max={
										widthUnit[ deviceStateIndex ] == 'px'
											? 1800
											: 100
									}
								/>
							</div>
						</div>
					</div>

					{ /* Container MinHeight */ }
					<div class="blpge_inspector_options-set blpge_row blpge_row--no-padding-col">
						<div className="blpge_row__col--7">
							<span className="blpge_inspector_property-title">
								{ __( 'Height' ) }
								<Devices
									className="blpge_inspector_device-icons--small"
									onChange={ () => this.forceUpdate() }
								/>
							</span>
						</div>
						<div className="blpge_row__col--5">
							<CssUnits
								units={ [ 'px', '%' ] }
								attribute={
									minHeightUnit[ deviceStateIndex ] == null
										? ''
										: minHeightUnit[ deviceStateIndex ]
								}
								onChange={ ( value ) => {
									let currentValue = minHeightUnit.slice();
									currentValue[ deviceStateIndex ] = value;
									setAttributes( {
										minHeightUnit: currentValue,
									} );
								} }
							/>
						</div>
						<div style={ { width: '100%' } }>
							<RangeControl
								value={
									minHeight[ deviceStateIndex ] == null
										? ''
										: minHeight[ deviceStateIndex ]
								}
								onChange={ ( value ) => {
									let currentValue = minHeight.slice();
									currentValue[ deviceStateIndex ] = value;
									setAttributes( {
										minHeight: currentValue,
									} );
								} }
								min={
									minHeightUnit[ deviceStateIndex ] == 'px'
										? 200
										: 1
								}
								max={
									minHeightUnit[ deviceStateIndex ] == 'px'
										? 1800
										: 100
								}
							/>
						</div>
					</div>

					{ /* Inner Block Max Width */ }

					<div class="blpge_inspector_options-set blpge_row blpge_row--no-padding-col">
						<div className="blpge_row__col--7">
							<span className="blpge_inspector_property-title">
								{ __( 'Max-Width Inside' ) }
							</span>
						</div>
						<div className="blpge_row__col--5">
							<CssUnits
								units={ [ 'px', '%' ] }
								attribute={ innerMaxWidthUnit }
								onChange={ ( value ) =>
									setAttributes( {
										innerMaxWidthUnit: value,
									} )
								}
							/>
						</div>
						<div style={ { width: '100%' } }>
							<RangeControl
								value={ innerMaxWidth }
								onChange={ ( value ) => {
									setAttributes( { innerMaxWidth: value } );
								} }
								min={ innerMaxWidthUnit == 'px' ? 970 : 10 }
								max={ innerMaxWidthUnit == 'px' ? 2200 : 100 }
							/>
						</div>
					</div>
					{ /* Container Semantic Tag */ }
					<div>
						<span className="blpge_inspector_property-title">
							{ __( 'Semantic Tag' ) }
						</span>
						<SelectControl
							value={ htmlTag }
							options={ [
								{ label: __( 'div' ), value: 'div' },
								{ label: __( 'section' ), value: 'section' },
								{ label: __( 'main' ), value: 'main' },
								{ label: __( 'article' ), value: 'article' },
								{ label: __( 'summary' ), value: 'summary' },
								{ label: __( 'header' ), value: 'header' },
								{ label: __( 'footer' ), value: 'footer' },
							] }
							onChange={ ( value ) =>
								setAttributes( { htmlTag: value } )
							}
						/>
					</div>
				</PanelBody>

				{ /* Background Settings */ }
				<PanelBody
					title="Background"
					initialOpen={ false }
					className="blpge_inspector"
				>
					<Background
						attributeName="background"
						exclude={ [ 'activeTab' ] }
						{ ...this.props }
					/>
				</PanelBody>

				{ /* Overlay Settings */ }
				<PanelBody
					title="Overlay"
					initialOpen={ false }
					className="blpge_inspector"
				>
					<Overlay attributeName="overlay" { ...this.props } />
				</PanelBody>

				{ /* Spacing */ }
				<PanelBody title="Spacing" initialOpen={ false }>
					<Spacing
						attributeName="spacing"
						autoMargin={ type == 'stretched' ? true : false }
						{ ...this.props }
					/>
				</PanelBody>

				{ /* Border Settings */ }
				<PanelBody title="Border" initialOpen={ false }>
					<Border attributeName="border" { ...this.props } />
				</PanelBody>

				{ /* Typography Settings */ }
				<PanelBody title="Typography" initialOpen={ false }>
					<Typography attributeName="typography" { ...this.props } />
				</PanelBody>

				{ /* Shadow Settings */ }
				<PanelBody title="Shadow" initialOpen={ false }>
					<Shadow attributeName="shadow" { ...this.props } />
				</PanelBody>

				{ /* ShapeDivider Settings */ }
				<PanelBody title="Shape Divider" initialOpen={ false }>
					<ShapeDivider
						attributeName="shapeDivider"
						{ ...this.props }
					/>
				</PanelBody>

				{ /* Animations Tab */ }
				<PanelBody title="Animation" initialOpen={ false }>
					<Animation attributeName="animation" { ...this.props } />
				</PanelBody>
			</InspectorControls>
		);
	}
}
