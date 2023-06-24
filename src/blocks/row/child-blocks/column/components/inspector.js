/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const {
	PanelBody,
	ButtonGroup,
	Button,
	Dashicon,
	SelectControl,
} = wp.components;
const {
	Spacing,
	Background,
	Border,
	Overlay,
	Typography,
	Shadow,
} = blpgelib.collections;
const { Devices } = blpgelib.components;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: { verticalAlign, order },
			setAttributes,
		} = this.props;

		// Get Device state
		const deviceStateIndex = blpge_getDeviceStateIndex();

		return (
			<InspectorControls>
				{ /* General Settings */ }
				<PanelBody initialOpen={ true }>
					<div className="blpge_inspector_options-set">
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
					</div>

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

				{ /* Spacing Settings */ }
				<PanelBody title={ __( 'Spacing' ) } initialOpen={ false }>
					<Spacing
						attributeName="spacing"
						margin={ false }
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
