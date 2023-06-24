/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, RangeControl, ToggleControl } = wp.components;
const { CssUnits, Devices } = blpgelib.components;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;
// Import blockypage dependencies
const { Spacing, Border } = blpgelib.collections;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				apikey,
				address,
				zoom,
				zoomControl,
				mapTypeControl,
				scaleControl,
				streetViewControl,
				rotateControl,
				fullscreenControl,
				minHeight,
				minHeightUnit,
			},
			setAttributes,
			className,
		} = this.props;
		// Get Device state
		const deviceStateIndex = blpge_getDeviceStateIndex();
		return (
			<InspectorControls>
				<PanelBody title="Map Height" initialOpen={ true }>
					<div class="blpge_row blpge_row--no-padding-col">
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
				</PanelBody>
				<PanelBody title="Map Settings" initialOpen={ false }>
					<TextControl
						label="Api Key"
						help="Google Api key"
						value={ apikey }
						onChange={ ( value ) =>
							setAttributes( { apikey: value } )
						}
					/>
					<TextControl
						label="Address"
						value={ address }
						onChange={ ( value ) =>
							setAttributes( { address: value } )
						}
					/>
					<RangeControl
						label="Zoom"
						value={ zoom }
						onChange={ ( value ) => {
							setAttributes( { zoom: value } );
						} }
						min={ 1 }
						max={ 18 }
					/>
				</PanelBody>
				<PanelBody title="Map Options" initialOpen={ false }>
					<ToggleControl
						label={ __( 'Zoom Control' ) }
						checked={ zoomControl }
						onChange={ ( value ) =>
							setAttributes( { zoomControl: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Map Type Control' ) }
						checked={ mapTypeControl }
						onChange={ ( value ) =>
							setAttributes( { mapTypeControl: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Scale Control' ) }
						checked={ scaleControl }
						onChange={ ( value ) =>
							setAttributes( { scaleControl: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Street View Control' ) }
						checked={ streetViewControl }
						onChange={ ( value ) =>
							setAttributes( { streetViewControl: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Rotate Control' ) }
						checked={ rotateControl }
						onChange={ ( value ) =>
							setAttributes( { rotateControl: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Full Screen Control' ) }
						checked={ fullscreenControl }
						onChange={ ( value ) =>
							setAttributes( { fullscreenControl: value } )
						}
					/>
				</PanelBody>

				{ /* Spacing */ }
				<PanelBody title="Spacing" initialOpen={ false }>
					<Spacing attributeName="spacing" { ...this.props } />
				</PanelBody>

				{ /* Border Settings */ }
				<PanelBody title="Border" initialOpen={ false }>
					<Border attributeName="border" { ...this.props } />
				</PanelBody>
			</InspectorControls>
		);
	}
}
