/**
 *
 * Shadow Collection
 *
 * Set a shadow for a box or text
 *
 */

// Import Style
import './editor.scss';

// Import wp components
const { Component } = wp.element;
const { __ } = wp.i18n;
const { RangeControl, SelectControl } = wp.components;
import BlpgeColorPicker from '../../components/color-picker';

export default class Shadow extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		// Define Constants
		const { setAttributes } = this.props;

		// Get the shadow attribute name
		const attribute = this.props.attributeName;

		// Get the shadow object
		let shadow = JSON.parse(
			JSON.stringify( this.props.attributes[ attribute ] )
		);

		// Update the shadow attribute
		function updateShadow( value, prop ) {
			shadow[ prop ] = value;

			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = shadow;

			setAttributes( newAttributeObject );
		}

		function setShadowStyle(
			hoffset,
			voffset,
			blur,
			spread,
			position = null
		) {
			shadow[ 'hoffset' ] = hoffset;
			shadow[ 'voffset' ] = voffset;
			shadow[ 'blur' ] = blur;
			shadow[ 'spread' ] = spread;
			shadow[ 'color' ] = '#333';
			shadow[ 'position' ] = position;

			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = shadow;

			setAttributes( newAttributeObject );
		}

		return (
			<div className="blpge_inspector_options-set">
				<div className="blpge_inspector_shadow_styles">
					<a
						className="shadow_style"
						onClick={ () => setShadowStyle( 0, 2, 18, 0, '' ) }
					>
						<span className="blpge_shadow_style_box blpge_box_shadow-style1" />
					</a>
					<a
						className="shadow_style"
						onClick={ () => setShadowStyle( 6, 6, 18, 0, '' ) }
					>
						<span className="blpge_shadow_style_box blpge_box_shadow-style2" />
					</a>
					<a
						className="shadow_style"
						onClick={ () => setShadowStyle( 0, 12, 18, -6, '' ) }
					>
						<span className="blpge_shadow_style_box blpge_box_shadow-style3" />
					</a>
					<a
						className="shadow_style"
						onClick={ () => setShadowStyle( 0, 0, 18, 0, 'inset' ) }
					>
						<span className="blpge_shadow_style_box blpge_box_shadow-style4" />
					</a>
					<a
						className="shadow_style"
						onClick={ () => setShadowStyle( 10, 10, 0, 0, '' ) }
					>
						<span className="blpge_shadow_style_box blpge_box_shadow-style5" />
					</a>
					<a
						className="shadow_style"
						onClick={ () =>
							setShadowStyle( 10, 10, 0, 0, 'inset' )
						}
					>
						<span className="blpge_shadow_style_box blpge_box_shadow-style6" />
					</a>
				</div>
				<span className="blpge_inspector_property-title">
					Horizontal offset
				</span>
				<RangeControl
					value={ shadow.hoffset }
					onChange={ ( value ) => updateShadow( value, 'hoffset' ) }
					min={ -50 }
					max={ 50 }
				/>
				<span className="blpge_inspector_property-title">
					Vertical offset
				</span>
				<RangeControl
					value={ shadow.voffset }
					onChange={ ( value ) => updateShadow( value, 'voffset' ) }
					min={ -50 }
					max={ 50 }
				/>
				<span className="blpge_inspector_property-title">Blur</span>
				<RangeControl
					value={ shadow.blur }
					onChange={ ( value ) => updateShadow( value, 'blur' ) }
					min={ 0 }
					max={ 20 }
				/>
				<span className="blpge_inspector_property-title">Spread</span>
				<RangeControl
					value={ shadow.spread }
					onChange={ ( value ) => updateShadow( value, 'spread' ) }
					min={ 0 }
					max={ 20 }
				/>
				<div className="blpge_row_inspector blpge_row--no-padding-col blpge_inspector_options-set">
					<div className="blpge_row__col--6">
						<span class="blpge_inspector_property-title">
							{ ' ' }
							{ __( 'Color' ) }
						</span>
					</div>
					<div
						className="blpge_row__col--6"
						style={ { textAlign: 'right' } }
					>
						<BlpgeColorPicker
							color={ shadow.color }
							onChange={ ( value ) =>
								updateShadow( value.hex, 'color' )
							}
						/>
					</div>
				</div>
				<div style={ { marginTop: '10px' } }>
					<SelectControl
						label={ __( 'Position' ) }
						value={ shadow.position }
						options={ [
							{ label: __( 'Outer shadow' ), value: '' },
							{ label: __( 'Inner shadow' ), value: 'inset' },
						] }
						onChange={ ( value ) =>
							updateShadow( value, 'position' )
						}
					/>
				</div>
			</div>
		);
	}
}
