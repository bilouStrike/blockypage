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
const { IconPicker } = blpgelib.collections;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {},
			setAttributes,
			className,
		} = this.props;

		return (
			<InspectorControls>
				<PanelBody title="Icon" initialOpen={ true }>
					<IconPicker
						iconAttributeName="iconBox_icon"
						{ ...this.props }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
