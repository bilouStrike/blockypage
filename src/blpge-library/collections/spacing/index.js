/**
 *
 * Spacing Collection
 *
 * Custom Margin and Padding For an element
 *
 */

// Import Styles
import './editor.scss';

// Import wp dependencies
const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;
const { RangeControl } = wp.components;

// Import blpge dependencies
import Devices from '../../components/devices';
import CssUnits from '../../components/css-units';
import blpge_getDeviceStateIndex from '../../utilities/get_device_state_index';
import blpge_clear_null_values from '../../helpers/clear-null-values';
import blpge_updateDeviceStateValue from '../../helpers/update-ds-value';

export default class Spacing extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	static defaultProps = {
		units: true,
		percentUnit: true,
		padding: true,
		margin: true,
	};

	render() {
		// Self variable
		const self = this;

		// Get Device state
		const deviceState = blpge_getDeviceStateIndex();

		const { setAttributes } = this.props;

		// Get the shadow attribute name
		const attribute = this.props.attributeName;

		// Get the spacing object
		let spacing = JSON.parse(
			JSON.stringify( this.props.attributes[ attribute ] )
		);

		// Locked Icon ClaasName
		let margin_lockedClassName = 'fas';
		let padding_lockedClassName = 'fas';

		if ( spacing.margin.locked ) {
			margin_lockedClassName += ' fa-link';
		} else {
			margin_lockedClassName += ' fa-unlink';
		}

		if ( spacing.padding.locked ) {
			padding_lockedClassName += ' fa-link';
		} else {
			padding_lockedClassName += ' fa-unlink';
		}

		// Helper function: update all values of spacing type
		function updateAllSpacingValues( spacingType, value ) {
			spacing = blpge_updateDeviceStateValue(
				spacing,
				[ spacingType, 'values', 'top' ],
				deviceState,
				value
			);
			spacing = blpge_updateDeviceStateValue(
				spacing,
				[ spacingType, 'values', 'right' ],
				deviceState,
				value
			);
			spacing = blpge_updateDeviceStateValue(
				spacing,
				[ spacingType, 'values', 'bottom' ],
				deviceState,
				value
			);
			spacing = blpge_updateDeviceStateValue(
				spacing,
				[ spacingType, 'values', 'left' ],
				deviceState,
				value
			);
		}

		function resetSpacing( type ) {
			// Return to string format after updating
			delete spacing[ type ].values.top;
			delete spacing[ type ].values.right;
			delete spacing[ type ].values.bottom;
			delete spacing[ type ].values.left;

			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = spacing;
			setAttributes( newAttributeObject );
			self.forceUpdate();
		}

		// Update the spacing object
		function updateSpacing( value, key ) {
			// Update the spacing object
			switch ( key ) {
				// Clear All Values
				case 'clear':
					updateAllSpacingValues( 'margin', value );
					updateAllSpacingValues( 'padding', value );
					break;
				// Margin Cases
				case 'marginTop':
					if ( spacing.margin.locked ) {
						updateAllSpacingValues( 'margin', value );
					} else {
						spacing = blpge_updateDeviceStateValue(
							spacing,
							[ 'margin', 'values', 'top' ],
							deviceState,
							value
						);
					}
					break;

				case 'marginRight':
					if ( spacing.margin.locked ) {
						updateAllSpacingValues( 'margin', value );
					} else {
						spacing = blpge_updateDeviceStateValue(
							spacing,
							[ 'margin', 'values', 'right' ],
							deviceState,
							value
						);
					}
					break;

				case 'marginBottom':
					if ( spacing.margin.locked ) {
						updateAllSpacingValues( 'margin', value );
					} else {
						spacing = blpge_updateDeviceStateValue(
							spacing,
							[ 'margin', 'values', 'bottom' ],
							deviceState,
							value
						);
					}
					break;

				case 'marginLeft':
					if ( spacing.margin.locked ) {
						updateAllSpacingValues( 'margin', value );
					} else {
						spacing = blpge_updateDeviceStateValue(
							spacing,
							[ 'margin', 'values', 'left' ],
							deviceState,
							value
						);
					}
					break;

				case 'marginUnit':
					spacing = blpge_updateDeviceStateValue(
						spacing,
						[ 'margin', 'unit' ],
						deviceState,
						value
					);

					break;

				case 'marginLock':
					spacing.margin.locked = value;
					break;

				// Padding Cases
				case 'paddingTop':
					if ( spacing.padding.locked ) {
						updateAllSpacingValues( 'padding', value );
					} else {
						spacing = blpge_updateDeviceStateValue(
							spacing,
							[ 'padding', 'values', 'top' ],
							deviceState,
							value
						);
					}
					break;

				case 'paddingRight':
					if ( spacing.padding.locked ) {
						updateAllSpacingValues( 'padding', value );
					} else {
						spacing = blpge_updateDeviceStateValue(
							spacing,
							[ 'padding', 'values', 'right' ],
							deviceState,
							value
						);
					}
					break;
				case 'paddingBottom':
					if ( spacing.padding.locked ) {
						updateAllSpacingValues( 'padding', value );
					} else {
						spacing = blpge_updateDeviceStateValue(
							spacing,
							[ 'padding', 'values', 'bottom' ],
							deviceState,
							value
						);
					}
					break;

				case 'paddingLeft':
					if ( spacing.padding.locked ) {
						updateAllSpacingValues( 'padding', value );
					} else {
						spacing = blpge_updateDeviceStateValue(
							spacing,
							[ 'padding', 'values', 'left' ],
							deviceState,
							value
						);
					}
					break;

				case 'paddingUnit':
					spacing = blpge_updateDeviceStateValue(
						spacing,
						[ 'padding', 'unit' ],
						deviceState,
						value
					);

					break;

				case 'paddingLock':
					spacing.padding.locked = value;
					break;

				default:
					break;
			}

			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = spacing;
			setAttributes( newAttributeObject );

			self.forceUpdate();
		}

		/**************************************************************************** */
		/** Margin Section */
		/**************************************************************************** */

		let margin = this.props.margin ? (
			<div
				class="blpge_inspector_inputs-row blpge_inspector_options-set"
				style={ this.props.isDropDown ? { padding: '10px' } : null }
			>
				<div className="blpge_inspector_inputs-row__title">
					<div class="blpge_row__col--7">
						<span className="blpge_inspector_property-title">
							{ __( 'Margin' ) }
						</span>
						<Devices
							className="blpge_inspector_device-icons--small"
							onChange={ () => this.forceUpdate() }
						/>
					</div>
					<div class="blpge_row__col--5">
						<CssUnits
							attribute={ spacing.margin.unit[ deviceState ] }
							onChange={ ( value ) =>
								updateSpacing( value, 'marginUnit' )
							}
						/>
					</div>
				</div>
				<div className="blpge_row blpge_inspector_inputs-row__inputs">
					<RangeControl
						help="Top"
						value={
							( spacing.margin.values.top != null
								? spacing.margin.values.top[ deviceState ]
								: null ) == null
								? ''
								: spacing.margin.values.top[ deviceState ]
						}
						onChange={ ( value ) =>
							updateSpacing( value, 'marginTop' )
						}
						min={ -999 }
						max={ 999 }
					/>
					{ ! this.props.autoMargin ? (
						<RangeControl
							help="Right"
							value={
								( spacing.margin.values.right
									? spacing.margin.values.right[ deviceState ]
									: null ) == null
									? ''
									: spacing.margin.values.right[ deviceState ]
							}
							onChange={ ( value ) =>
								updateSpacing( value, 'marginRight' )
							}
							min={ -999 }
							max={ 999 }
						/>
					) : (
						<div className="components-base-control components-range-control">
							<div className="components-base-control__field">
								<span className="components-range-control__number">
									{ ' ' }
									auto{ ' ' }
								</span>
							</div>
							<p
								id="inspector-range-control-3__help"
								class="components-base-control__help"
							>
								Right
							</p>
						</div>
					) }

					<RangeControl
						help="Bottom"
						value={
							( spacing.margin.values.bottom
								? spacing.margin.values.bottom[ deviceState ]
								: null ) == null
								? ''
								: spacing.margin.values.bottom[ deviceState ]
						}
						onChange={ ( value ) =>
							updateSpacing( value, 'marginBottom' )
						}
						min={ -999 }
						max={ 999 }
					/>
					{ ! this.props.autoMargin ? (
						<RangeControl
							help="Left"
							value={
								( spacing.margin.values.left
									? spacing.margin.values.left[ deviceState ]
									: null ) == null
									? ''
									: spacing.margin.values.left[ deviceState ]
							}
							onChange={ ( value ) =>
								updateSpacing( value, 'marginLeft' )
							}
							min={ -999 }
							max={ 999 }
						/>
					) : (
						<div className="components-base-control components-range-control">
							<div className="components-base-control__field">
								<span className="components-range-control__number">
									{ ' ' }
									auto{ ' ' }
								</span>
							</div>
							<p
								id="inspector-range-control-3__help"
								class="components-base-control__help"
							>
								Left
							</p>
						</div>
					) }
					<button
						className="blpge_inspector_inputs-row__lock-icon"
						onClick={ () =>
							updateSpacing(
								! spacing.margin.locked,
								'marginLock'
							)
						}
					>
						<i
							className={ margin_lockedClassName }
							style={ { transform: 'rotate(90deg)' } }
						/>
						<div
							className="blpge_inspector_clear_btn blpge_inspector_btn--small"
							onClick={ () => resetSpacing( 'margin' ) }
						>
							<i className="fa fa-undo" title="reset" />
						</div>
					</button>
				</div>
			</div>
		) : null;

		/**************************************************************************** */
		/** End Of Margin Section */
		/**************************************************************************** */

		/**************************************************************************** */
		/** Padding Section */
		/**************************************************************************** */

		let padding = this.props.padding ? (
			<div
				class="blpge_inspector_inputs-row blpge_inspector_options-set"
				style={ this.props.isDropDown ? { padding: '10px' } : null }
			>
				<div className="blpge_inspector_inputs-row__title">
					<div class="blpge_row__col--7">
						<span className="blpge_inspector_property-title">
							{ __( 'Padding' ) }
						</span>
						<Devices
							className="blpge_inspector_device-icons--small"
							onChange={ () => this.forceUpdate() }
						/>
					</div>
					<div class="blpge_row__col--5">
						<CssUnits
							attribute={ spacing.padding.unit[ deviceState ] }
							onChange={ ( value ) =>
								updateSpacing( value, 'paddingUnit' )
							}
						/>
					</div>
				</div>

				<div className="blpge_row blpge_inspector_inputs-row__inputs">
					<RangeControl
						help="Top"
						value={
							( spacing.padding.values.top != null
								? spacing.padding.values.top[ deviceState ]
								: null ) == null
								? ''
								: spacing.padding.values.top[ deviceState ]
						}
						onChange={ ( value ) => {
							updateSpacing( value.toString(), 'paddingTop' ),
								console.log( value );
						} }
						min={ 0 }
						max={ 999 }
					/>

					<RangeControl
						help="Right"
						value={
							( spacing.padding.values.right
								? spacing.padding.values.right[ deviceState ]
								: null ) == null
								? ''
								: spacing.padding.values.right[ deviceState ]
						}
						onChange={ ( value ) =>
							updateSpacing( value, 'paddingRight' )
						}
						min={ 0 }
						max={ 999 }
					/>

					<RangeControl
						help="Bottom"
						value={
							( spacing.padding.values.bottom
								? spacing.padding.values.bottom[ deviceState ]
								: null ) == null
								? ''
								: spacing.padding.values.bottom[ deviceState ]
						}
						onChange={ ( value ) =>
							updateSpacing( value, 'paddingBottom' )
						}
						min={ 0 }
						max={ 999 }
					/>

					<RangeControl
						help="Left"
						value={
							( spacing.padding.values.left
								? spacing.padding.values.left[ deviceState ]
								: null ) == null
								? ''
								: spacing.padding.values.left[ deviceState ]
						}
						onChange={ ( value ) =>
							updateSpacing( value, 'paddingLeft' )
						}
						min={ 0 }
						max={ 999 }
					/>

					<button
						className="blpge_inspector_inputs-row__lock-icon"
						onClick={ () =>
							updateSpacing(
								! spacing.padding.locked,
								'paddingLock'
							)
						}
					>
						<i
							className={ padding_lockedClassName }
							style={ { transform: 'rotate(90deg)' } }
						/>
						<div
							className="blpge_inspector_clear_btn blpge_inspector_btn--small"
							onClick={ () => resetSpacing( 'padding' ) }
						>
							<i className="fa fa-undo" />
						</div>
					</button>
				</div>
			</div>
		) : null;

		/**************************************************************************** */
		/** End Of Padding Section */
		/**************************************************************************** */

		return [ margin, padding ];
	}
}
