/**
 *
 * Background Collection
 *
 * Background options for an HTML element
 *
 */

// Import Styles
import './editor.scss';
import './style.scss';

// Import wp components
const { Component } = wp.element;
const { MediaUpload } = wp.blockEditor;
const { __ } = wp.i18n;
import BlpgeColorPicker from '../../components/color-picker';

const {
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
	ButtonGroup,
	TabPanel,
} = wp.components;

import Devices from '../../components/devices';
import blpge_getDeviceStateIndex from '../../utilities/get_device_state_index';
import ColorSquare from '../../components/color-square';
import blpge_clear_null_values from '../../helpers/clear-null-values';
import blpge_updateDeviceStateValue from '../../helpers/update-ds-value';

export default class Background extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	static defaultProps = {
		exclude: [],
		backgroundState: '',
	};

	render() {
		// Testing the clear null values method
		blpge_clear_null_values( {} );
		// Define Constants
		const { setAttributes } = this.props;
		const excluded = this.props.exclude;

		// Get Device state
		const deviceState = blpge_getDeviceStateIndex();

		// Get the background attribute name
		const attribute = this.props.attributeName;

		// Get the background object
		let background = JSON.parse(
			JSON.stringify( this.props.attributes[ attribute ] )
		);

		// Preview Image Style
		let blpge_previewImageStyle = {};
		if ( background.image ? background.image[ deviceState ] : false ) {
			blpge_previewImageStyle.backgroundImage = `url("${ background.image[ deviceState ] }")`;
		} else {
			blpge_previewImageStyle.display = 'none';
		}

		// Preview Image Hover Style
		let blpge_previewImageHoverStyle = {};
		if ( background.imageAsHover ) {
			blpge_previewImageHoverStyle.backgroundImage = `url("${ background.imageAsHover }")`;
		} else {
			blpge_previewImageHoverStyle.display = 'none';
		}

		let gradientType = background.gradientType;

		// Hover gradient preview
		let gradientHoverDirection,
			final_style,
			gradientTypeHover,
			gradientPreview;

		gradientTypeHover = ! background.gradientTypeHover
			? 'linear'
			: background.gradientTypeHover;
		gradientHoverDirection =
			gradientTypeHover == 'linear'
				? `${ background.gradientLinearDirectionHover }deg`
				: `circle at ${ background.gradientRadialDirectionHover }`;
		if ( background.backgroundHoverState == 'Gradient' ) {
			final_style = `${ gradientTypeHover }-gradient(${ gradientHoverDirection },${ background.gradientFirstColorHover } ${ background.gradientFirstColorLocationHover }% ,${ background.gradientSecondColorHover } ${ background.gradientSecondColorLocationHover }% )`;
		}

		gradientPreview = {
			width: '100%',
			height: '100px',
			border: '1px solid #eee',
			backgroundImage: final_style,
			opacity: background.hoverOverlayOpacity,
		};

		// OnToggle Background Image Function
		function updateBackground( value, prop ) {
			if ( prop == 'image' ) {
				background = blpge_updateDeviceStateValue(
					background,
					[ 'image' ],
					deviceState,
					value
				);
			} else if ( prop == 'position' ) {
				background = blpge_updateDeviceStateValue(
					background,
					[ 'position' ],
					deviceState,
					value
				);
			} else if ( prop == 'repeat' ) {
				background = blpge_updateDeviceStateValue(
					background,
					[ 'repeat' ],
					deviceState,
					value
				);
			} else if ( prop == 'size' ) {
				background = blpge_updateDeviceStateValue(
					background,
					[ 'size' ],
					deviceState,
					value
				);
			} else if ( prop == 'gradientType' ) {
				background[ prop ] = value;
				if ( value == 'linear' ) {
					if ( ! background.gradientFirstColorLocation ) {
						background.gradientFirstColorLocation = 37;
					}

					if ( ! background.gradientFirstColor ) {
						background.gradientFirstColor = '#e8404b';
					}

					if ( ! background.gradientSecondColor ) {
						background.gradientSecondColor = '#f3911e';
					}

					if ( ! background.gradientSecondColorLocation ) {
						background.gradientSecondColorLocation = 57;
					}

					if ( ! background.gradientLinearDirection ) {
						background.gradientLinearDirection = 270;
					}
				} else if ( value == 'radial' ) {
					if ( ! background.gradientFirstColorLocation ) {
						background.gradientFirstColorLocation = 37;
					}
					if ( ! background.gradientFirstColor ) {
						background.gradientFirstColor = '#e8404b';
					}
					if ( ! background.gradientSecondColor ) {
						background.gradientSecondColor = '#f3911e';
					}
					if ( ! background.gradientSecondColorLocation ) {
						background.gradientSecondColorLocation = 57;
					}

					if ( ! background.gradientRadialDirection ) {
						background.gradientRadialDirection = 'center';
					}
				}
			} else if ( prop == 'gradientTypeHover' ) {
				background[ prop ] = value;
				if ( value == 'linear' ) {
					if ( ! background.gradientFirstColorLocationHover ) {
						background.gradientFirstColorLocationHover = 37;
					}

					if ( ! background.gradientFirstColorHover ) {
						background.gradientFirstColorHover = '#e8404b';
					}

					if ( ! background.gradientSecondColorHover ) {
						background.gradientSecondColorHover = '#f3911e';
					}

					if ( ! background.gradientSecondColorLocationHover ) {
						background.gradientSecondColorLocationHover = 57;
					}

					if ( ! background.gradientLinearDirectionHover ) {
						background.gradientLinearDirectionHover = 270;
					}
				} else if ( value == 'radial' ) {
					if ( ! background.gradientFirstColorLocationHover ) {
						background.gradientFirstColorLocationHover = 37;
					}

					if ( ! background.gradientFirstColorHover ) {
						background.gradientFirstColorHover = '#e8404b';
					}

					if ( ! background.gradientSecondColorHover ) {
						background.gradientSecondColorHover = '#f3911e';
					}

					if ( ! background.gradientSecondColorLocationHover ) {
						background.gradientSecondColorLocationHover = 57;
					}

					if ( ! background.gradientRadialDirectionHover ) {
						background.gradientRadialDirectionHover = 'center';
					}
				}
			} else {
				background[ prop ] = value;
			}

			// Clear Null Values From the Object
			blpge_clear_null_values( background );

			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = background;
			setAttributes( newAttributeObject );
		}

		const NormalTab = (
			<div>
				<ButtonGroup className="blpge_inspector_btn-group">
					<hr className="blpge_inspector_line-through blpge_inspector_line-through--btn-group" />
					<Button
						className={ `blpge_inspector_btn-group__btn
              ${
					background.backgroundState == 'Classic'
						? 'blpge_inspector_btn-group__btn--active'
						: ''
				}
            ` }
						onClick={ function () {
							setAttributes( {
								backgroundState: 'Classic',
							} );
							updateBackground( 'Classic', 'backgroundState' );
						} }
					>
						Classic
						<i class="fas fa-brush" />
					</Button>
					<Button
						className={ `blpge_inspector_btn-group__btn
            ${
				background.backgroundState == 'Gradient'
					? 'blpge_inspector_btn-group__btn--active'
					: ''
			}
          ` }
						onClick={ function () {
							setAttributes( {
								backgroundState: 'Gradient',
							} );
							updateBackground( 'Gradient', 'backgroundState' );
						} }
					>
						Gradient
						<i class="fas fa-paint-brush" />
					</Button>
					{ ! excluded.includes( 'video' ) ? (
						<Button
							className={ `blpge_inspector_btn-group__btn
              ${
					background.backgroundState == 'video'
						? 'blpge_inspector_btn-group__btn--active'
						: ''
				}
            ` }
							onClick={ function () {
								setAttributes( {
									backgroundState: 'video',
								} );
								updateBackground( 'video', 'backgroundState' );
							} }
						>
							Video
							<i class="fas fa-video" />
						</Button>
					) : null }
				</ButtonGroup>

				<div
					style={
						background.backgroundState == 'Classic'
							? { display: 'block' }
							: { display: 'none' }
					}
				>
					{ ! excluded.includes( 'color' ) ? (
						<div className="blpge_row_inspector blpge_row--no-padding-col blpge_inspector_options-set">
							<div className="blpge_row__col--6">
								<span className="blpge_inspector_property-title">
									{ __( 'Background Color' ) }
								</span>
							</div>
							<div
								className="blpge_row__col--6"
								style={ { textAlign: 'right' } }
							>
								<BlpgeColorPicker
									color={ background.color }
									onChange={ ( value ) => {
										updateBackground( value.hex, 'color' );
									} }
								/>
							</div>
						</div>
					) : null }

					{ /* Background Image */ }
					{ ! excluded.includes( 'image' ) ? (
						<div className="blpge_inspector_options-set">
							<span className="blpge_inspector_property-title">
								{ __( 'Background Image' ) }
							</span>
							<div
								className="blpge_inspector_clear_btn--right"
								onClick={ () =>
									updateBackground( null, 'image' )
								}
							>
								<i className="fa fa-undo" />
							</div>
							<Devices
								className="blpge_inspector_device-icons--small"
								onChange={ () => this.forceUpdate() }
							/>
							<div
								style={ {
									display: 'block',
								} }
							>
								<div
									className="blpge_inspector_img_preview"
									style={ { display: 'block' } }
								>
									<img
										src={
											background.image
												? background.image[
														deviceState
												  ]
												: null
										}
									/>
								</div>
								<MediaUpload
									onSelect={ ( imgObject ) =>
										updateBackground(
											imgObject.sizes.full.url,
											'image'
										)
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
							</div>

							{ (
								background.image
									? background.image[ deviceState ]
									: null
							 ) ? (
								<div>
									<span className="blpge_inspector_property-title">
										{ __( 'Position' ) }
									</span>
									<Devices
										className="blpge_inspector_device-icons--small"
										onChange={ () => this.forceUpdate() }
									/>
									<SelectControl
										value={
											background.position
												? background.position[
														deviceState
												  ]
												: 'left top'
										}
										options={ [
											{
												label: __( 'left top' ),
												value: 'left top',
											},
											{
												label: __( 'left center' ),
												value: 'left center',
											},
											{
												label: __( 'left bottom' ),
												value: 'left bottom',
											},
											{
												label: __( 'right top' ),
												value: 'right top',
											},
											{
												label: __( 'right center' ),
												value: 'right center',
											},
											{
												label: __( 'right bottom' ),
												value: 'right bottom',
											},
											{
												label: __( 'center top' ),
												value: 'center top',
											},
											{
												label: __( 'center center' ),
												value: 'center center',
											},
											{
												label: __( 'center bottom' ),
												value: 'center bottom',
											},
										] }
										onChange={ ( value ) =>
											updateBackground(
												value,
												'position'
											)
										}
									/>
									<span className="blpge_inspector_property-title">
										{ __( 'Repeat' ) }
									</span>
									<SelectControl
										value={
											background.repeat
												? background.repeat[
														deviceState
												  ]
												: 'repeat'
										}
										options={ [
											{
												label: __( 'Repeat' ),
												value: 'repeat',
											},
											{
												label: __( 'No repeat' ),
												value: 'no-repeat',
											},
											{
												label: __( 'Repeat-x' ),
												value: 'repeat-x',
											},
											{
												label: __( 'Repeat-Y' ),
												value: 'repeat-y',
											},
										] }
										onChange={ ( value ) =>
											updateBackground( value, 'repeat' )
										}
									/>
									<span className="blpge_inspector_property-title">
										{ __( 'Size' ) }
									</span>
									<SelectControl
										value={
											background.size
												? background.size[ deviceState ]
												: 'auto'
										}
										options={ [
											{
												label: __( 'Auto' ),
												value: 'auto',
											},
											{
												label: __( 'Cover' ),
												value: 'cover',
											},
											{
												label: __( 'Contain' ),
												value: 'contain',
											},
											{
												label: __( 'Initial' ),
												value: 'initial',
											},
											{
												label: __( 'Inherit' ),
												value: 'inherit',
											},
										] }
										onChange={ ( value ) =>
											updateBackground( value, 'size' )
										}
									/>
								</div>
							) : null }
							{ ! excluded.includes( 'parallax' ) ? (
								<div>
									{ /* Use Parallax effect */ }
									<ToggleControl
										label={ __( 'Parallax Effect' ) }
										checked={ background.parallax }
										onChange={ ( value ) =>
											updateBackground(
												value,
												'parallax'
											)
										}
									/>{ ' ' }
								</div>
							) : null }
						</div>
					) : null }
				</div>

				<div
					style={
						background.backgroundState == 'Gradient'
							? { display: 'block' }
							: { display: 'none' }
					}
				>
					<div className="blpge_inspector_options-set">
						<span className="blpge_inspector_property-title">
							{ __( 'Gradient type' ) }
						</span>
						<SelectControl
							value={ background.gradientType }
							options={ [
								{ label: __( 'None' ), value: 'none' },
								{ label: __( 'Linear' ), value: 'linear' },
								{ label: __( 'Radial' ), value: 'radial' },
							] }
							onChange={ function ( value ) {
								updateBackground( value, 'gradientType' );
							} }
						/>

						<div
							style={
								background.gradientType == 'linear'
									? { display: 'block' }
									: { display: 'none' }
							}
						>
							<span className="blpge_inspector_property-title">
								{ __( 'Linear direction' ) }
							</span>
							<RangeControl
								value={ background.gradientLinearDirection }
								onChange={ ( value ) =>
									updateBackground(
										value,
										'gradientLinearDirection'
									)
								}
								min={ 1 }
								max={ 360 }
							/>
						</div>

						<div
							style={
								gradientType == 'radial'
									? { display: 'block' }
									: { display: 'none' }
							}
						>
							<SelectControl
								label={ __( 'Radial direction' ) }
								value={ background.gradientRadialDirection }
								options={ [
									{ label: __( 'Top' ), value: 'top' },
									{ label: __( 'Left' ), value: 'left' },
									{ label: __( 'Right' ), value: 'right' },
									{ label: __( 'Bottom' ), value: 'bottom' },
								] }
								onChange={ ( value ) =>
									updateBackground(
										value,
										'gradientRadialDirection'
									)
								}
							/>
						</div>
					</div>
					<div className="blpge_inspector_options-set">
						<div
							className="blpge_row_inspector blpge_row--no-padding-col"
							style={ { zIndex: 99999 } }
						>
							<div className="blpge_row__col--6">
								<span className="blpge_inspector_property-title">
									{ __( 'First Color' ) }
								</span>
							</div>
							<div
								className="blpge_row__col--6"
								style={ { textAlign: 'right' } }
							>
								<BlpgeColorPicker
									color={ background.gradientFirstColor }
									onChange={ ( value ) =>
										updateBackground(
											value.hex,
											'gradientFirstColor'
										)
									}
								/>
							</div>
						</div>

						<div className="blpge_row_inspector blpge_row--no-padding-col">
							<div className="blpge_row__col--6">
								<span className="blpge_inspector_property-title">
									{ __( 'Second Color' ) }
								</span>
							</div>
							<div
								className="blpge_row__col--6"
								style={ { textAlign: 'right' } }
							>
								<BlpgeColorPicker
									color={ background.gradientSecondColor }
									onChange={ ( value ) =>
										updateBackground(
											value.hex,
											'gradientSecondColor'
										)
									}
								/>
							</div>
						</div>
					</div>
					<span className="blpge_inspector_property-title">
						{ __( 'Start position' ) }
					</span>
					<RangeControl
						value={ background.gradientFirstColorLocation }
						onChange={ ( value ) =>
							updateBackground(
								value,
								'gradientFirstColorLocation'
							)
						}
						min={ 1 }
						max={ 100 }
					/>
					<div className="blpge_inspector_options-set">
						<span className="blpge_inspector_property-title">
							{ __( 'End position' ) }
						</span>
						<RangeControl
							value={ background.gradientSecondColorLocation }
							onChange={ ( value ) =>
								updateBackground(
									value,
									'gradientSecondColorLocation'
								)
							}
							min={ 1 }
							max={ 100 }
						/>
					</div>
				</div>
				<div
					style={
						background.backgroundState == 'video'
							? { display: 'block' }
							: { display: 'none' }
					}
				>
					<div className="blpge_inspector_options-set">
						<span className="blpge_inspector_property-title">
							{ __( 'Background video : url or upload' ) }
						</span>
						<div
							className="blpge_inspector_clear_btn--right"
							onClick={ () =>
								updateBackground( 'URL here', 'video' )
							}
						>
							<i className="fa fa-undo" />
						</div>
						<TextControl
							type="text"
							value={ background.video }
							onChange={ ( value ) =>
								updateBackground( value, 'video' )
							}
						/>
						<MediaUpload
							onSelect={ ( video ) =>
								updateBackground( video.url, 'video' )
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
					</div>
				</div>
				<div>
					{ /* Opacity */ }
					<span class="blpge_inspector_property-title">
						{ __( 'Opacity(%)' ) }
					</span>
					<div
						className="blpge_inspector_clear_btn--right"
						onClick={ () =>
							updateBackground( null, 'overlayOpacity' )
						}
					>
						<i className="fa fa-undo" />
					</div>
					<RangeControl
						value={ background.overlayOpacity * 100 }
						onChange={ ( value ) =>
							updateBackground( value / 100, 'overlayOpacity' )
						}
						min={ 1 }
						max={ 100 }
					/>
				</div>
			</div>
		);
		const hoverTab = (
			<div>
				<ButtonGroup className="blpge_inspector_btn-group">
					<hr className="blpge_inspector_line-through blpge_inspector_line-through--btn-group" />
					<Button
						className={ `blpge_inspector_btn-group__btn
              ${
					background.backgroundHoverState == 'Classic'
						? 'blpge_inspector_btn-group__btn--active'
						: ''
				}
            ` }
						onClick={ () =>
							updateBackground(
								'Classic',
								'backgroundHoverState'
							)
						}
					>
						Classic
						<i class="fas fa-brush" />
					</Button>
					<Button
						className={ `blpge_inspector_btn-group__btn
            ${
				background.backgroundHoverState == 'Gradient'
					? 'blpge_inspector_btn-group__btn--active'
					: ''
			}
          ` }
						onClick={ () =>
							updateBackground(
								'Gradient',
								'backgroundHoverState'
							)
						}
					>
						Gradient
						<i class="fas fa-paint-brush" />
					</Button>
				</ButtonGroup>
				<div
					style={
						background.backgroundHoverState == 'Classic'
							? { display: 'block' }
							: { display: 'none' }
					}
				>
					<div>
						<div className="blpge_row_inspector blpge_row--no-padding-col blpge_inspector_options-set">
							<div className="blpge_row__col--6">
								<span className="blpge_inspector_property-title">
									{ __( 'Hover Color' ) }
								</span>
							</div>
							<div
								className="blpge_row__col--6"
								style={ { textAlign: 'right' } }
							>
								<BlpgeColorPicker
									color={ background.hoverColor }
									onChange={ ( value ) =>
										updateBackground(
											value.hex,
											'hoverColor'
										)
									}
								/>
							</div>
						</div>
					</div>
					<span className="blpge_inspector_property-title">
						{ __( 'Hover Image:' ) }
					</span>
					<div
						className="blpge_inspector_clear_btn--right"
						onClick={ () =>
							updateBackground( null, 'imageAsHover' )
						}
					>
						<i className="fa fa-undo" />
					</div>
					<div
						style={ {
							display: 'flex',
							'justify-content': 'space-between',
						} }
					>
						<MediaUpload
							onSelect={ ( imgObject ) =>
								updateBackground(
									imgObject.sizes.full.url,
									'imageAsHover'
								)
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
						{ background.imageAsHover ? (
							<button
								className="blpge_inspector_btn blpge_inspector_btn--small"
								onClick={ () =>
									updateBackground( null, 'imageAsHover' )
								}
							>
								Clear
							</button>
						) : null }
					</div>
					{ background.imageAsHover ? (
						<div>
							<SelectControl
								label={ __( 'Position' ) }
								value={ background.imgHoverposition }
								options={ [
									{ label: __( 'Top' ), value: 'top' },
									{ label: __( 'Left' ), value: 'left' },
								] }
								onChange={ ( value ) =>
									updateBackground(
										value,
										'imgHoverposition'
									)
								}
							/>
							<SelectControl
								label={ __( 'Repeat' ) }
								value={ background.imgHoverrepeat }
								options={ [
									{
										label: __( 'No repeat' ),
										value: 'no-repeat',
									},
									{
										label: __( 'Repeat-x' ),
										value: 'repeat-x',
									},
									{
										label: __( 'Repeat-Y' ),
										value: 'repeat-y',
									},
								] }
								onChange={ ( value ) =>
									updateBackground( value, 'imgHoverrepeat' )
								}
							/>
							<SelectControl
								label={ __( 'Size' ) }
								value={ background.imgHoversize }
								options={ [
									{
										label: __( 'Default' ),
										value: 'default',
									},
									{ label: __( 'Cover' ), value: 'cover' },
									{
										label: __( 'Contain' ),
										value: 'contain',
									},
									{
										label: __( 'Initial' ),
										value: 'initial',
									},
									{
										label: __( 'Inherit' ),
										value: 'inherit',
									},
								] }
								onChange={ ( value ) =>
									updateBackground( value, 'imgHoversize' )
								}
							/>
						</div>
					) : null }
				</div>
				<div
					style={
						background.backgroundHoverState == 'Gradient'
							? { display: 'block' }
							: { display: 'none' }
					}
				>
					<div className="blpge_inspector_options-set">
						<span className="blpge_inspector_property-title">
							{ __( 'Gradient type' ) }
						</span>
						<SelectControl
							value={ background.gradientTypeHover }
							options={ [
								{ label: __( 'None' ), value: 'none' },
								{ label: __( 'Linear' ), value: 'linear' },
								{ label: __( 'Radial' ), value: 'radial' },
							] }
							onChange={ function ( value ) {
								updateBackground( value, 'gradientTypeHover' );
							} }
						/>

						<div
							style={
								background.gradientTypeHover == 'linear'
									? { display: 'block' }
									: { display: 'none' }
							}
						>
							<span className="blpge_inspector_property-title">
								{ __( 'Linear direction' ) }
							</span>
							<RangeControl
								value={
									background.gradientLinearDirectionHover
								}
								onChange={ ( value ) =>
									updateBackground(
										value,
										'gradientLinearDirectionHover'
									)
								}
								min={ 1 }
								max={ 360 }
							/>
						</div>

						<div
							style={
								background.gradientTypeHover == 'radial'
									? { display: 'block' }
									: { display: 'none' }
							}
						>
							<span className="blpge_inspector_property-title">
								{ __( 'Radial direction' ) }
							</span>
							<SelectControl
								value={
									background.gradientRadialDirectionHover
								}
								options={ [
									{ label: __( 'Top' ), value: 'top' },
									{ label: __( 'Left' ), value: 'left' },
								] }
								onChange={ ( value ) =>
									updateBackground(
										value,
										'gradientRadialDirectionHover'
									)
								}
							/>
						</div>
					</div>
					<div className="blpge_inspector_options-set">
						<div
							className="blpge_row_inspector blpge_row--no-padding-col"
							style={ { zIndex: 9999 } }
						>
							<div className="blpge_row__col--6">
								<span className="blpge_inspector_property-title">
									{ __( 'First Color' ) }
								</span>
							</div>
							<div
								className="blpge_row__col--6"
								style={ { textAlign: 'right' } }
							>
								<BlpgeColorPicker
									color={ background.gradientFirstColorHover }
									onChange={ ( value ) =>
										updateBackground(
											value.hex,
											'gradientFirstColorHover'
										)
									}
								/>
							</div>
						</div>
						<div className="blpge_row_inspector blpge_row--no-padding-col">
							<div className="blpge_row__col--6">
								<span className="blpge_inspector_property-title">
									{ __( 'Second Color' ) }
								</span>
							</div>
							<div
								className="blpge_row__col--6"
								style={ { textAlign: 'right' } }
							>
								<BlpgeColorPicker
									color={
										background.gradientSecondColorHover
									}
									onChange={ ( value ) =>
										updateBackground(
											value.hex,
											'gradientSecondColorHover'
										)
									}
								/>
							</div>
						</div>
					</div>
					<span className="blpge_inspector_property-title">
						{ __( 'Start position' ) }
					</span>
					<RangeControl
						value={ background.gradientFirstColorLocationHover }
						onChange={ ( value ) =>
							updateBackground(
								value,
								'gradientFirstColorLocationHover'
							)
						}
						min={ 1 }
						max={ 100 }
					/>
				</div>

				<div className="blpge_inspector_options-set">
					<span className="blpge_inspector_property-title">
						{ __( 'End position' ) }
					</span>
					<RangeControl
						value={ background.gradientSecondColorLocationHover }
						onChange={ ( value ) =>
							updateBackground(
								value,
								'gradientSecondColorLocationHover'
							)
						}
						min={ 1 }
						max={ 100 }
					/>
				</div>
				<div>
					{ /* Opacity */ }
					<span class="blpge_inspector_property-title">
						{ __( 'Opacity(%)' ) }
					</span>
					<div
						className="blpge_inspector_clear_btn--right"
						onClick={ () =>
							updateBackground( null, 'hoverOverlayOpacity' )
						}
					>
						<i className="fa fa-undo" />
					</div>
					<RangeControl
						value={ background.hoverOverlayOpacity * 100 }
						onChange={ ( value ) =>
							updateBackground(
								value / 100,
								'hoverOverlayOpacity'
							)
						}
						min={ 1 }
						max={ 100 }
					/>
					{ background.backgroundState == 'Classic' &&
					background.backgroundHoverState == 'Classic' ? (
						<div>
							<span class="blpge_inspector_property-title">
								{ __(
									`Transition : ${
										background.transition
											? background.transition
											: 0
									}s`
								) }
							</span>
							<RangeControl
								value={ background.transition * 10 }
								onChange={ ( value ) =>
									updateBackground( value / 10, 'transition' )
								}
								min={ 0 }
								max={ 30 }
							/>
						</div>
					) : null }
				</div>
			</div>
		);

		let NormalTabItem = {
			name: 'normal',
			title: 'Normal',
			content: NormalTab,
		};
		let hoverTabItem = {
			name: 'hover',
			title: 'Hover',
			content: hoverTab,
		};
		let displayedTabs = [];
		displayedTabs.push( NormalTabItem );
		! excluded.includes( 'hover' )
			? displayedTabs.push( hoverTabItem )
			: null;

		return (
			<div>
				<TabPanel
					className={
						this.props.isDropDown
							? 'blpge_inspector_tab-panel no-margin-left'
							: 'blpge_inspector_tab-panel'
					}
					activeClass="blpge_inspector_tab-panel--active"
					onSelect={ ( value ) => {
						updateBackground( value, 'backgroundMode' );
					} }
					tabs={ displayedTabs }
				>
					{ ( tab ) => <p>{ tab.content }</p> }
				</TabPanel>
			</div>
		);
	}
}
