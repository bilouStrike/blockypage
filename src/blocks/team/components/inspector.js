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
	SelectControl,
	ButtonGroup,
	Button,
	RangeControl,
	Dashicon,
	TextControl,
	ToggleControl,
} = wp.components;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;

// Import blockypage dependencies
const {
	Spacing,
	Background,
	Border,
	Shadow,
	Typography,
	Animation,
} = blpgelib.collections;

const {
	CssUnits,
	Devices,
	BlpgeSubPanel,
	BlpgeSelectStyle,
	SubBlockInspector,
} = blpgelib.components;

import styles from './styles';

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				layout,
				image,
				imageWidth,
				imageWidthUnit,
				direction,
				descriptionOpt,
				facebook,
				twitter,
				youtube,
				linkedin,
				pinterest,
				github,
				instagram,
				dribbble,
				behance,
				flickr,
				iconSize,
			},

			setAttributes,
		} = this.props;

		// Get Device state
		const deviceStateIndex = blpge_getDeviceStateIndex();

		return (
			<InspectorControls>
				<PanelBody title="Style" initialOpen={ false }>
					<BlpgeSelectStyle
						{ ...this.props }
						activeStyle={ styles }
					/>
				</PanelBody>
				{ /* Spacing */ }
				<SubBlockInspector { ...this.props } name="picture">
					<PanelBody initialOpen={ true }>
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
							onClick={ () => setAttributes( { image: null } ) }
						>
							Clear
						</button>

						<div className="blpge_row blpge_row--no-padding-col">
							<div className="blpge_row__col--8">
								<span className="blpge_inspector_property-title">
									{ __( 'Image width' ) }
									<Devices
										className="blpge_inspector_device-icons--small"
										onChange={ () => this.forceUpdate() }
									/>
								</span>
							</div>
							<div
								className="blpge_row__col--4"
								style={ { marginTop: '10px' } }
							>
								<CssUnits
									units={ [ 'px', '%' ] }
									attribute={
										imageWidthUnit[ deviceStateIndex ] ==
										null
											? ''
											: imageWidthUnit[ deviceStateIndex ]
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
										imageWidth[ deviceStateIndex ] == null
											? ''
											: imageWidth[ deviceStateIndex ]
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
										imageWidthUnit[ deviceStateIndex ] ==
										'px'
											? 50
											: 1
									}
									max={
										imageWidthUnit[ deviceStateIndex ] ==
										'px'
											? 400
											: 100
									}
								/>
							</div>
						</div>
						<div>
							{ layout == 2 ? (
								<div className="blpge_inspector_options-set">
									<span className="blpge_inspector_property-title">
										{ __( 'Image direction:' ) }
									</span>
									<ButtonGroup className="blpge_inspector_btn-group">
										<Button
											className={ `blpge_inspector_btn-group__btn
                  ${
						direction == 'left'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
											title="Left"
											onClick={ () => {
												setAttributes( {
													direction: 'left',
												} );
											} }
										>
											<Dashicon icon="editor-alignleft" />
										</Button>
										<Button
											className={ `blpge_inspector_btn-group__btn
                  ${
						direction == 'right'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
											title="right"
											onClick={ () => {
												setAttributes( {
													direction: 'right',
												} );
											} }
										>
											<Dashicon icon="editor-alignright" />
										</Button>
									</ButtonGroup>
								</div>
							) : null }
						</div>
						<div
							className="blpge_inspector_nested-panel-content"
							style={ { display: 'block' } }
						>
							<Border
								attributeName="image_border"
								{ ...this.props }
							/>
						</div>
					</PanelBody>
				</SubBlockInspector>
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
				</SubBlockInspector>
				<SubBlockInspector { ...this.props } name="content">
					<PanelBody title="Background" initialOpen={ true }>
						<Background
							attributeName="content_background"
							excluded={ [ 'video', 'activeTab' ] }
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Border" initialOpen={ false }>
						<Border
							attributeName="content_border"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="content_spacing"
							{ ...this.props }
						/>
					</PanelBody>
					<PanelBody title="Description" initialOpen={ false }>
						<ToggleControl
							label="Enable"
							checked={ descriptionOpt }
							onChange={ ( value ) =>
								setAttributes( {
									descriptionOpt: value,
								} )
							}
						/>
						{ descriptionOpt ? (
							<BlpgeSubPanel
								activeCollections={ {
									Spacing: {
										attrb: 'desc_spacing',
										excluded: [],
									},
									Typography: {
										attrb: 'desc_typo',
										excluded: [],
									},
								} }
								{ ...this.props }
							/>
						) : null }
					</PanelBody>
				</SubBlockInspector>

				<SubBlockInspector { ...this.props } name="name">
					<PanelBody title="Typography" initialOpen={ true }>
						<Typography
							attributeName="name_typo"
							textAttribute="name"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="name_spacing"
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>

				<SubBlockInspector { ...this.props } name="role">
					<PanelBody title="Typography" initialOpen={ true }>
						<Typography
							attributeName="role_typo"
							textAttribute="role"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="role_spacing"
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>

				<SubBlockInspector { ...this.props } name="description">
					<PanelBody initialOpen={ true }>
						<ToggleControl
							label="Enable"
							checked={ descriptionOpt }
							onChange={ ( value ) =>
								setAttributes( {
									descriptionOpt: value,
								} )
							}
						/>
					</PanelBody>
					<PanelBody title="Typography" initialOpen={ true }>
						<Typography
							attributeName="desc_typo"
							textAttribute="description"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="desc_spacing"
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>

				<SubBlockInspector { ...this.props } name="social links">
					<PanelBody initialOpen={ true }>
						<span className="blpge_inspector_property-title">
							{ __( 'Icon size:' ) }
						</span>
						<RangeControl
							value={ iconSize }
							onChange={ ( value ) =>
								setAttributes( { iconSize: value } )
							}
							min={ 8 }
							max={ 120 }
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'Facebook:' ) }
						</span>
						<TextControl
							type="text"
							value={ facebook }
							onChange={ ( value ) =>
								setAttributes( { facebook: value } )
							}
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'Twitter:' ) }
						</span>
						<TextControl
							type="text"
							value={ twitter }
							onChange={ ( value ) =>
								setAttributes( { twitter: value } )
							}
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'Youtube:' ) }
						</span>
						<TextControl
							type="text"
							value={ youtube }
							onChange={ ( value ) =>
								setAttributes( { youtube: value } )
							}
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'LinkedIn:' ) }
						</span>
						<TextControl
							type="text"
							value={ linkedin }
							onChange={ ( value ) =>
								setAttributes( { linkedin: value } )
							}
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'Github:' ) }
						</span>
						<TextControl
							type="text"
							value={ github }
							onChange={ ( value ) =>
								setAttributes( { github: value } )
							}
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'Pinterest:' ) }
						</span>
						<TextControl
							type="text"
							value={ pinterest }
							onChange={ ( value ) =>
								setAttributes( { pinterest: value } )
							}
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'Dribbble:' ) }
						</span>
						<TextControl
							type="text"
							value={ dribbble }
							onChange={ ( value ) =>
								setAttributes( { dribbble: value } )
							}
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'Flickr:' ) }
						</span>
						<TextControl
							type="text"
							value={ flickr }
							onChange={ ( value ) =>
								setAttributes( { flickr: value } )
							}
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'Instagram:' ) }
						</span>
						<TextControl
							type="text"
							value={ instagram }
							onChange={ ( value ) =>
								setAttributes( { instagram: value } )
							}
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'Behance:' ) }
						</span>
						<TextControl
							type="text"
							value={ behance }
							onChange={ ( value ) =>
								setAttributes( { behance: value } )
							}
						/>
					</PanelBody>
				</SubBlockInspector>
			</InspectorControls>
		);
	}
}
