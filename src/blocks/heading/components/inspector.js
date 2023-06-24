/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl, ButtonGroup, Button } = wp.components;

// Import blockypage dependencies
const { Spacing, Background, Border, Typography } = blpgelib.collections;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: { headingTag },
			setAttributes,
			className,
		} = this.props;

		return (
			<InspectorControls>
				<PanelBody title="Typography" initialOpen={ true }>
					<div className="blpge_inspector_options-set">
						{ /* Heading Tag */ }
						<span className="blpge_inspector_property-title">
							{ ' ' }
							{ __( 'Heading Tag' ) }{ ' ' }
						</span>
						<ButtonGroup className="blpge_inspector_btn-group">
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						headingTag == 'H1'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								onClick={ () =>
									setAttributes( { headingTag: 'H1' } )
								}
							>
								H1
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						headingTag == 'H2'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								onClick={ () =>
									setAttributes( { headingTag: 'H2' } )
								}
							>
								H2
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						headingTag == 'H3'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								onClick={ () =>
									setAttributes( { headingTag: 'H3' } )
								}
							>
								H3
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						headingTag == 'H4'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								onClick={ () =>
									setAttributes( { headingTag: 'H4' } )
								}
							>
								H4
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						headingTag == 'H5'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								onClick={ () =>
									setAttributes( { headingTag: 'H5' } )
								}
							>
								H5
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                    ${
						headingTag == 'H6'
							? 'blpge_inspector_btn-group__btn--active'
							: ''
					} ` }
								onClick={ () =>
									setAttributes( { headingTag: 'H6' } )
								}
							>
								H6
							</Button>
						</ButtonGroup>
					</div>

					<Typography
						attributeName="typography"
						textAttribute="headingContent"
						{ ...this.props }
					/>
				</PanelBody>
				{ /* Background Settings */ }
				<PanelBody
					title="Background"
					initialOpen={ false }
					className="blpge_inspector"
				>
					<Background
						attributeName="background"
						exclude={ [ 'video' ] }
						{ ...this.props }
					/>
				</PanelBody>

				{ /* Spacing */ }
				<PanelBody title="Spacing" initialOpen={ false }>
					<Spacing attributeName="spacing" { ...this.props } />
				</PanelBody>

				{ /* Border Settings */ }
				<PanelBody title="Border" initialOpen={ false }>
					<Border attributeName="border" { ...this.props } />
				</PanelBody>
			</InspectorControls>
		);
	}
}
