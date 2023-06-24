/**
 *
 * Color Square
 *
 */
// Import CSS
import './editor.scss';

// Import wp components
const { Component } = wp.element;

export default class Devices extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<span
				className="blpge_inspector_color-square"
				style={
					this.props.color
						? {
								display: 'inline-block',
								background: this.props.color,
						  }
						: null
				}
			/>
		);
	}
}
