/**
 *
 * Shape Divider Collection
 *
 */

// Import Styles
import './editor.scss';
import './style.scss';

// Import wp components
const { Component } = wp.element;
const { __ } = wp.i18n;
const { ToggleControl, RangeControl } = wp.components;
const { TabPanel } = wp.components;

import BlpgeColorPicker from '../../components/color-picker';

// Import blpge dependencies
import ShapeSelector from '../../components/shape-selector';
import blpge_clear_null_values from '../../helpers/clear-null-values';
import blpge_updateDeviceStateValue from '../../helpers/update-ds-value';

import Devices from '../../components/devices';
import blpge_getDeviceStateIndex from '../../utilities/get_device_state_index';

export default class ShapeDivider extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	static defaultProps = {
		exclude: [],
	};

	render() {
		// Get shapeDivider attribute name
		const attribute = this.props.attributeName;
		const { setAttributes } = this.props;

		// Get shapeDivider object
		let ShapeDivider = JSON.parse(
			JSON.stringify( this.props.attributes[ attribute ] )
		);

		const deviceState = blpge_getDeviceStateIndex();

		function updateShapeDivider( position, prop, value ) {
			if ( prop == 'height' ) {
				ShapeDivider = blpge_updateDeviceStateValue(
					ShapeDivider,
					[ position, 'height' ],
					deviceState,
					value
				);
			} else {
				ShapeDivider[ position ][ prop ] = value;
			}

			// Clear Null Values From the Object
			blpge_clear_null_values( ShapeDivider );

			let newShapeDividerObject = {};
			newShapeDividerObject[ attribute ] = ShapeDivider;
			setAttributes( newShapeDividerObject );
		}

		let topShapeMarkup = (
			<div>
				<div>
					<div
						className="blpge_row"
						style={ { justifyContent: 'space-between' } }
					>
						<span className="blpge_inspector_property-title">
							{ __( 'Top Shape' ) }
						</span>
						<span
							className="blpge_inspector_clear_btn"
							onClick={ () =>
								updateShapeDivider( 'topShape', 'shape', null )
							}
						>
							<i className="fa fa-undo" title="reset" />
						</span>
					</div>
					<ShapeSelector position="topShape" { ...this.props } />
					<div className="blpge_row_inspector blpge_row--no-padding-col blpge_inspector_options-set">
						<div className="blpge_row__col--6">
							<span className="blpge_inspector_property-title">
								{ __( 'Top shape color' ) }
							</span>
						</div>
						<div
							className="blpge_row__col--6"
							style={ { textAlign: 'right' } }
						>
							<BlpgeColorPicker
								color={ ShapeDivider.topShape.fill }
								onChange={ ( value ) =>
									updateShapeDivider(
										'topShape',
										'fill',
										value.hex
									)
								}
							/>
						</div>
					</div>
				</div>
				<div className="blpge_inspector_options-set">
					<ToggleControl
						label={ __( 'Flip Y' ) }
						checked={ ShapeDivider.topShape.rotateY }
						onChange={ ( value ) =>
							updateShapeDivider( 'topShape', 'rotateY', value )
						}
					/>
					<ToggleControl
						label={ __( 'Flip X' ) }
						checked={ ShapeDivider.topShape.rotateX }
						onChange={ ( value ) =>
							updateShapeDivider( 'topShape', 'rotateX', value )
						}
					/>
					<ToggleControl
						label={ __( 'On front' ) }
						checked={ ShapeDivider.topShape.onFront }
						onChange={ ( value ) =>
							updateShapeDivider( 'topShape', 'onFront', value )
						}
					/>
					<span class="blpge_inspector_property-title">
						{ __( 'Height(px)' ) }
					</span>
					<Devices
						className="blpge_inspector_device-icons--small"
						onChange={ () => this.forceUpdate() }
					/>
					<RangeControl
						value={
							ShapeDivider.topShape.height
								? ShapeDivider.topShape.height[ deviceState ]
								: null
						}
						onChange={ ( value ) =>
							updateShapeDivider( 'topShape', 'height', value )
						}
						min={ 0 }
						max={ 800 }
					/>
				</div>
			</div>
		);

		let bottomShapeMarkup = (
			<div>
				<div>
					<div
						className="blpge_row"
						style={ { justifyContent: 'space-between' } }
					>
						<span className="blpge_inspector_property-title">
							{ __( 'Bottom Shape' ) }
						</span>
						<span
							className="blpge_inspector_clear_btn"
							onClick={ () =>
								updateShapeDivider(
									'bottomShape',
									'shape',
									null
								)
							}
						>
							<i className="fa fa-undo" title="reset" />
						</span>
					</div>

					<ShapeSelector position="bottomShape" { ...this.props } />
					<div className="blpge_row_inspector blpge_row--no-padding-col blpge_inspector_options-set">
						<div className="blpge_row__col--6">
							<span className="blpge_inspector_property-title">
								{ __( 'Bottom shape color' ) }
							</span>
						</div>
						<div
							className="blpge_row__col--6"
							style={ { textAlign: 'right' } }
						>
							<BlpgeColorPicker
								color={ ShapeDivider.bottomShape.fill }
								onChange={ ( value ) =>
									updateShapeDivider(
										'bottomShape',
										'fill',
										value.hex
									)
								}
							/>
						</div>
					</div>
				</div>
				<div className="blpge_inspector_options-set">
					<ToggleControl
						label={ __( 'Flip Y' ) }
						checked={ ShapeDivider.bottomShape.rotateY }
						onChange={ ( value ) =>
							updateShapeDivider(
								'bottomShape',
								'rotateY',
								value
							)
						}
					/>
					<ToggleControl
						label={ __( 'Flip X' ) }
						checked={ ShapeDivider.bottomShape.rotateX }
						onChange={ ( value ) =>
							updateShapeDivider(
								'bottomShape',
								'rotateX',
								value
							)
						}
					/>
					<ToggleControl
						label={ __( 'On front' ) }
						checked={ ShapeDivider.bottomShape.onFront }
						onChange={ ( value ) =>
							updateShapeDivider(
								'bottomShape',
								'onFront',
								value
							)
						}
					/>
					<span className="blpge_inspector_property-title">
						Height(px)
					</span>
					<Devices
						className="blpge_inspector_device-icons--small"
						onChange={ () => this.forceUpdate() }
					/>
					<RangeControl
						value={
							ShapeDivider.bottomShape.height
								? ShapeDivider.bottomShape.height[ deviceState ]
								: null
						}
						onChange={ ( value ) =>
							updateShapeDivider( 'bottomShape', 'height', value )
						}
						min={ 0 }
						max={ 800 }
					/>
				</div>
			</div>
		);
		return (
			<TabPanel
				className="blpge_inspector_tab-panel"
				activeClass="blpge_inspector_tab-panel--active"
				onSelect={ ( value ) => {
					console.log( value );
				} }
				tabs={ [
					{
						name: 'top',
						title: 'Top',
						content: topShapeMarkup,
					},
					{
						name: 'bottom',
						title: 'Bottom',
						content: bottomShapeMarkup,
					},
				] }
			>
				{ ( tab ) => <p>{ tab.content }</p> }
			</TabPanel>
		);
	}
}
