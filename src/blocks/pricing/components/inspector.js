/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl, SelectControl } = wp.components;

// Import blpge dependencies
const {
	Spacing,
	Background,
	Overlay,
	Border,
	Shadow,
	Typography,
} = blpgelib.collections;
const { CssUnits, Devices } = blpgelib.components;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;

// Import Internal Dependencies
import RowStyles from './child-components/row-styles/';

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				gutterClassName,
				width,
				widthUnit,
				minHeight,
				minHeightUnit,
			},
			setAttributes,
		} = this.props;

		// Get Device state
		const deviceStateIndex = blpge_getDeviceStateIndex();

		return (
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<div className="blpge_inspector_options-set">
						{ __( 'Structure' ) }
						<Devices onChange={ () => this.forceUpdate() } />
						<RowStyles
							{ ...this.props }
							toolbar={ true }
							inspector={ true }
						/>
					</div>
					<div className="blpge_inspector_options-set">
						<span className="blpge_inspector_property-title">
							{ __( 'Gutter Width' ) }
						</span>
						<SelectControl
							value={ gutterClassName }
							options={ [
								{ label: __( '0px' ), value: null },
								{
									label: __( '10px' ),
									value: 'blpge_row--gutter-10',
								},
								{
									label: __( '20px' ),
									value: 'blpge_row--gutter-20',
								},
								{
									label: __( '30px' ),
									value: 'blpge_row--gutter-30',
								},
								{
									label: __( '40px' ),
									value: 'blpge_row--gutter-40',
								},
								{
									label: __( '60px' ),
									value: 'blpge_row--gutter-60',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { gutterClassName: value } )
							}
						/>
					</div>
					<div className="blpge_inspector_options-set">
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
										minHeightUnit[ deviceStateIndex ] ==
										null
											? ''
											: minHeightUnit[ deviceStateIndex ]
									}
									onChange={ ( value ) => {
										let currentValue = minHeightUnit.slice();
										currentValue[
											deviceStateIndex
										] = value;
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
										currentValue[
											deviceStateIndex
										] = value;
										setAttributes( {
											minHeight: currentValue,
										} );
									} }
									min={
										minHeightUnit[ deviceStateIndex ] ==
										'px'
											? 200
											: 1
									}
									max={
										minHeightUnit[ deviceStateIndex ] ==
										'px'
											? 1800
											: 100
									}
								/>
							</div>
						</div>
					</div>
				</PanelBody>

				{ /* Background Settings */ }
				<PanelBody title="Background" initialOpen={ false }>
					<Background
						attributeName="background"
						exclude={ [ 'video' ] }
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
						autoMargin={ true }
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
			</InspectorControls>
		);
	}
}
