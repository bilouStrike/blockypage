/**
 *
 * Inspector Component.
 *
 */
// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls, MediaUpload } = wp.blockEditor;
const {
	PanelBody,
	ToggleControl,
	RangeControl,
	ButtonGroup,
	Button,
	Dashicon,
} = wp.components;

// Import blockypage dependencies
const {
	CssUnits,
	Devices,
	BlpgeSelectStyle,
	SubBlockInspector,
} = blpgelib.components;

import styles from './styles';

const {
	IconPicker,
	Spacing,
	Typography,
	Border,
	Shadow,
	Background,
} = blpgelib.collections;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				image,
				align,
				imageWidth,
				imageWidthUnit,
				customIcon,
				button,
				enabled_icon,
				subBlock,
			},
			setAttributes,
			className,
		} = this.props;

		const deviceStateIndex = blpge_getDeviceStateIndex();

		return (
			<InspectorControls>
				<PanelBody title="Style" initialOpen={ false }>
					<BlpgeSelectStyle
						{ ...this.props }
						activeStyle={ styles }
					/>
				</PanelBody>
				<div className="blpge_inspector_options-set">
					<ToggleControl
						label={ __( 'Hide Icon' ) }
						checked={ enabled_icon }
						onChange={ ( value ) =>
							setAttributes( { enabled_icon: value } )
						}
					/>
				</div>
				<div>
					<span className="blpge_inspector_property-title">
						{ ' ' }
						Align
					</span>
					<ButtonGroup className="blpge_inspector_btn-group">
						<Button
							className={ `blpge_inspector_btn-group__btn
									${ align == 'left' ? 'blpge_inspector_btn-group__btn--active' : '' } ` }
							title="Left"
							onClick={ () => {
								setAttributes( { align: 'left' } );
							} }
						>
							<Dashicon icon="editor-alignleft" />
						</Button>
						<Button
							className={ `blpge_inspector_btn-group__btn
									${ align == 'center' ? 'blpge_inspector_btn-group__btn--active' : '' } ` }
							title="Left"
							onClick={ () => {
								setAttributes( { align: 'center' } );
							} }
						>
							<Dashicon icon="editor-aligncenter" />
						</Button>
						<Button
							className={ `blpge_inspector_btn-group__btn
									${ align == 'right' ? 'blpge_inspector_btn-group__btn--active' : '' } ` }
							title="Right"
							onClick={ () => {
								setAttributes( { align: 'right' } );
							} }
						>
							<Dashicon icon="editor-alignright" />
						</Button>
					</ButtonGroup>
				</div>

				<SubBlockInspector { ...this.props } name="general">
					<PanelBody title="Background" initialOpen={ false }>
						<Background
							attributeName="background"
							excluded={ [ 'video', 'activeTab' ] }
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Border" initialOpen={ false }>
						<Border attributeName="border" { ...this.props } />
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing attributeName="spacing" { ...this.props } />
					</PanelBody>

					<PanelBody title="Shadow" initialOpen={ false }>
						<Shadow attributeName="shadow" { ...this.props } />
					</PanelBody>

					<PanelBody title="Button" initialOpen={ false }>
						<div className="blpge_inspector_options-set">
							<ToggleControl
								label={ __( 'Enable button' ) }
								checked={ button }
								onChange={ ( value ) =>
									setAttributes( { button: value } )
								}
							/>
							<span> Click on the button to customize it.</span>
						</div>
					</PanelBody>
				</SubBlockInspector>

				<SubBlockInspector { ...this.props } name="media">
					<PanelBody initialOpen={ true }>
						<div className="blpge_inspector_options-set">
							<ToggleControl
								label={ __( 'Custom Icon' ) }
								checked={ customIcon }
								onChange={ ( value ) =>
									setAttributes( { customIcon: value } )
								}
							/>
						</div>
						{ customIcon ? (
							<div>
								<div className="image_preview">
									{ image ? <img src={ image } /> : null }
								</div>
								<MediaUpload
									onSelect={ ( imgObject ) =>
										setAttributes( {
											image: imgObject.sizes.full.url,
										} )
									}
									type="image"
									render={ ( { open } ) => (
										<button
											className="blpge_inspector_btn blpge_inspector_btn--medium"
											onClick={ open }
										>
											{ __( 'Upload the image' ) }
											<i className="fas fa-image" />
										</button>
									) }
								/>
								<button
									className="blpge_inspector_btn blpge_inspector_btn--medium blpge_float-right"
									onClick={ () =>
										setAttributes( { image: null } )
									}
								>
									Clear
								</button>
								<div className="blpge_row blpge_row--no-padding-col">
									<div className="blpge_row__col--6">
										<span className="blpge_inspector_property-title">
											{ __( 'Image width' ) }
											<Devices
												className="blpge_inspector_device-icons--small"
												onChange={ () =>
													this.forceUpdate()
												}
											/>
										</span>
									</div>
									<div
										className="blpge_row__col--5"
										style={ { marginTop: '10px' } }
									>
										<CssUnits
											units={ [ 'px', '%' ] }
											attribute={
												imageWidthUnit[
													deviceStateIndex
												] == null
													? ''
													: imageWidthUnit[
															deviceStateIndex
													  ]
											}
											onChange={ ( value ) => {
												let currentValue = imageWidthUnit.slice();
												currentValue[
													deviceStateIndex
												] = value;
												setAttributes( {
													imageWidthUnit: currentValue,
												} );
											} }
										/>
									</div>
									<div style={ { width: '100%' } }>
										<RangeControl
											value={
												imageWidth[
													deviceStateIndex
												] == null
													? ''
													: imageWidth[
															deviceStateIndex
													  ]
											}
											onChange={ ( value ) => {
												let currentValue = imageWidth.slice();
												currentValue[
													deviceStateIndex
												] = value;
												setAttributes( {
													imageWidth: currentValue,
												} );
											} }
											min={
												imageWidthUnit[
													deviceStateIndex
												] == 'px'
													? 0
													: 0
											}
											max={
												imageWidthUnit[
													deviceStateIndex
												] == 'px'
													? 960
													: 100
											}
										/>
									</div>
								</div>
								<Border
									attributeName="image_border"
									{ ...this.props }
								/>
							</div>
						) : (
							<IconPicker
								iconAttributeName="infoBox_icon"
								{ ...this.props }
							/>
						) }
					</PanelBody>
				</SubBlockInspector>
				<SubBlockInspector { ...this.props } name="title">
					<PanelBody title="Typography" initialOpen={ true }>
						<Typography
							attributeName="titleTypo"
							textAttribute="title"
							{ ...this.props }
						/>
					</PanelBody>
					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="titleSpacing"
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>
				<SubBlockInspector { ...this.props } name="information">
					<PanelBody title="Typography" initialOpen={ true }>
						<Typography
							attributeName="informationTypo"
							textAttribute="information"
							{ ...this.props }
						/>
					</PanelBody>
					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="informationSpacing"
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>
			</InspectorControls>
		);
	}
}
