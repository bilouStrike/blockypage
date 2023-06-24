/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl, ToggleControl, Dropdown } = wp.components;
const { BlpgeSubPanel } = blpgelib.components;
const { Background } = blpgelib.collections;
const { Spacing, IconPicker } = blpgelib.collections;
export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: { rtl, iconPosition },
			setAttributes,
		} = this.props;

		// Define Font Sizes
		const fontSizes = [
			{
				name: __( 'Small' ),
				slug: 'small',
				size: 19.5,
			},
			{
				name: __( 'Normal' ),
				slug: 'normal',
				size: 22,
			},
			{
				name: __( 'Large' ),
				slug: 'large',
				size: 36.5,
			},
			{
				name: __( 'Huge' ),
				slug: 'huge',
				size: 49.5,
			},
		];

		return (
			<InspectorControls>
				<PanelBody title="Icon" initialOpen={ false }>
					<div className="blpge_inspector_options-set">
						<span className="blpge_inspector_property-title">
							{ __( 'RTL Accordion' ) }
						</span>
						<ToggleControl
							label={ __( 'RTL' ) }
							checked={ rtl }
							onChange={ ( value ) =>
								setAttributes( { rtl: value } )
							}
						/>
					</div>
					<div className="blpge_inspector_options-set">
						<div>
							<span className="blpge_inspector_property-title">
								{ __( 'Icon Position' ) }
							</span>
							<SelectControl
								value={ iconPosition }
								options={ [
									{ label: __( 'Right' ), value: 'right' },
									{ label: __( 'Left' ), value: 'left' },
								] }
								onChange={ ( value ) => {
									setAttributes( { iconPosition: value } );
								} }
							/>
						</div>
					</div>
					<IconPicker
						{ ...this.props }
						iconAttributeName="accordion_icon"
						blockUsed="accordion"
						icons={ [
							'fas fa-plus',
							'fas fa-arrow-circle-down',
							'far fa-arrow-alt-circle-down',
							'fas fa-arrow-down',
							'fas fa-caret-down',
							'fas fa-caret-square-down',
						] }
					/>
				</PanelBody>
				<PanelBody title="spacing" initialOpen={ false }>
					<Spacing attributeName="spacing" { ...this.props } />
				</PanelBody>

				{ /* Accordion titles Settings */ }
				<PanelBody title="Title style" initialOpen={ false }>
					<BlpgeSubPanel
						activeCollections={ {
							Background: {
								attrb: 'accordionTitleBackground',
								excluded: [ 'video', 'activeTab' ],
							},
							Border: {
								attrb: 'accordionTitleBorder',
								excluded: [],
							},
							Spacing: {
								attrb: 'accordionTitleSpacing',
								excluded: [],
							},
							Typography: {
								attrb: 'accordionTitleTypo',
								excluded: [],
							},
						} }
						{ ...this.props }
					/>
				</PanelBody>
				{ /* Accordion content Settings */ }
				<PanelBody title="Content style" initialOpen={ false }>
					<BlpgeSubPanel
						activeCollections={ {
							Background: {
								attrb: 'accordionContentBackground',
								excluded: [ 'video', 'activeTab' ],
							},
							Border: {
								attrb: 'accordionContentBorder',
								excluded: [],
							},
							Spacing: {
								attrb: 'accordionContentSpacing',
								excluded: [],
							},
							Typography: {
								attrb: 'accordionContentTypo',
								excluded: [],
							},
						} }
						{ ...this.props }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
