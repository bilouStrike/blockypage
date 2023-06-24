/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls, MediaUpload } = wp.blockEditor;
const { PanelBody, TextControl, RangeControl } = wp.components;
const { CssUnits, Devices } = blpgelib.components;
const { blpge_getDeviceStateIndex } = blpgelib.utilities;

// Import blockypage dependencies
const {
	Spacing,
	Background,
	Border,
	Overlay,
	Shadow,
	IconPicker,
} = blpgelib.collections;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: { url, height, heightUnit, width, widthUnit },
			setAttributes,
		} = this.props;

		// Get Device state
		const deviceStateIndex = blpge_getDeviceStateIndex();
		return (
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<div className="blpge_inspector_options-set">
						<span className="blpge_inspector_property-title">
							{ ' ' }
							{ __( 'Video:' ) }{ ' ' }
						</span>
						<TextControl
							type="text"
							value={ url }
							onChange={ ( value ) =>
								setAttributes( { url: value } )
							}
						/>
						<MediaUpload
							onSelect={ ( video ) =>
								setAttributes( { url: video.url } )
							}
							type="image"
							render={ ( { open } ) => (
								<button
									className="blpge_inspector_btn blpge_inspector_btn--medium"
									onClick={ open }
								>
									{ __( 'Upload video' ) }
									<i className="fas fa-video" />
								</button>
							) }
						/>
						<br />
						<span> { __( 'Url or Upload' ) } </span>
					</div>

					<div>
						{ /* Video  width */ }
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

							{ /* Video Height */ }
							<div class="blpge_inspector_options-set blpge_row blpge_row--no-padding-col">
								<div className="blpge_row__col--7">
									<span className="blpge_inspector_property-title">
										{ __( 'Height' ) }
										<Devices
											className="blpge_inspector_device-icons--small"
											onChange={ () =>
												this.forceUpdate()
											}
										/>
									</span>
								</div>
								<div className="blpge_row__col--5">
									<CssUnits
										units={ [ 'px', '%' ] }
										attribute={
											heightUnit[ deviceStateIndex ] ==
											null
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
											heightUnit[ deviceStateIndex ] ==
											'px'
												? 200
												: 1
										}
										max={
											heightUnit[ deviceStateIndex ] ==
											'px'
												? 1800
												: 100
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</PanelBody>
				<PanelBody
					title="Video Cover"
					initialOpen={ false }
					className="blpge_inspector"
				>
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
					<Overlay
						attributeName="video_cover_overlay"
						{ ...this.props }
					/>
				</PanelBody>

				<PanelBody
					title="Icon"
					initialOpen={ false }
					className="blpge_inspector"
				>
					<IconPicker
						iconAttributeName="video_icon"
						icons={ [
							'fas fa-play',
							'fas fa-file-video',
							'far fa-play-circle',
							'fas fa-play-circle',
							'fab fa-youtube',
						] }
						{ ...this.props }
					/>
				</PanelBody>

				<PanelBody title="Spacing" initialOpen={ false }>
					<Spacing attributeName="spacing" { ...this.props } />
				</PanelBody>

				<PanelBody title="Border" initialOpen={ false }>
					<Border attributeName="border" { ...this.props } />
				</PanelBody>

				<PanelBody title="Shadow" initialOpen={ false }>
					<Shadow attributeName="shadow" { ...this.props } />
				</PanelBody>
			</InspectorControls>
		);
	}
}
