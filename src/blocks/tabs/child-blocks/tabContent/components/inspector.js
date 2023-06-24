/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { InspectorControls } = wp.blockEditor;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return <InspectorControls></InspectorControls>;
	}
}
