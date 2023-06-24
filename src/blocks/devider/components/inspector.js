/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl, SelectControl, ToggleControl } = wp.components;

// Import blockypage dependencies
const { CssUnits, Devices, BlpgeColorPicker } = blpgelib.components;
const { IconPicker, Spacing } = blpgelib.collections;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				size,
				width,
				widthUnit,
				align,
				style,
				color,
				iconEnable,
			},
			setAttributes,
		} = this.props;

		// Get Device state
		const deviceStateIndex = blpge_getDeviceStateIndex();

		return (
			<InspectorControls>
				<PanelBody title="Style" initialOpen={ false }>
					<div className="blpge_inspector_options-set">
						<div>
							<span className="blpge_inspector_property-title">
								Style
							</span>
							<SelectControl
								value={ style }
								options={ [
									{ label: __( 'Solid' ), value: 'solid' },
									{
										label: __( 'Dashed' ),
										value: 'dashed',
									},
									{ label: __( 'Dotted' ), value: 'dotted' },
									{ label: __( 'Double' ), value: 'double' },
								] }
								onChange={ ( value ) =>
									setAttributes( { style: value } )
								}
							/>
						</div>
					</div>
					<div className="blpge_inspector_options-set">
						<span className="blpge_inspector_property-title">
							{ __( 'Size (px)' ) }
						</span>
						<div>
							<RangeControl
								value={ size }
								onChange={ ( value ) =>
									setAttributes( {
										size: value,
									} )
								}
								min={ 1 }
								max={ 10 }
							/>
						</div>

						<div className="blpge_row blpge_row--no-padding-col">
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
						<div>
							<span className="blpge_inspector_property-title">
								{ __( 'Align' ) }
							</span>
							<SelectControl
								value={ align }
								options={ [
									{ label: __( 'Left' ), value: 'left' },
									{ label: __( 'Center' ), value: 'center' },
									{ label: __( 'Right' ), value: 'right' },
								] }
								onChange={ ( value ) =>
									setAttributes( { align: value } )
								}
							/>
						</div>
						<div className="blpge_row_inspector blpge_row--no-padding-col blpge_inspector_options-set">
							<div className="blpge_row__col--6">
								<span class="blpge_inspector_property-title">
									{ __( 'Color' ) }
								</span>
							</div>
							<div
								className="blpge_row__col--6"
								style={ { textAlign: 'right' } }
							>
								<BlpgeColorPicker
									color={ color }
									onChange={ ( value ) =>
										setAttributes( {
											color: value.hex,
										} )
									}
								/>
							</div>
						</div>
					</div>
				</PanelBody>

				{ /* Spacing */ }
				<PanelBody title="Spacing" initialOpen={ false }>
					<Spacing
						attributeName="divider_spacing"
						{ ...this.props }
						margin={ false }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Icon' ) } initialOpen={ false }>
					<ToggleControl
						label="Enable"
						checked={ iconEnable }
						onChange={ ( value ) =>
							setAttributes( {
								iconEnable: value,
							} )
						}
					/>
					{ iconEnable ? (
						<IconPicker
							iconAttributeName="divider_icon"
							{ ...this.props }
						/>
					) : null }
				</PanelBody>
			</InspectorControls>
		);
	}
}
