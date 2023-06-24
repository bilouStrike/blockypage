/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { InspectorControls } = wp.blockEditor;
const {
	PanelBody,
	Button,
	RangeControl,
	ButtonGroup,
	Dashicon,
} = wp.components;
const { __ } = wp.i18n;

const { Spacing } = blpgelib.collections;

const {
	CssUnits,
	Devices,
	BlpgeSubPanel,
	SubBlockInspector,
} = blpgelib.components;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;
export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: { navAlign, width, widthUnit },
			setAttributes,
		} = this.props;

		const deviceStateIndex = blpge_getDeviceStateIndex();

		return (
			<InspectorControls>
				<SubBlockInspector { ...this.props } name="general">
					<PanelBody title="Spacing" initialOpen={ true }>
						<Spacing attributeName="spacing" { ...this.props } />
					</PanelBody>
					<PanelBody title="Content Style" initialOpen={ false }>
						<BlpgeSubPanel
							activeCollections={ {
								Typography: {
									attrb: 'tabsContent_typo',
									excluded: [],
								},
								Border: {
									attrb: 'content_border',
									excluded: [],
								},
								Background: {
									attrb: 'content_background',
									excluded: [ 'video', 'activeTab' ],
								},
								Spacing: {
									attrb: 'content_spacing',
									excluded: [],
								},
							} }
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>
				<SubBlockInspector { ...this.props } name="tab title">
					<PanelBody title="Navigation Style" initialOpen={ true }>
						<div className="blpge_inspector_options-set">
							<span className="blpge_inspector_property-title">
								{ __( 'Align' ) }
							</span>
							<ButtonGroup className="blpge_inspector_btn-group">
								<Button
									className={ `blpge_inspector_btn-group__btn
                ${
					navAlign == 'flex-start'
						? 'blpge_inspector_btn-group__btn--active'
						: ''
				} ` }
									title="Left"
									onClick={ () => {
										setAttributes( {
											navAlign: 'flex-start',
										} );
									} }
								>
									<Dashicon icon="editor-alignleft" />
								</Button>
								<Button
									className={ `blpge_inspector_btn-group__btn
                ${
					navAlign == 'center'
						? 'blpge_inspector_btn-group__btn--active'
						: ''
				} ` }
									title="Left"
									onClick={ () => {
										setAttributes( { navAlign: 'center' } );
									} }
								>
									<Dashicon icon="editor-aligncenter" />
								</Button>
								<Button
									className={ `blpge_inspector_btn-group__btn
                ${
					navAlign == 'flex-end'
						? 'blpge_inspector_btn-group__btn--active'
						: ''
				} ` }
									title="Left"
									onClick={ () => {
										setAttributes( {
											navAlign: 'flex-end',
										} );
									} }
								>
									<Dashicon icon="editor-alignright" />
								</Button>
							</ButtonGroup>
						</div>
						<div class="blpge_inspector_options-set blpge_row blpge_row--no-padding-col">
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
							<div className="blpge_container">
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
						<BlpgeSubPanel
							activeCollections={ {
								Typography: {
									attrb: 'Navigation_typo',
									excluded: [],
								},
								Border: {
									attrb: 'navigation_border',
									excluded: [],
								},
								Background: {
									attrb: 'Navigation_background',
									excluded: [ 'video', 'activeTab' ],
								},
								Spacing: {
									attrb: 'navigation_spacing',
									excluded: [],
								},
							} }
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Active Tab" initialOpen={ false }>
						<BlpgeSubPanel
							activeCollections={ {
								Typography: {
									attrb: 'activeNav_typo',
									excluded: [],
								},
								Border: {
									attrb: 'activeNav_border',
									excluded: [],
								},
								Background: {
									attrb: 'activeNav_background',
									excluded: [ 'video', 'activeTab' ],
								},
								Spacing: {
									attrb: 'activeNav_spacing',
									excluded: [],
								},
							} }
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>
			</InspectorControls>
		);
	}
}
