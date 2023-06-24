/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls, MediaUpload, ColorPalette } = wp.blockEditor;
const {
	PanelBody,
	SelectControl,
	ButtonGroup,
	Button,
	RangeControl,
	Dashicon,
	TabPanel,
	ToggleControl,
} = wp.components;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;
const { SubBlockInspector } = blpgelib.components;

// Import blockypage dependencies
const {
	Spacing,
	Background,
	Border,
	Shadow,
	Typography,
	Animation,
} = blpgelib.collections;
const { CssUnits, Devices, BlpgeSubPanel } = blpgelib.components;
import quotIcons from './quotIcons';

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				layout,
				type,
				icon,
				topIcon,
				iconWidth,
				iconColor,
				topIconAlign,
				topIconY,
				topIconX,
				bottomIcon,
				bottomIconY,
				bottomIconX,
				bottomIconAlign,
				iconEnabled,
				message,
				avatar,
				avatarWidth,
				avatarWidthUnit,
				avatarEnabled,
				name,
				job,
				jobEnabled,
			},

			setAttributes,
		} = this.props;

		// Get Device state
		const deviceStateIndex = blpge_getDeviceStateIndex();
		let topIconMarkup = (
			<div>
				<div className="blpge_inspector_options-set">
					<div
						className="blpge_row"
						style={ { justifyContent: 'space-between' } }
					>
						<span className="blpge_inspector_property-title">
							{ __( 'Top Icon' ) }
						</span>
						<div className="quotIconList">
							<span
								onClick={ () =>
									setAttributes( { topIcon: 0 } )
								}
							>
								{ ' ' }
								{ quotIcons[ 0 ] }{ ' ' }
							</span>
							<span
								onClick={ () =>
									setAttributes( { topIcon: 1 } )
								}
							>
								{ ' ' }
								{ quotIcons[ 1 ] }{ ' ' }
							</span>
							<span
								onClick={ () =>
									setAttributes( { topIcon: 2 } )
								}
							>
								{ ' ' }
								{ quotIcons[ 2 ] }{ ' ' }
							</span>
							<span
								onClick={ () =>
									setAttributes( { topIcon: 3 } )
								}
							>
								{ ' ' }
								{ quotIcons[ 3 ] }{ ' ' }
							</span>
							<span
								onClick={ () =>
									setAttributes( { topIcon: 4 } )
								}
							>
								{ ' ' }
								{ quotIcons[ 4 ] }{ ' ' }
							</span>
						</div>
						<ButtonGroup className="blpge_inspector_btn-group">
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						topIconAlign == 'left'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								title="Left"
								onClick={ () => {
									setAttributes( { topIconAlign: 'left' } );
								} }
							>
								<Dashicon icon="editor-alignleft" />
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						topIconAlign == 'center'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								title="Left"
								onClick={ () => {
									setAttributes( { topIconAlign: 'center' } );
								} }
							>
								<Dashicon icon="editor-aligncenter" />
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						topIconAlign == 'right'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								title="Right"
								onClick={ () => {
									setAttributes( { topIconAlign: 'right' } );
								} }
							>
								<Dashicon icon="editor-alignright" />
							</Button>
						</ButtonGroup>
					</div>
				</div>
				<div className="blpge_inspector_options-set">
					<ToggleControl
						label={ __( 'Rotate Y' ) }
						checked={ topIconY }
						onChange={ ( value ) =>
							setAttributes( { topIconY: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Rotate X' ) }
						checked={ topIconX }
						onChange={ ( value ) =>
							setAttributes( { topIconX: value } )
						}
					/>
				</div>
			</div>
		);

		let bottomIconMarkup = (
			<div>
				<div className="blpge_inspector_options-set">
					<div
						className="blpge_row"
						style={ { justifyContent: 'space-between' } }
					>
						<span className="blpge_inspector_property-title">
							{ __( 'Top Icon' ) }
						</span>
						<div className="quotIconList">
							<span
								onClick={ () =>
									setAttributes( { bottomIcon: 0 } )
								}
							>
								{ ' ' }
								{ quotIcons[ 0 ] }{ ' ' }
							</span>
							<span
								onClick={ () =>
									setAttributes( { bottomIcon: 1 } )
								}
							>
								{ ' ' }
								{ quotIcons[ 1 ] }{ ' ' }
							</span>
							<span
								onClick={ () =>
									setAttributes( { bottomIcon: 2 } )
								}
							>
								{ ' ' }
								{ quotIcons[ 2 ] }{ ' ' }
							</span>
							<span
								onClick={ () =>
									setAttributes( { bottomIcon: 3 } )
								}
							>
								{ ' ' }
								{ quotIcons[ 3 ] }{ ' ' }
							</span>
							<span
								onClick={ () =>
									setAttributes( { bottomIcon: 4 } )
								}
							>
								{ ' ' }
								{ quotIcons[ 4 ] }{ ' ' }
							</span>
						</div>
						<ButtonGroup className="blpge_inspector_btn-group">
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						bottomIconAlign == 'left'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								title="Left"
								onClick={ () => {
									setAttributes( {
										bottomIconAlign: 'left',
									} );
								} }
							>
								<Dashicon icon="editor-alignleft" />
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						bottomIconAlign == 'center'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								title="Left"
								onClick={ () => {
									setAttributes( {
										bottomIconAlign: 'center',
									} );
								} }
							>
								<Dashicon icon="editor-aligncenter" />
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						bottomIconAlign == 'right'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								title="Right"
								onClick={ () => {
									setAttributes( {
										bottomIconAlign: 'right',
									} );
								} }
							>
								<Dashicon icon="editor-alignright" />
							</Button>
						</ButtonGroup>
					</div>
				</div>
				<div className="blpge_inspector_options-set">
					<ToggleControl
						label={ __( 'Rotate Y' ) }
						checked={ bottomIconY }
						onChange={ ( value ) =>
							setAttributes( { bottomIconY: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Rotate X' ) }
						checked={ bottomIconX }
						onChange={ ( value ) =>
							setAttributes( { bottomIconX: value } )
						}
					/>
				</div>
			</div>
		);
		return (
			<InspectorControls>
				<SubBlockInspector { ...this.props } name="message">
					<PanelBody title="Typography" initialOpen={ true }>
						<Typography
							attributeName="message_typo"
							textAttribute="message"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Background" initialOpen={ false }>
						<Background
							attributeName="message_background"
							excluded={ [ 'video', 'activeTab' ] }
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="message_spacing"
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>

				<SubBlockInspector { ...this.props } name="avatar">
					<PanelBody initialOpen={ true }>
						<div className="blpge_inspector_options-set">
							<ToggleControl
								label={ __( 'No Avatar' ) }
								checked={ avatarEnabled }
								onChange={ ( value ) =>
									setAttributes( { avatarEnabled: value } )
								}
							/>
						</div>
						<div className="image_preview">
							{ avatar ? <img src={ avatar } /> : null }
						</div>
						<div
							style={ avatarEnabled ? { display: 'none' } : null }
						>
							<MediaUpload
								onSelect={ ( imgObject ) =>
									setAttributes( {
										avatar: imgObject.sizes.full.url,
									} )
								}
								type="image"
								render={ ( { open } ) => (
									<button
										className="blpge_inspector_btn blpge_inspector_btn--medium"
										onClick={ open }
									>
										{ __( 'Upload the Avatar' ) }
										<i className="fas fa-avatar" />
									</button>
								) }
							/>
							<button
								className="blpge_inspector_btn blpge_inspector_btn--medium blpge_float-right"
								onClick={ () =>
									setAttributes( { avatar: null } )
								}
							>
								Clear
							</button>
							<div className="blpge_row blpge_row--no-padding-col">
								<div className="blpge_row__col--6">
									<span className="blpge_inspector_property-title">
										{ __( 'Avatar width' ) }
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
											avatarWidthUnit[
												deviceStateIndex
											] == null
												? ''
												: avatarWidthUnit[
														deviceStateIndex
												  ]
										}
										onChange={ ( value ) => {
											let currentValue = avatarWidthUnit.slice();
											currentValue[
												deviceStateIndex
											] = value;
											setAttributes( {
												avatarWidthUnit: currentValue,
											} );
										} }
									/>
								</div>
								<div style={ { width: '100%' } }>
									<RangeControl
										value={
											avatarWidth[ deviceStateIndex ] ==
											null
												? ''
												: avatarWidth[
														deviceStateIndex
												  ]
										}
										onChange={ ( value ) => {
											let currentValue = avatarWidth.slice();
											currentValue[
												deviceStateIndex
											] = value;
											setAttributes( {
												avatarWidth: currentValue,
											} );
										} }
										min={
											avatarWidthUnit[
												deviceStateIndex
											] == 'px'
												? 50
												: 1
										}
										max={
											avatarWidthUnit[
												deviceStateIndex
											] == 'px'
												? 400
												: 100
										}
									/>
								</div>
							</div>
						</div>
					</PanelBody>

					<PanelBody title="Border" initialOpen={ false }>
						<Border
							attributeName="avatar_border"
							autoMargin={ true }
							{ ...this.props }
						/>
					</PanelBody>
					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="avatar_spacing"
							autoMargin={ true }
							{ ...this.props }
						/>
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
							attributeName="job_typo"
							textAttribute="job"
							{ ...this.props }
						/>
					</PanelBody>
					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="job_spacing"
							{ ...this.props }
						/>
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

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing attributeName="spacing" { ...this.props } />
					</PanelBody>

					<PanelBody title="Border" initialOpen={ false }>
						<Border attributeName="border" { ...this.props } />
					</PanelBody>

					<PanelBody title="shadow" initialOpen={ false }>
						<Shadow attributeName="shadow" { ...this.props } />
					</PanelBody>

					<PanelBody title="Icons" initialOpen={ false }>
						<TabPanel
							className="blpge_inspector_tab-panel"
							activeClass="blpge_inspector_tab-panel--active"
							onSelect={ ( value ) => {} }
							tabs={ [
								{
									name: 'top',
									title: 'Top',
									content: topIconMarkup,
								},
								{
									name: 'bottom',
									title: 'Bottom',
									content: bottomIconMarkup,
								},
							] }
						>
							{ ( tab ) => <p>{ tab.content }</p> }
						</TabPanel>
						<span class="blpge_inspector_property-title">
							{ __( 'Size(px)' ) }
						</span>
						<RangeControl
							value={ iconWidth }
							onChange={ ( value ) =>
								setAttributes( { iconWidth: value } )
							}
							min={ 10 }
							max={ 200 }
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'Icon color' ) }
						</span>
						<ColorPalette
							className="blpge_inspector_color-palette"
							value={ iconColor }
							onChange={ ( value ) =>
								setAttributes( { iconColor: value } )
							}
						/>
					</PanelBody>
				</SubBlockInspector>
			</InspectorControls>
		);
	}
}
