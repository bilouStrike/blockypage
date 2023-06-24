/**
 *
 * Icon Picker
 *
 * This component is using font awesome 5
 *
 */

// Import Style
import './editor.scss';
import './style.scss';

// Import wp dependencies
const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;
const { dispatch } = wp.data;
const { ToggleControl, RangeControl } = wp.components;
import blpge_updateDeviceStateValue from '../../helpers/update-ds-value';
import BlpgeColorPicker from '../../components/color-picker';

import BlpgeSubPanel from '../../components/BlpgeSubPanel';
import Devices from '../../components/devices';
import blpge_getDeviceStateIndex from '../../utilities/get_device_state_index';
// Import collections

// Import component dependencies
import iconsListArray from './iconsList';

let iconsList = iconsListArray;

export default class IconPicker extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		// Define Variables
		const self = this;
		const { setAttributes, blockUsed } = this.props;

		const iconAttribute = this.props.iconAttributeName;

		const iconPickerObject = JSON.parse(
			JSON.stringify( this.props.attributes[ iconAttribute ] )
		);

		// On search change function
		const deviceState = blpge_getDeviceStateIndex();

		function extractIconName( value ) {
			let iconArray = [];
			iconArray.push( value.slice( 0, 3 ) );
			iconArray.push( value.slice( 7 ) );
			return iconArray;
		}

		function updateIconPicker( prop, value ) {
			if ( prop == 'width' ) {
				blpge_updateDeviceStateValue(
					iconPickerObject,
					[ 'iconSize' ],
					deviceState,
					value
				);
			} else if ( prop == 'iconEnable' ) {
				iconPickerObject[ prop ] = value;
			} else if ( prop == 'icon' ) {
				iconPickerObject[ prop ] = extractIconName( value );
			} else {
				iconPickerObject[ prop ] = value;
			}
			let newIconPickerObject = {};
			newIconPickerObject[ iconAttribute ] = iconPickerObject;
			setAttributes( newIconPickerObject );
			if ( blockUsed == 'accordion' && prop == 'icon' ) {
				let innerblocksList = wp.data
					.select( 'core/block-editor' )
					.getBlocks( self.props.clientId );
				innerblocksList.forEach( function ( innerBlockItem ) {
					dispatch(
						'core/block-editor'
					).updateBlockAttributes( innerBlockItem.clientId, {
						icon: extractIconName( value ),
					} );
				} );
			}
		}

		function searchChange( e ) {
			if ( self._input.value ) {
				const regexpValue = RegExp( self._input.value );
				iconsList = iconsListArray.filter( function ( ele ) {
					if ( regexpValue.test( ele ) ) {
						return ele;
					}
				} );
				self.forceUpdate();
			} else {
				iconsList = iconsListArray;
				self.forceUpdate();
			}
			e.preventDefault();
		}

		return (
			<div>
				<div className="blpge_row blpge_row--no-padding-col">
					<span className="blpge_inspector_option-title">
						{ __( 'Choose an icon' ) }
					</span>
					<div
						className="blpge_limitedIconsContainer"
						style={
							this.props.icons
								? { border: '1px solid #333', marginTop: '5px' }
								: null
						}
					>
						{ this.props.icons ? (
							this.props.icons.map( ( value ) => {
								return (
									<span className="blpge_iconPickerWrraper">
										<i
											className={ value }
											onClick={ () => {
												updateIconPicker(
													'icon',
													value
												);
											} }
										/>
									</span>
								);
							} )
						) : (
							<Fragment>
								<input
									onChange={ searchChange }
									ref={ function ( el ) {
										self._input = el;
									} }
									type="text"
									placeholder="Search..."
									className="blpge_iconInputSearch"
								/>
								<div className="blpge_iconsContainer">
									{ iconsList.map( ( value ) => {
										return (
											<span className="blpge_iconPickerWrraper">
												<i
													className={ value }
													onClick={ () => {
														updateIconPicker(
															'icon',
															value
														);
													} }
												/>
											</span>
										);
									} ) }
								</div>
							</Fragment>
						) }
					</div>
				</div>
				<div>{ this.props.children }</div>
				<div className="blpge_inspector_options-set">
					<span class="blpge_inspector_property-title">
						{ __( 'Size(px)' ) }
					</span>
					<Devices
						className="blpge_inspector_device-icons--small"
						onChange={ () => this.forceUpdate() }
					/>
					<RangeControl
						value={
							iconPickerObject.iconSize
								? iconPickerObject.iconSize[ deviceState ]
								: null
						}
						onChange={ ( value ) =>
							updateIconPicker( 'width', value )
						}
						min={ 1 }
						max={ 400 }
					/>
				</div>
				<div className="blpge_row_inspector blpge_row--no-padding-col blpge_inspector_options-set">
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
							color={ iconPickerObject.fill }
							onChange={ ( value ) =>
								updateIconPicker( 'fill', value.hex )
							}
						/>
					</div>
				</div>
				<div className="blpge_inspector_options-set">
					<ToggleControl
						label={ __( 'Flip Y' ) }
						checked={ iconPickerObject.rotateY }
						onChange={ ( value ) =>
							updateIconPicker( 'rotateY', value )
						}
					/>
					<ToggleControl
						label={ __( 'Flip X' ) }
						checked={ iconPickerObject.rotateX }
						onChange={ ( value ) =>
							updateIconPicker( 'rotateX', value )
						}
					/>
				</div>
				<BlpgeSubPanel
					activeCollections={ {
						Background: {
							attrb: 'icon_background',
							excluded: [ 'video', 'activeTab' ],
						},
						Border: { attrb: 'icon_border', excluded: [] },
						Spacing: { attrb: 'icon_spacing', excluded: [] },
					} }
					{ ...this.props }
				/>
			</div>
		);
	}
}
