/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl, RangeControl } = wp.components;

// Import blockypage dependencies
const { Spacing, Background, Border, Typography } = blpgelib.collections;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: { containerType },
			setAttributes,
			className,
		} = this.props;

		return (
			<InspectorControls>
				{ /* Typography Settings */ }
				<PanelBody title="Typography" initialOpen={ true }>
					<Typography
						attributeName="typography"
						textAttribute="text"
						{ ...this.props }
					/>
				</PanelBody>

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
