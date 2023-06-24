/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody } = wp.components;

// Import blockypage dependencies
const { Spacing, Background, Typography, Border } = blpgelib.collections;
const { SubBlockInspector } = blpgelib.components;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: { buttonEnable },
			setAttributes,
			className,
		} = this.props;

		return (
			<InspectorControls>
				<SubBlockInspector { ...this.props } name="general">
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
				</SubBlockInspector>

				<SubBlockInspector { ...this.props } name="title">
					<PanelBody title="Typography" initialOpen={ true }>
						<Typography
							attributeName="title_typo"
							textAttribute="title"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="title_spacing"
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>

				<SubBlockInspector { ...this.props } name="description">
					<PanelBody title="Typography" initialOpen={ true }>
						<Typography
							attributeName="text_typo"
							textAttribute="text"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="text_spacing"
							{ ...this.props }
						/>
					</PanelBody>
				</SubBlockInspector>
			</InspectorControls>
		);
	}
}
