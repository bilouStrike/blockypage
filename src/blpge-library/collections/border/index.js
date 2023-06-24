/**
 *
 * Border Collection
 *
 *
 */

// Import Style
import './editor.scss';

import Icons from './icons';
import blpge_clear_null_values from '../../helpers/clear-null-values';

// Import wp components
const { Component } = wp.element;
const { __ } = wp.i18n;
const { RangeControl, SelectControl, Button, ButtonGroup } = wp.components;
import BlpgeColorPicker from '../../components/color-picker';

export default class Border extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const { setAttributes } = this.props;

		// Get the border attribute name
		const attribute = this.props.attributeName;

		const {
			attributes: { borderSlectedTab = 'all' },
		} = this.props;
		// Get the border object
		let border = JSON.parse(
			JSON.stringify( this.props.attributes[ attribute ] )
		);

		// Locked Icon ClaasName
		let borderRadius_lockedClassName = 'fas';

		this.styleValue = border[ 'style' ][ borderSlectedTab ];
		this.sizeValue = border[ 'size' ][ borderSlectedTab ];
		this.colorValue = border[ 'color' ][ borderSlectedTab ];

		if ( border.borderRadius.locked ) {
			borderRadius_lockedClassName += ' fa-link';
		} else {
			borderRadius_lockedClassName += ' fa-unlink';
		}

		function resetBorderRadius() {
			border.borderRadius.values.topLeft = 0;
			border.borderRadius.values.topRight = 0;
			border.borderRadius.values.bottomRight = 0;
			border.borderRadius.values.bottomLeft = 0;

			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = border;
			setAttributes( newAttributeObject );
		}

		// Helper function: update all values of border
		function updateAllBorderValues( borderType, value ) {
			if ( borderType == 'borderSize' ) {
				border[ borderType ][ 'values' ] = {
					top: value,
					right: value,
					bottom: value,
					left: value,
				};
			} else if ( borderType == 'borderRadius' ) {
				border[ borderType ][ 'values' ] = {
					topLeft: value,
					topRight: value,
					bottomRight: value,
					bottomLeft: value,
				};
			}
		}

		function resetBorder( position ) {
			border[ 'style' ][ position ] = null;
			border[ 'color' ][ position ] = null;
			border[ 'size' ][ position ] = 0;

			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = border;
			setAttributes( newAttributeObject );
		}

		// Update the border object
		function updateBorder( key, value, position ) {
			switch ( key ) {
				case 'borderStyle':
					border[ 'style' ][ position ] = value;
					break;
				case 'colorStyle':
					border[ 'color' ][ position ] = value;
					break;
				case 'sizeStyle':
					border[ 'size' ][ position ] = value;
					break;
				case 'borderRadiusUnit':
					border.borderRadius.unit = value;
					break;

				case 'borderRadiusLock':
					border.borderRadius.locked = value;
					break;
				case 'topLeft':
					if ( border.borderRadius.locked ) {
						updateAllBorderValues( 'borderRadius', value );
					} else {
						border.borderRadius.values[ key ] = value;
					}
					break;
				case 'topRight':
					if ( border.borderRadius.locked ) {
						updateAllBorderValues( 'borderRadius', value );
					} else {
						border.borderRadius.values[ key ] = value;
					}
					break;
				case 'bottomRight':
					if ( border.borderRadius.locked ) {
						updateAllBorderValues( 'borderRadius', value );
					} else {
						border.borderRadius.values[ key ] = value;
					}
					break;
				case 'bottomLeft':
					if ( border.borderRadius.locked ) {
						updateAllBorderValues( 'borderRadius', value );
					} else {
						border.borderRadius.values[ key ] = value;
					}
					break;
				default:
					break;
			}

			// Clear Null Values From the Object
			blpge_clear_null_values( border );

			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = border;

			setAttributes( newAttributeObject );
		}

		return (
			<div style={ this.props.isDropDown ? { padding: '10px' } : null }>
				<div class="blpge_inspector_inputs-row blpge_inspector_options-set">
					<div className="blpge_inspector_inputs-row__title">
						<div class="blpge_row__col--8">
							<span className="blpge_inspector_property-title">
								{ __( 'Round Corners ' ) }
							</span>
						</div>
						<div class="blpge_row__col--4">
							<ButtonGroup className="blpge_inspector_css-units">
								<Button
									className={ `blpge_inspector_css-units__unit ${
										border.borderRadius.unit == 'px'
											? 'blpge_inspector_css-units__unit--active'
											: ''
									}` }
									onClick={ () =>
										updateBorder(
											'borderRadiusUnit',
											'px',
											borderSlectedTab
										)
									}
								>
									px
								</Button>
								<Button
									className={ `blpge_inspector_css-units__unit ${
										border.borderRadius.unit == '%'
											? 'blpge_inspector_css-units__unit--active'
											: ''
									}` }
									onClick={ () =>
										updateBorder(
											'borderRadiusUnit',
											'%',
											borderSlectedTab
										)
									}
								>
									%
								</Button>
							</ButtonGroup>
						</div>
					</div>
					<div className="blpge_row blpge_inspector_inputs-row__inputs">
						<RangeControl
							help="Top-left"
							value={ border.borderRadius.values.topLeft }
							onChange={ ( value ) =>
								updateBorder(
									'topLeft',
									value,
									borderSlectedTab
								)
							}
							min={ 0 }
							max={ 99 }
						/>

						<RangeControl
							help="Top-right"
							value={ border.borderRadius.values.topRight }
							onChange={ ( value ) =>
								updateBorder(
									'topRight',
									value,
									borderSlectedTab
								)
							}
							min={ 0 }
							max={ 99 }
						/>
						<RangeControl
							help="Btm-right"
							value={ border.borderRadius.values.bottomRight }
							onChange={ ( value ) =>
								updateBorder(
									'bottomRight',
									value,
									borderSlectedTab
								)
							}
							min={ 0 }
							max={ 99 }
						/>
						<RangeControl
							help="Btm-left"
							value={ border.borderRadius.values.bottomLeft }
							onChange={ ( value ) =>
								updateBorder(
									'bottomLeft',
									value,
									borderSlectedTab
								)
							}
							min={ 0 }
							max={ 99 }
						/>

						<button
							className="blpge_inspector_inputs-row__lock-icon"
							onClick={ () =>
								updateBorder(
									'borderRadiusLock',
									! border.borderRadius.locked
								)
							}
						>
							<i
								className={ borderRadius_lockedClassName }
								style={ { transform: 'rotate(90deg)' } }
							/>
							<div
								className="blpge_inspector_clear_btn blpge_inspector_btn--small"
								onClick={ () => resetBorderRadius() }
							>
								<i className="fa fa-undo" />
							</div>
						</button>
					</div>
				</div>
				<div className="blpge_inspector_options-set">
					<ButtonGroup className="blpge_inspector_btn-group">
						<Button
							className={ `blpge_inspector_btn-group__btn blpge_inspector_btn-group__btn--light
              ${
					borderSlectedTab == 'all'
						? 'blpge_inspector_btn-group__btn--active-light'
						: ''
				}
            ` }
							onClick={ function () {
								setAttributes( { borderSlectedTab: 'all' } );
							} }
						>
							<Icons icon="border-all" />
						</Button>
						<Button
							className={ `blpge_inspector_btn-group__btn blpge_inspector_btn-group__btn--light
              ${
					borderSlectedTab == 'top'
						? 'blpge_inspector_btn-group__btn--active-light'
						: ''
				}
            ` }
							onClick={ function () {
								setAttributes( { borderSlectedTab: 'top' } );
							} }
						>
							<Icons icon="border-top" />
						</Button>
						<Button
							className={ `blpge_inspector_btn-group__btn blpge_inspector_btn-group__btn--light
              ${
					borderSlectedTab == 'right'
						? 'blpge_inspector_btn-group__btn--active-light'
						: ''
				}
            ` }
							onClick={ function () {
								setAttributes( { borderSlectedTab: 'right' } );
							} }
						>
							<Icons icon="border-right" />
						</Button>
						<Button
							className={ `blpge_inspector_btn-group__btn blpge_inspector_btn-group__btn--light
              ${
					borderSlectedTab == 'bottom'
						? 'blpge_inspector_btn-group__btn--active-light'
						: ''
				}
            ` }
							onClick={ function () {
								setAttributes( { borderSlectedTab: 'bottom' } );
							} }
						>
							<Icons icon="border-bottom" />
						</Button>
						<Button
							className={ `blpge_inspector_btn-group__btn blpge_inspector_btn-group__btn--light
              ${
					borderSlectedTab == 'left'
						? 'blpge_inspector_btn-group__btn--active-light'
						: ''
				}
            ` }
							onClick={ function () {
								setAttributes( { borderSlectedTab: 'left' } );
							} }
						>
							<Icons icon="border-left" />
						</Button>
					</ButtonGroup>
					<div>
						{ /* Border Style */ }
						<span className="blpge_inspector_property-title">
							{ __( 'Border Style' ) } (
							<span className="blpge_inspector_border-title">
								{ borderSlectedTab }
							</span>
							)
						</span>
						<div
							className="blpge_inspector_clear_btn--right"
							onClick={ () => resetBorder( borderSlectedTab ) }
						>
							<i className="fa fa-undo" />
						</div>
						<SelectControl
							help="Choose the style for the border"
							value={ this.styleValue }
							options={ [
								{ label: __( 'None' ), value: 'none' },
								{ label: __( 'Solid' ), value: 'solid' },
								{ label: __( 'Double' ), value: 'double' },
								{ label: __( 'Dotted' ), value: 'dotted' },
								{ label: __( 'Dashed' ), value: 'dashed' },
							] }
							onChange={ ( value ) =>
								updateBorder(
									'borderStyle',
									value,
									borderSlectedTab
								)
							}
						/>

						{ /* Border Size */ }
						<span className="blpge_inspector_property-title">
							{ __( 'Size' ) } (
							<span className="blpge_inspector_border-title">
								{ ' ' }
								{ borderSlectedTab }
							</span>
							)
						</span>
						<RangeControl
							value={ this.sizeValue }
							onChange={ ( value ) =>
								updateBorder(
									'sizeStyle',
									value,
									borderSlectedTab
								)
							}
							min={ 0 }
							max={ 50 }
						/>

						{ /* Border Color */ }
						<div className="blpge_row_inspector blpge_row--no-padding-col">
							<div className="blpge_row__col--6">
								<span className="blpge_inspector_property-title">
									{ __( 'Color' ) } (
									<span className="blpge_inspector_border-title">
										{ borderSlectedTab }
									</span>
									)
								</span>
							</div>
							<div
								className="blpge_row__col--6"
								style={ { textAlign: 'right' } }
							>
								<BlpgeColorPicker
									color={ this.colorValue }
									onChange={ ( value ) =>
										updateBorder(
											'colorStyle',
											value.hex,
											borderSlectedTab
										)
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
