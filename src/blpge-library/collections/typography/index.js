/**
 *
 * Typography Collection
 *
 */

// Import Styles
import './editor.scss';
import './style.scss';

// Import Rangy
import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';

// Import wp components
const { Component } = wp.element;
const { __ } = wp.i18n;
const { RangeControl, Dashicon, Button, ButtonGroup, Dropdown } = wp.components;

import BlpgeColorPicker from '../../components/color-picker';
import '../../components/font-picker';
import Select from 'react-select';
import collectionsObjects from '../../helpers/collections-objects';

import Devices from '../../components/devices';
import blpge_getDeviceStateIndex from '../../utilities/get_device_state_index';
import fontsList from './fonts-list';
import blpge_updateDeviceStateValue from '../../helpers/update-ds-value';

export default class Typography extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	static defaultProps = {
		exclude: [],
	};

	render() {
		const self = this;

		// Define Constants
		const { setAttributes } = this.props;
		const excluded = this.props.exclude;

		// Get the overlay attribute name
		const attribute = this.props.attributeName;
		const textAttribute = this.props.textAttribute;

		// Get Device state
		const deviceState = blpge_getDeviceStateIndex();

		let typography = JSON.parse(
			JSON.stringify( this.props.attributes[ attribute ] )
		);

		let typographyFontFamilyLabel;
		if ( typography.fontFamily ) {
			typographyFontFamilyLabel = typography.fontFamily.label;
		}

		// Get prop for controlors
		function getPropValue( typography ) {
			if ( window.localStorage.getItem( 'blpge_selection' ) ) {
				const selection_object = JSON.parse(
					window.localStorage.getItem( 'blpge_selection' )
				);
				const selection_className = selection_object.class;
				if ( typography.selections ) {
					if ( selection_className in typography.selections ) {
						return typography.selections[ selection_className ];
					} else {
						return typography;
					}
				} else {
					return typography;
				}
			} else {
				return typography;
			}
		}

		// Update Prop function
		function updateProp( prop, value, opt, selectionClass = null ) {
			if ( opt == 'shadow' ) {
				if ( selectionClass == null ) {
					typography[ 'textShadow' ][ prop ] = value;
				} else {
					typography.selections[ selectionClass ][ 'textShadow' ][
						prop
					] = value;
				}
			} else if ( prop == 'size' ) {
				if ( selectionClass == null ) {
					typography = blpge_updateDeviceStateValue(
						typography,
						[ 'size' ],
						deviceState,
						value
					);
				} else {
					typography = blpge_updateDeviceStateValue(
						typography,
						[ 'selections', selectionClass, 'size' ],
						deviceState,
						value
					);
				}
			} else if ( prop == 'line_height' ) {
				if ( selectionClass == null ) {
					typography = blpge_updateDeviceStateValue(
						typography,
						[ 'line_height' ],
						deviceState,
						value
					);
				} else {
					typography = blpge_updateDeviceStateValue(
						typography,
						[ 'selections', selectionClass, 'line_height' ],
						deviceState,
						value
					);
				}
			} else if ( prop == 'lineHeightUnit' ) {
				if ( selectionClass == null ) {
					typography = blpge_updateDeviceStateValue(
						typography,
						[ 'lineHeightUnit' ],
						deviceState,
						value
					);
				} else {
					typography = blpge_updateDeviceStateValue(
						typography,
						[ 'selections', selectionClass, 'lineHeightUnit' ],
						deviceState,
						value
					);
				}
			} else if ( prop == 'letter_spacing' ) {
				if ( selectionClass == null ) {
					typography = blpge_updateDeviceStateValue(
						typography,
						[ 'letter_spacing' ],
						deviceState,
						value
					);
				} else {
					typography = blpge_updateDeviceStateValue(
						typography,
						[ 'selections', selectionClass, 'letter_spacing' ],
						deviceState,
						value
					);
				}
			} else {
				if ( selectionClass == null ) {
					typography[ prop ] = value;
				} else {
					typography.selections[ selectionClass ][ prop ] = value;
				}
			}
		}

		// Update text with classNames
		function updateText( selection_className ) {
			/* Content extracting */
			const docFrag = window.blpge_currentRange.extractContents();
			let inter_div = document.createElement( 'div' );
			inter_div.appendChild( docFrag.cloneNode( true ) );

			// Delete the content
			window.blpge_currentRange.deleteContents();

			// Insert Wrapped content
			let para = document.createElement( 'span' );
			para.className = selection_className;
			para.data = 'blpge_selection';
			let node = document.createTextNode( inter_div.innerText );
			para.appendChild( node );
			window.blpge_currentRange.insertNode( para );

			// Get the new text
			let new_text = jQuery( `.${ selection_className }` )
				.closest( '.blpge_editor_richText' )
				.html();

			new_text = new_text.replace( /<[^\/>][^>]*><\/[^>]+>/gim, '' );

			// Update the Attributes
			let newAttributeObject = {};
			newAttributeObject[ textAttribute ] = new_text;
			setAttributes( newAttributeObject );
		}

		// Update selection function
		function updateSelectionTypography( prop, value, opt ) {
			const selection_object = JSON.parse(
				window.localStorage.getItem( 'blpge_selection' )
			);
			const selection_className = selection_object.class;
			if ( window.blpge_currentRange && ! selection_object.exist ) {
				updateText( selection_className );
			}

			/* update the selection typography object */
			if ( ! typography.selections ) {
				typography.selections = {};
				typography.selections[ selection_className ] = JSON.parse(
					JSON.stringify( collectionsObjects.typography )
				);
				updateProp( prop, value, opt, selection_className );
			} else if ( ! typography.selections[ selection_className ] ) {
				typography.selections[ selection_className ] = JSON.parse(
					JSON.stringify( collectionsObjects.typography )
				);
				updateProp( prop, value, opt, selection_className );
			} else {
				updateProp( prop, value, opt, selection_className );
			}
		}

		function updateTypography( prop, value, opt ) {
			if ( window.localStorage.getItem( 'blpge_selection' ) ) {
				updateSelectionTypography( prop, value, opt );
				// Object to pass to setAttributes
				let newAttributeObject = {};
				newAttributeObject[ attribute ] = typography;
				setAttributes( newAttributeObject );
			} else {
				updateProp( prop, value, opt );
				// Object to pass to setAttributes
				let newAttributeObject = {};
				newAttributeObject[ attribute ] = typography;
				setAttributes( newAttributeObject );
			}
		}

		function setTextShadowStyle( hShadow, vShadow, blur ) {
			if ( window.localStorage.getItem( 'blpge_selection' ) ) {
				const selection_object = JSON.parse(
					window.localStorage.getItem( 'blpge_selection' )
				);
				const selection_className = selection_object.class;

				if ( window.blpge_currentRange && ! selection_object.exist ) {
					updateText( selection_className );
				}

				if ( ! typography.selections ) {
					typography.selections = {};
					typography.selections[ selection_className ] = JSON.parse(
						JSON.stringify( collectionsObjects.typography )
					);
					typography.selections[ selection_className ].textShadow[
						'hShadow'
					] = hShadow;
					typography.selections[ selection_className ].textShadow[
						'vShadow'
					] = vShadow;
					typography.selections[ selection_className ].textShadow[
						'blur'
					] = blur;
					typography.selections[ selection_className ].textShadow[
						'color'
					] = '#999';
				} else if ( ! typography.selections[ selection_className ] ) {
					typography.selections[ selection_className ] = JSON.parse(
						JSON.stringify( collectionsObjects.typography )
					);
					typography.selections[ selection_className ].textShadow[
						'hShadow'
					] = hShadow;
					typography.selections[ selection_className ].textShadow[
						'vShadow'
					] = vShadow;
					typography.selections[ selection_className ].textShadow[
						'blur'
					] = blur;
					typography.selections[ selection_className ].textShadow[
						'color'
					] = '#999';
				} else {
					typography.selections[ selection_className ].textShadow[
						'hShadow'
					] = hShadow;
					typography.selections[ selection_className ].textShadow[
						'vShadow'
					] = vShadow;
					typography.selections[ selection_className ].textShadow[
						'blur'
					] = blur;
					typography.selections[ selection_className ].textShadow[
						'color'
					] = '#999';
				}
			} else {
				typography.textShadow[ 'hShadow' ] = hShadow;
				typography.textShadow[ 'vShadow' ] = vShadow;
				typography.textShadow[ 'blur' ] = blur;
				typography.textShadow[ 'color' ] = '#999';
			}

			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = typography;
			setAttributes( newAttributeObject );
		}

		let advancedOptions = (
			<div
				style={ { padding: '10px' } }
				className="blpge_inspector_advancedOptionsWrraper"
			>
				<div>
					{ ! excluded.includes( 'textTransform' ) ? (
						<div>
							<span className="blpge_inspector_property-title">
								{ __( 'Capitalize' ) }
							</span>
							<ButtonGroup
								className="blpge_inspector_btn-group"
								style={ {
									width: '150px',
									alignItems: 'center',
									float: 'right',
									marginTop: '5px',
								} }
							>
								<Button
									className={ `blpge_inspector_btn-group__btn
                    ${
						getPropValue( typography ).transform == null
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
									onClick={ () => {
										updateTypography( 'transform', null );
									} }
								>
									None
								</Button>
								<Button
									title="Lowercase"
									className={ `blpge_inspector_btn-group__btn
                    ${
						getPropValue( typography ).transform == 'lowercase'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
									onClick={ () => {
										updateTypography(
											'transform',
											'lowercase'
										);
									} }
								>
									aa
								</Button>
								<Button
									title="Capitalize"
									className={ `blpge_inspector_btn-group__btn
                    ${
						getPropValue( typography ).transform == 'capitalize'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
									onClick={ () => {
										updateTypography(
											'transform',
											'capitalize'
										);
									} }
								>
									Aa
								</Button>
								<Button
									title="Uppercase"
									className={ `blpge_inspector_btn-group__btn
                    ${
						getPropValue( typography ).transform == 'uppercase'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
									onClick={ () => {
										updateTypography(
											'transform',
											'uppercase'
										);
									} }
								>
									AA
								</Button>
							</ButtonGroup>
						</div>
					) : null }
				</div>

				<div className="blpge_inspector_line-height-section">
					<div className="blpge_row blpge_row--no-padding-col">
						<div className="blpge_row__col--8">
							<span className="blpge_inspector_property-title">
								{ __( 'Line-Height' ) }
							</span>
							<Devices
								className="blpge_inspector_device-icons--small"
								onChange={ () => this.forceUpdate() }
							/>
						</div>
						<div className="blpge_row__col--4">
							<div
								className="blpge_inspector_clear_btn--right"
								onClick={ () =>
									updateTypography( 'line_height', null )
								}
							>
								<i className="fa fa-undo" />
							</div>
						</div>
					</div>

					<RangeControl
						value={
							getPropValue( typography ).line_height
								? getPropValue( typography ).line_height[
										deviceState
								  ]
								: null
						}
						onChange={ ( value ) =>
							updateTypography( 'line_height', value )
						}
						min={ 1 }
						max={ 150 }
					/>
				</div>
				<div>
					<span className="blpge_inspector_property-title">
						{ __( 'Letter Spacing' ) }
					</span>
					<Devices
						className="blpge_inspector_device-icons--small"
						onChange={ () => this.forceUpdate() }
					/>
					<div
						className="blpge_inspector_clear_btn--right"
						onClick={ () =>
							updateTypography( 'letter_spacing', null )
						}
					>
						<i className="fa fa-undo" />
					</div>
					<RangeControl
						value={
							getPropValue( typography ).letter_spacing
								? getPropValue( typography ).letter_spacing[
										deviceState
								  ] * 20
								: null
						}
						onChange={ ( value ) =>
							updateTypography( 'letter_spacing', value / 20 )
						}
						min={ -200 }
						max={ 999 }
					/>
				</div>
			</div>
		);

		const shadowOptions = (
			<div
				style={ { padding: '10px' } }
				className="blpge_inspector_shadowWrraper"
			>
				<div className="blpge_textShadow">
					<a
						className="blpge_textShadow__shadow_style"
						onClick={ () => setTextShadowStyle( 1, 1, 17 ) }
					>
						<span className="blpge_textShadow__shadow_style--style1">
							Text
						</span>
					</a>
					<a
						className="blpge_textShadow__shadow_style"
						onClick={ () => setTextShadowStyle( 5, 5, 5 ) }
					>
						<span className="blpge_textShadow__shadow_style--style2">
							Text
						</span>
					</a>
					<a
						className="blpge_textShadow__shadow_style"
						onClick={ () => setTextShadowStyle( 1, 6, 4 ) }
					>
						<span className="blpge_textShadow__shadow_style--style3">
							Text
						</span>
					</a>
					<a
						className="blpge_textShadow__shadow_style"
						onClick={ () => setTextShadowStyle( 2, 2, 0 ) }
					>
						<span className="blpge_textShadow__shadow_style--style4">
							Text
						</span>
					</a>
				</div>
				<span className="blpge_inspector_property-title">
					{ __( 'Horizontal offset' ) }
				</span>
				<div
					className="blpge_inspector_clear_btn--right"
					onClick={ () => updateTypography( 'hShadow', 0, 'shadow' ) }
				>
					<i className="fa fa-undo" />
				</div>
				<RangeControl
					value={ getPropValue( typography ).textShadow.hShadow }
					onChange={ ( value ) =>
						updateTypography( 'hShadow', value, 'shadow' )
					}
					min={ -50 }
					max={ 50 }
				/>
				<span className="blpge_inspector_property-title">
					{ __( 'Vertical offset' ) }
				</span>
				<div
					className="blpge_inspector_clear_btn--right"
					onClick={ () => updateTypography( 'vShadow', 0, 'shadow' ) }
				>
					<i className="fa fa-undo" />
				</div>
				<RangeControl
					value={ getPropValue( typography ).textShadow.vShadow }
					onChange={ ( value ) =>
						updateTypography( 'vShadow', value, 'shadow' )
					}
					min={ -50 }
					max={ 50 }
				/>
				<span className="blpge_inspector_property-title">
					{ __( 'Blur' ) }
				</span>
				<div
					className="blpge_inspector_clear_btn--right"
					onClick={ () => updateTypography( 'blur', 0, 'shadow' ) }
				>
					<i className="fa fa-undo" />
				</div>
				<RangeControl
					value={ getPropValue( typography ).textShadow.blur }
					onChange={ ( value ) =>
						updateTypography( 'blur', value, 'shadow' )
					}
					min={ 0 }
					max={ 80 }
				/>
				<div className="blpge_row_inspector blpge_row--no-padding-col">
					<div className="blpge_row__col--6">
						<span className="blpge_inspector_property-title">
							{ __( 'Color' ) }
						</span>
					</div>
					<div
						className="blpge_row__col--6"
						style={ { textAlign: 'right' } }
					>
						<BlpgeColorPicker
							color={
								getPropValue( typography ).textShadow.color
							}
							onChange={ ( value ) =>
								updateTypography( 'color', value.hex, 'shadow' )
							}
						/>
					</div>
				</div>
			</div>
		);
		return (
			<div
				className="blpge_inspector_typographyWrraper"
				style={ this.props.isDropDown ? { padding: '10px' } : null }
			>
				<div>
					<span className="blpge_inspector_property-title">
						{ __( 'Font Size (px)' ) }
					</span>
					<Devices
						className="blpge_inspector_device-icons--small"
						onChange={ () => this.forceUpdate() }
					/>
					<div
						className="blpge_inspector_clear_btn--right"
						onClick={ () => updateTypography( 'size', 0 ) }
					>
						<i className="fa fa-undo" />
					</div>
					<RangeControl
						value={
							getPropValue( typography ).size
								? getPropValue( typography ).size[ deviceState ]
								: null
						}
						onChange={ ( value ) =>
							updateTypography( 'size', value )
						}
						min={ 1 }
						max={ 120 }
					/>
				</div>
				<div
					className="blpge_row blpge_row--no-padding-col"
					style={ { zIndex: '99999' } }
				>
					<div className="blpge_row__col--7">
						<span className="blpge_inspector_property-title">
							{ __( 'Font Family' ) }
						</span>
						<Select
							placeholder=""
							maxMenuHeight={ 250 }
							value={ getPropValue( typography ).fontFamily }
							onChange={ ( value ) => {
								let fontObject = JSON.parse(
									JSON.stringify( value )
								);
								fontObject.fontIndex = fontsList.indexOf(
									value
								);
								delete fontObject.variants;
								updateTypography( 'fontFamily', fontObject );
							} }
							options={ fontsList }
						/>
					</div>
					<div className="blpge_row__col--5">
						<span className="blpge_inspector_property-title">
							{ __( 'Style' ) }
						</span>
						<Select
							placeholder=""
							value={
								getPropValue( typography ).fontFamily
									? {
											value: getPropValue( typography )
												.fontFamily.fontWeight,
											label: getPropValue( typography )
												.fontFamily.fontWeight,
									  }
									: null
							}
							onChange={ ( value ) => {
								let fontObject = getPropValue( typography )
									.fontFamily;
								fontObject.fontWeight = value.value;
								updateTypography( 'fontFamily', fontObject );
							} }
							options={
								getPropValue( typography ).fontFamily
									? fontsList[
											getPropValue( typography )
												.fontFamily.fontIndex
									  ].variants
									: []
							}
							className="blpge_inspector_select-leftPadding"
						/>
					</div>
				</div>
				<div
					className="blpge_row_inspector blpge_row--no-padding-col"
					style={ { marginTop: '10px' } }
				>
					<div className="blpge_row__col--6">
						<span className="blpge_inspector_property-title">
							{ __( 'Color' ) }
						</span>
					</div>
					<div
						className="blpge_row__col--6"
						style={ { textAlign: 'right' } }
					>
						<BlpgeColorPicker
							color={ getPropValue( typography ).color }
							onChange={ ( value ) =>
								updateTypography( 'color', value.hex )
							}
						/>
					</div>
				</div>
				<div>
					{ ! excluded.includes( 'textAlign' ) ? (
						<div>
							<span className="blpge_inspector_property-title">
								{ __( 'Text align' ) }
							</span>
							<ButtonGroup className="blpge_inspector_btn-group blpge_inspector_btn-group--align">
								<Button
									className={ `blpge_inspector_btn-group__btn
                  ${
						getPropValue( typography ).aligment == 'left'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
									title="Left"
									onClick={ () => {
										updateTypography( 'aligment', 'left' );
									} }
								>
									<Dashicon icon="editor-alignleft" />
								</Button>
								<Button
									className={ `blpge_inspector_btn-group__btn
                  ${
						getPropValue( typography ).aligment == 'center'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
									title="Center"
									onClick={ () => {
										updateTypography(
											'aligment',
											'center'
										);
									} }
								>
									<Dashicon icon="editor-aligncenter" />
								</Button>
								<Button
									className={ `blpge_inspector_btn-group__btn
                  ${
						getPropValue( typography ).aligment == 'right'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
									title="right"
									onClick={ () => {
										updateTypography( 'aligment', 'right' );
									} }
								>
									<Dashicon icon="editor-alignright" />
								</Button>
								<Button
									className={ `blpge_inspector_btn-group__btn
                  ${
						getPropValue( typography ).aligment == 'justify'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
									title="justify"
									onClick={ () => {
										updateTypography(
											'aligment',
											'justify'
										);
									} }
								>
									<Dashicon icon="editor-justify" />
								</Button>
							</ButtonGroup>
						</div>
					) : null }
				</div>
				<div>
					<div
						className="blpge_row blpge_row--no-padding-col"
						style={ { marginTop: '10px' } }
					>
						<div
							className="blpge_row__col--10"
							style={ { display: 'flex', alignItems: 'center' } }
						>
							Advanced Options
						</div>
						<div className="blpge_row__col--2">
							<Dropdown
								position="bottom left"
								renderToggle={ ( { onToggle } ) => (
									<div>
										<button
											className="components-button components-icon-button components-toolbar__control"
											onClick={ onToggle }
										>
											<i
												class="far fa-sun"
												style={ {
													margin: 'auto',
													fontSize: '20px',
												} }
											/>
										</button>
									</div>
								) }
								renderContent={ ( { onToggle } ) =>
									advancedOptions
								}
							/>
						</div>
					</div>
					{ /* Shadow Options */ }
					<div className="blpge_row blpge_row--no-padding-col">
						<div
							className="blpge_row__col--10"
							style={ { display: 'flex', alignItems: 'center' } }
						>
							Shadow
						</div>
						<div className="blpge_row__col--2">
							<Dropdown
								position="bottom left"
								renderToggle={ ( { onToggle } ) => (
									<div>
										<button
											className="components-button components-icon-button components-toolbar__control"
											onClick={ onToggle }
										>
											<i
												class="far fa-sun"
												style={ {
													margin: 'auto',
													fontSize: '20px',
												} }
											/>
										</button>
									</div>
								) }
								renderContent={ ( { onToggle } ) =>
									shadowOptions
								}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
