/**
 *
 * Block Container
 *
 * Used to help making blpge css overiding
 *
 */

// Import wp dependencies
const { Component } = wp.element;

export default class BlockContainer extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div className="blpge_block-container">
				<div className="blpge_block-first-wrapper">
					<div className="blpge_block-second-wrapper">
						{ this.props.children }
					</div>
				</div>
			</div>
		);
	}
}
