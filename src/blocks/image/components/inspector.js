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
	TextControl,
	Button,
	ButtonGroup,
	Dashicon,
	RangeControl,
	ToggleControl,
} = wp.components;
// Import blockypage dependencies
const { Spacing, Border, Typography, Overlay, Shadow } = blpgelib.collections;
const { CssUnits, Devices } = blpgelib.components;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				imageBlockUrl,
				imageBlockCaption,
				imageBlockAlt,
				imgAlign,
				width,
				widthUnit,
				height,
				heightUnit,
				showCaption,
			},
			setAttributes,
		} = this.props;

		// Get Device state
		const deviceStateIndex = blpge_getDeviceStateIndex();

		return (
			<InspectorControls>
				{ /* Image */ }
				<PanelBody initialOpen={ true }>
					<div className="image_preview">
						{ imageBlockUrl ? <img src={ imageBlockUrl } /> : null }
					</div>
					<MediaUpload
						onSelect={ ( imgObject ) =>
							setAttributes( {
								imageBlockUrl: imgObject.sizes.full.url,
							} )
						}
						type="image"
						render={ ( { open } ) => (
							<button
								className="blpge_inspector_btn blpge_inspector_btn--medium"
								onClick={ open }
							>
								{ __( 'Choose an image' ) }
								<i className="fas fa-image" />
							</button>
						) }
					/>
					<button
						className="blpge_inspector_btn blpge_inspector_btn--medium blpge_float-right"
						onClick={ () =>
							setAttributes( { imageBlockUrl: null } )
						}
					>
						Clear
					</button>
					<br />
					<span className="blpge_inspector_property-title">
						{ __( 'Image Align' ) }
					</span>
					<ButtonGroup className="blpge_inspector_btn-group">
						<Button
							className={ `blpge_inspector_btn-group__btn
                    ${
						imgAlign == 'left'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
							title="Left"
							onClick={ () => {
								setAttributes( { imgAlign: 'left' } );
							} }
						>
							<Dashicon icon="editor-alignleft" />
						</Button>
						<Button
							className={ `blpge_inspector_btn-group__btn
                    ${
						imgAlign == 'center'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
							title="Center"
							onClick={ () => {
								setAttributes( { imgAlign: 'center' } );
							} }
						>
							<Dashicon icon="editor-aligncenter" />
						</Button>
						<Button
							className={ `blpge_inspector_btn-group__btn
                    ${
						imgAlign == 'right'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
							title="Right"
							onClick={ () => {
								setAttributes( { imgAlign: 'right' } );
							} }
						>
							<Dashicon icon="editor-alignright" />
						</Button>
					</ButtonGroup>

					<div style={ { marginTop: '10px' } }>
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

						{ /* Container height */ }
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
										heightUnit[ deviceStateIndex ] == null
											? ''
											: heightUnit[ deviceStateIndex ]
									}
									onChange={ ( value ) => {
										let currentValue = heightUnit.slice();
										currentValue[
											deviceStateIndex
										] = value;
										setAttributes( {
											heightUnit: currentValue,
										} );
									} }
								/>
							</div>
							<div style={ { width: '100%' } }>
								<RangeControl
									value={
										height[ deviceStateIndex ] == null
											? ''
											: height[ deviceStateIndex ]
									}
									onChange={ ( value ) => {
										let currentValue = height.slice();
										currentValue[
											deviceStateIndex
										] = value;
										setAttributes( {
											height: currentValue,
										} );
									} }
									min={
										heightUnit[ deviceStateIndex ] == 'px'
											? 200
											: 1
									}
									max={
										heightUnit[ deviceStateIndex ] == 'px'
											? 1800
											: 100
									}
								/>
							</div>
						</div>
					</div>
					<span className="blpge_inspector_property-title">
						{ __( 'Caption:' ) }
					</span>
					<br />
					<TextControl
						type="text"
						value={ imageBlockCaption }
						onChange={ ( value ) =>
							setAttributes( { imageBlockCaption: value } )
						}
					/>
					<span className="blpge_inspector_property-title">
						{ __( 'Image alt:' ) }
					</span>
					<br />
					<TextControl
						type="text"
						value={ imageBlockAlt }
						onChange={ ( value ) =>
							setAttributes( { imageBlockAlt: value } )
						}
					/>
				</PanelBody>

				{ /* Overlay Settings */ }
				<PanelBody
					title="Effects"
					initialOpen={ false }
					className="blpge_inspector"
				>
					<Overlay
						attributeName="overlay"
						exclude={ [ 'color' ] }
						{ ...this.props }
					/>
				</PanelBody>

				{ /* Typography Settings */ }
				<PanelBody title="Caption typography" initialOpen={ false }>
					<div className="blpge_inspector_options-set">
						<ToggleControl
							label={ __( 'Show Caption' ) }
							checked={ showCaption }
							onChange={ ( value ) =>
								setAttributes( { showCaption: value } )
							}
						/>
					</div>
					<Typography attributeName="typography" { ...this.props } />
				</PanelBody>

				{ /* Border Settings */ }
				<PanelBody title="Border" initialOpen={ false }>
					<Border attributeName="border" { ...this.props } />
				</PanelBody>

				{ /* Shadow Settings */ }
				<PanelBody title="Shadow" initialOpen={ false }>
					<Shadow attributeName="shadow" { ...this.props } />
				</PanelBody>

				{ /* Spacing */ }
				<PanelBody title="Spacing" initialOpen={ false }>
					<Spacing attributeName="spacing" { ...this.props } />
				</PanelBody>
			</InspectorControls>
		);
	}
}
