/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, Button, ButtonGroup, Dashicon } = wp.components;

// Import blpge dependencies
const { Spacing } = blpgelib.collections;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: { align },
			setAttributes,
		} = this.props;

		return (
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<div className="blpge_inspector_options-set">
						<span className="blpge_inspector_property-title">
							{ __( 'Buttons align' ) }
						</span>
						<ButtonGroup className="blpge_inspector_btn-group">
							<Button
								className={ `blpge_inspector_btn-group__btn
                ${
					align == 'flex-start'
						? 'blpge_inspector_btn-group__btn--active'
						: ''
				} ` }
								title="Left"
								onClick={ () => {
									setAttributes( { align: 'flex-start' } );
								} }
							>
								<Dashicon icon="editor-alignleft" />
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                ${
					align == 'center'
						? 'blpge_inspector_btn-group__btn--active'
						: ''
				} ` }
								title="Left"
								onClick={ () => {
									setAttributes( { align: 'center' } );
								} }
							>
								<Dashicon icon="editor-aligncenter" />
							</Button>
							<Button
								className={ `blpge_inspector_btn-group__btn
                ${
					align == 'flex-end'
						? 'blpge_inspector_btn-group__btn--active'
						: ''
				} ` }
								title="Left"
								onClick={ () => {
									setAttributes( { align: 'flex-end' } );
								} }
							>
								<Dashicon icon="editor-alignright" />
							</Button>
						</ButtonGroup>
					</div>
				</PanelBody>
				<PanelBody title="Spacing" initialOpen={ false }>
					<Spacing attributeName="spacing" { ...this.props } />
				</PanelBody>
			</InspectorControls>
		);
	}
}
