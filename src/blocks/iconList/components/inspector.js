/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls, ColorPalette } = wp.blockEditor;
const {
	PanelBody,
	RangeControl,
	ButtonGroup,
	Button,
	Dashicon,
} = wp.components;

// Import blockypage dependencies
const { Spacing, Background, Border, Typography } = blpgelib.collections;

import iconsListArray from './icons';
let allIcons = iconsListArray;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				iconsList,
				currentItem,
				iconsColor,
				iconsSize,
				direction,
			},
			setAttributes,
			className,
		} = this.props;

		let iconsListInstance = iconsList;
		function searchChange( e ) {
			if ( self._input.value ) {
				const regexpValue = RegExp( self._input.value );
				allIcons = iconsListArray.filter( function ( ele ) {
					if ( regexpValue.test( ele ) ) {
						return ele;
					}
				} );
				self.forceUpdate();
			} else {
				allIcons = iconsListArray;
				self.forceUpdate();
			}
			e.preventDefault();
		}

		function extractIconName( value ) {
			let icon_format = `${ value.slice( 0, 3 ) }__${ value.slice( 7 ) }`;
			return icon_format;
		}

		function updateIconOfItem( value ) {
			if ( currentItem != null ) {
				let newIconList = iconsListInstance.slice();

				iconsListInstance[ currentItem ].icon = extractIconName(
					value
				);
				setAttributes( { iconsList: newIconList } );
			} else {
				console.log( 'You have to chose item from the list' );
			}
		}

		return (
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<ButtonGroup className="blpge_inspector_btn-group">
						<Button
							className={ `blpge_inspector_btn-group__btn
                        ${
							direction == 'left'
								? 'blpge_inspector_btn-group__btn--active'
								: ''
						} ` }
							title="Left"
							onClick={ () => {
								setAttributes( { direction: 'flex-start' } );
							} }
						>
							<Dashicon icon="editor-alignleft" />
						</Button>
						<Button
							className={ `blpge_inspector_btn-group__btn
                        ${
							direction == 'center'
								? 'blpge_inspector_btn-group__btn--active'
								: ''
						} ` }
							title="Center"
							onClick={ () => {
								setAttributes( { direction: 'center' } );
							} }
						>
							<Dashicon icon="editor-aligncenter" />
						</Button>
						<Button
							className={ `blpge_inspector_btn-group__btn
                        ${
							direction == 'right'
								? 'blpge_inspector_btn-group__btn--active'
								: ''
						} ` }
							title="Right"
							onClick={ () => {
								setAttributes( { direction: 'flex-end' } );
							} }
						>
							<Dashicon icon="editor-alignright" />
						</Button>
					</ButtonGroup>
				</PanelBody>

				<PanelBody title="Icon" initialOpen={ false }>
					<div>
						<span className="gtnw_label">
							{ ' ' }
							{ __( 'Choose an icon' ) }{ ' ' }
						</span>
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
							{ allIcons.map( ( value ) => {
								return (
									<span className="blpge_iconPickerWrraper">
										<i
											onClick={ () =>
												updateIconOfItem( value )
											}
											className={ value }
										/>
									</span>
								);
							} ) }
						</div>
					</div>
					<span className="blpge_inspector_property-title">
						{ __( 'Color' ) }
					</span>
					<ColorPalette
						className="blpge_inspector_color-palette"
						value={ iconsColor }
						onChange={ ( value ) =>
							setAttributes( { iconsColor: value } )
						}
					/>
					<span className="blpge_inspector_property-title">
						{ __( 'Size (px)' ) }
					</span>
					<div>
						<RangeControl
							value={ iconsSize }
							onChange={ ( value ) =>
								setAttributes( { iconsSize: value } )
							}
							min={ 8 }
							max={ 100 }
						/>
					</div>
				</PanelBody>

				<PanelBody title="Typography" initialOpen={ false }>
					<Typography attributeName="typography" { ...this.props } />
				</PanelBody>

				<PanelBody title="Background" initialOpen={ false }>
					<Background
						attributeName="background"
						exclude={ [ 'video' ] }
						{ ...this.props }
					/>
				</PanelBody>

				<PanelBody title="Spacing" initialOpen={ false }>
					<Spacing attributeName="spacing" { ...this.props } />
				</PanelBody>

				<PanelBody title="Border" initialOpen={ false }>
					<Border attributeName="border" { ...this.props } />
				</PanelBody>
			</InspectorControls>
		);
	}
}
