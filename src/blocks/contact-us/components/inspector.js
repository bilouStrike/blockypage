import { Fragment } from 'react';

/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const {
	PanelBody,
	TextareaControl,
	ToggleControl,
	TextControl,
	ButtonGroup,
	Button,
	Dashicon,
} = wp.components;

// Import blockypage dependencies
const { Spacing, Background, Border, Typography } = blpgelib.collections;
const { BlpgeSubPanel } = blpgelib.components;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				recaptcha,
				site_key,
				secret_key,
				success_message,
				error_message,
				button_align,
			},
			setAttributes,
			className,
		} = this.props;

		function getHomeUrl() {
			var href = window.location.href;
			var index = href.indexOf( '/wp-admin' );
			var homeUrl = href.substring( 0, index );
			return homeUrl + '/wp-admin/admin.php?page=blpge-email-settings';
		}

		return (
			<InspectorControls>
				<PanelBody title="Label Typography" initialOpen={ false }>
					<Typography
						attributeName="label_typography"
						{ ...this.props }
					/>
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

				<PanelBody title="Input" initialOpen={ false }>
					<BlpgeSubPanel
						activeCollections={ {
							Border: { attrb: 'input_border', excluded: [] },
						} }
						{ ...this.props }
					/>
				</PanelBody>

				<PanelBody title="Settings" initialOpen={ false }>
					<span>
						{ ' ' }
						Go to{ ' ' }
						<a href={ getHomeUrl() } target="_blank">
							{ ' ' }
							Email settings{ ' ' }
						</a>{ ' ' }
						to set the recipient email address.
					</span>
					<TextareaControl
						label="Success message"
						value={ success_message }
						onChange={ ( value ) =>
							setAttributes( { success_message: value } )
						}
					/>
					<TextareaControl
						label="Failed message"
						value={ error_message }
						onChange={ ( value ) =>
							setAttributes( { error_message: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Capetcha' ) }
						checked={ recaptcha }
						onChange={ ( value ) =>
							setAttributes( { recaptcha: value } )
						}
					/>
					{ recaptcha ? (
						<Fragment>
							<TextControl
								label="Site key"
								help="Google site key"
								value={ site_key }
								onChange={ ( value ) =>
									setAttributes( { site_key: value } )
								}
							/>
							<TextControl
								label="Secret key"
								help="Google secret key"
								value={ secret_key }
								onChange={ ( value ) =>
									setAttributes( { secret_key: value } )
								}
							/>
						</Fragment>
					) : null }
				</PanelBody>

				<PanelBody title="Button" initialOpen={ false }>
					<div className="blpge_inspector_options-set">
						<span className="blpge_inspector_property-title">
							{ __( 'Align' ) }
						</span>
						<ButtonGroup className="blpge_inspector_btn-group">
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						button_align == 'flex-start'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								title="Left"
								onClick={ () => {
									setAttributes( {
										button_align: 'flex-start',
									} );
								} }
							>
								<Dashicon icon="editor-alignleft" />
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						button_align == 'center'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								title="Center"
								onClick={ () => {
									setAttributes( { button_align: 'center' } );
								} }
							>
								<Dashicon icon="editor-aligncenter" />
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						button_align == 'flex-end'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								title="Right"
								onClick={ () => {
									setAttributes( {
										button_align: 'flex-end',
									} );
								} }
							>
								<Dashicon icon="editor-alignright" />
							</Button>
						</ButtonGroup>
					</div>
					<BlpgeSubPanel
						activeCollections={ {
							Typography: { attrb: 'button_typo', excluded: [] },
							Border: { attrb: 'button_border', excluded: [] },
							Background: {
								attrb: 'button_background',
								excluded: [ 'video', 'activeTab' ],
							},
							Spacing: { attrb: 'button_spacing', excluded: [] },
						} }
						{ ...this.props }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
