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
	TextControl,
	Dashicon,
	Button,
	ButtonGroup,
	ToggleControl,
	SelectControl,
} = wp.components;
const {
	Spacing,
	Background,
	Border,
	Shadow,
	Typography,
	IconPicker,
} = blpgelib.collections;

// Import blockypage dependencies

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				linkBlank,
				linkNoFollow,
				size,
				align,
				iconAlign,
				iconEnable,
				url,
			},
			setAttributes,
		} = this.props;

		return (
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<div className="blpge_inspector_options-set">
						<span className="blpge_inspector_property-title">
							{ __( 'URL Link ' ) }
						</span>
						<br />
						<TextControl
							type="text"
							value={ url }
							placeholder="https://blockypage.com"
							onChange={ ( value ) =>
								setAttributes( { url: value } )
							}
						/>
						<label className="blpge_inspector_property-title">
							Link Options
						</label>
						<ToggleControl
							label="Open in a new window"
							checked={ linkBlank }
							onChange={ ( value ) =>
								setAttributes( {
									linkBlank: value,
								} )
							}
						/>
						<ToggleControl
							label="Unfollow link"
							checked={ linkNoFollow }
							onChange={ ( value ) =>
								setAttributes( {
									linkNoFollow: value,
								} )
							}
						/>
					</div>
					<div className="blpge_inspector_options-set">
						<div>
							<span className="blpge_inspector_property-title">
								Button Size
							</span>
							<SelectControl
								value={ size }
								options={ [
									{ label: __( 'x-small' ), value: 'xsmall' },
									{
										label: __( 'small' ),
										value: 'small',
									},
									{ label: __( 'medium' ), value: 'medium' },
									{ label: __( 'large' ), value: 'large' },
									{ label: __( 'x-large' ), value: 'xlarge' },
								] }
								onChange={ ( value ) =>
									setAttributes( { size: value } )
								}
							/>
						</div>
						<span className="blpge_inspector_property-title">
							Button Align
						</span>

						<ButtonGroup className="blpge_inspector_btn-group">
							<Button
								className={ `blpge_inspector_btn-group__btn
									${ align == 'flex-start' ? 'blpge_inspector_btn-group__btn--active' : '' } ` }
								title="Left"
								onClick={ () => {
									setAttributes( { align: 'flex-start' } );
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
									${ align == 'flex-end' ? 'blpge_inspector_btn-group__btn--active' : '' } ` }
								title="Left"
								onClick={ () => {
									setAttributes( { align: 'flex-end' } );
								} }
							>
								<Dashicon icon="editor-alignright" />
							</Button>
						</ButtonGroup>
					</div>
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
							iconAttributeName="btn_icon"
							{ ...this.props }
						>
							<div className="blpge_inspector_options-set">
								<span className="blpge_inspector_property-title">
									Icon Position
								</span>
								<SelectControl
									value={ iconAlign }
									options={ [
										{ label: __( 'Left' ), value: '-1' },
										{ label: __( 'Right' ), value: '2' },
									] }
									onChange={ ( value ) =>
										setAttributes( { iconAlign: value } )
									}
								/>
							</div>
						</IconPicker>
					) : null }
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

				{ /* Spacing */ }
				<PanelBody title="Spacing" initialOpen={ false }>
					<Spacing attributeName="spacing" { ...this.props } />
				</PanelBody>

				{ /* Border Settings */ }
				<PanelBody title="Border" initialOpen={ false }>
					<Border attributeName="border" { ...this.props } />
				</PanelBody>

				{ /* Typography Settings */ }
				<PanelBody title="Typography" initialOpen={ false }>
					<Typography
						attributeName="typography"
						textAttribute="text"
						{ ...this.props }
					/>
				</PanelBody>

				{ /* Shadow Settings */ }
				<PanelBody title="Shadow" initialOpen={ false }>
					<Shadow attributeName="shadow" { ...this.props } />
				</PanelBody>
			</InspectorControls>
		);
	}
}
