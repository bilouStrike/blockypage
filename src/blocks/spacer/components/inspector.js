/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl } = wp.components;
const { __ } = wp.i18n;
// Import blpge dependencies
const { CssUnits, Devices } = blpgelib.components;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;
const { Background } = blpgelib.collections;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: { height, HeightUnit },
			setAttributes,
		} = this.props;

		// Get Device state
		const deviceStateIndex = blpge_getDeviceStateIndex();
		return (
			<InspectorControls>
				<PanelBody>
					<div class="blpge_row blpge_row--no-padding-col">
						<div className="blpge_row__col--7">
							<span className="blpge_inspector_property-title" />
							<span>
								{ ' ' }
								{ __( 'Height' ) }
								<Devices
									className="blpge_inspector_device-icons--small"
									onChange={ () => this.forceUpdate() }
								/>
							</span>
						</div>
						<div
							className="blpge_row__col--5"
							style={ { marginTop: '-10px' } }
						>
							<CssUnits
								units={ [ 'px', '%' ] }
								attribute={
									HeightUnit[ deviceStateIndex ] == null
										? ''
										: HeightUnit[ deviceStateIndex ]
								}
								onChange={ ( value ) => {
									let currentValue = HeightUnit.slice();
									currentValue[ deviceStateIndex ] = value;
									setAttributes( {
										HeightUnit: currentValue,
									} );
								} }
							/>
						</div>
					</div>
					<div>
						<RangeControl
							value={ height[ deviceStateIndex ] }
							onChange={ ( value ) => {
								let newHeight = height.slice();
								newHeight[ deviceStateIndex ] = value;
								setAttributes( {
									height: newHeight,
								} );
							} }
							min={ 1 }
							max={
								HeightUnit[ deviceStateIndex ] == 'px'
									? 500
									: 100
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
						exclude={ [ 'video' ] }
						{ ...this.props }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
