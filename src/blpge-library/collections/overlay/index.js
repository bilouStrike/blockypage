/**
 *
 *
 *
 */

// Import Styles
import './editor.scss';
import './style.scss';

// Import wp components
const { Component } = wp.element;
const { __ } = wp.i18n;
const { RangeControl, Dropdown } = wp.components;
import BlpgeColorPicker from '../../components/color-picker';

export default class Overlay extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	static defaultProps = {
		exclude: [],
	};

	render() {
		// Define Constants
		const { setAttributes } = this.props;
		const excluded = this.props.exclude;

		// Get the overlay attribute name
		const attribute = this.props.attributeName;

		// Get the overlay object
		let overlay = JSON.parse(
			JSON.stringify( this.props.attributes[ attribute ] )
		);

		function updateOverlay( prop, value ) {
			overlay[ prop ] = value;
			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = overlay;

			setAttributes( newAttributeObject );
		}

		function clearOverlay() {
			overlay[ 'opacity' ] = 1;
			overlay[ 'brightness' ] = 1;
			overlay[ 'contrast' ] = 1;
			overlay[ 'grayscale' ] = 1;
			overlay[ 'hue_rotate' ] = 0;
			overlay[ 'saturate' ] = 1;
			overlay[ 'sepia' ] = 0;
			overlay[ 'invert' ] = 0;
			overlay[ 'color' ] = null;

			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = overlay;

			setAttributes( newAttributeObject );
		}

		const advancedOptions = (
			<div style={ { padding: '10px' } }>
				{ ' ' }
				<span className="blpge_inspector_property-title">
					{ __( 'Hue' ) }
				</span>
				<div
					className="blpge_inspector_clear_btn--right"
					onClick={ () => updateOverlay( 'hue_rotate', 0 ) }
				>
					<i className="fa fa-undo" />
				</div>
				<RangeControl
					value={ overlay.hue_rotate * 100 }
					onChange={ ( value ) =>
						updateOverlay( 'hue_rotate', value / 100 )
					}
					min={ 0 }
					max={ 360 }
				/>
				<span className="blpge_inspector_property-title">
					{ __( 'Invert' ) }
				</span>
				<div
					className="blpge_inspector_clear_btn--right"
					onClick={ () => updateOverlay( 'invert', 0 ) }
				>
					<i className="fa fa-undo" />
				</div>
				<RangeControl
					value={ overlay.invert * 100 }
					onChange={ ( value ) =>
						updateOverlay( 'invert', value / 100 )
					}
					min={ 0 }
					max={ 100 }
				/>
				<span className="blpge_inspector_property-title">
					{ __( 'Saturate' ) }
				</span>
				<div
					className="blpge_inspector_clear_btn--right"
					onClick={ () => updateOverlay( 'saturate', 1 ) }
				>
					<i className="fa fa-undo" />
				</div>
				<RangeControl
					value={ overlay.saturate * 100 }
					onChange={ ( value ) =>
						updateOverlay( 'saturate', value / 100 )
					}
					min={ 0 }
					max={ 300 }
				/>
				<span className="blpge_inspector_property-title">
					{ __( 'Sepia' ) }
				</span>
				<div
					className="blpge_inspector_clear_btn--right"
					onClick={ () => updateOverlay( 'sepia', 0 ) }
				>
					<i className="fa fa-undo" />
				</div>
				<RangeControl
					value={ overlay.sepia * 100 }
					onChange={ ( value ) =>
						updateOverlay( 'sepia', value / 100 )
					}
					min={ 0 }
					max={ 100 }
				/>
			</div>
		);

		return (
			<div>
				{ ! excluded.includes( 'color' ) ? (
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
								color={ overlay.color }
								onChange={ ( value ) =>
									updateOverlay( 'color', value.hex )
								}
							/>
						</div>
					</div>
				) : null }
				<div>
					<span className="blpge_inspector_property-title">
						{ __( 'Opacity:' ) }
					</span>
					<div
						className="blpge_inspector_clear_btn--right"
						onClick={ () => updateOverlay( 'opacity', 1 ) }
					>
						<i className="fa fa-undo" />
					</div>
					<RangeControl
						value={ overlay.opacity * 100 }
						onChange={ ( value ) =>
							updateOverlay( 'opacity', value / 100 )
						}
						min={ 1 }
						max={ 100 }
					/>
				</div>
				<div className="blpge_inspector_options-set">
					<span className="blpge_inspector_property-title">
						{ __( 'Brightness:' ) }
					</span>
					<div
						className="blpge_inspector_clear_btn--right"
						onClick={ () => updateOverlay( 'brightness', 1 ) }
					>
						<i className="fa fa-undo" />
					</div>
					<RangeControl
						value={ overlay.brightness * 100 }
						onChange={ ( value ) =>
							updateOverlay( 'brightness', value / 100 )
						}
						min={ 1 }
						max={ 600 }
					/>
					<span className="blpge_inspector_property-title">
						{ __( 'Contrast' ) }
					</span>
					<div
						className="blpge_inspector_clear_btn--right"
						onClick={ () => updateOverlay( 'contrast', 1 ) }
					>
						<i className="fa fa-undo" />
					</div>
					<RangeControl
						value={ overlay.contrast * 100 }
						onChange={ ( value ) =>
							updateOverlay( 'contrast', value / 100 )
						}
						min={ 1 }
						max={ 600 }
					/>

					<span className="blpge_inspector_property-title">
						{ __( 'Grayscale' ) }
					</span>
					<div
						className="blpge_inspector_clear_btn--right"
						onClick={ () => updateOverlay( 'grayscale', 1 ) }
					>
						<i className="fa fa-undo" />
					</div>
					<RangeControl
						value={ overlay.grayscale * 100 }
						onChange={ ( value ) =>
							updateOverlay( 'grayscale', value / 100 )
						}
						min={ 1 }
						max={ 100 }
					/>
				</div>

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

				<button
					className="blpge_inspector_btn blpge_inspector_btn--medium"
					onClick={ () => clearOverlay() }
				>
					<i className="fa fa-undo" /> Remove overlay
				</button>
			</div>
		);
	}
}
