/**
 *
 * tabContent Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;

export default class TabContent extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const { className } = this.props;

		return (
			<div
				className={ `${ className } blpge_tabs__contents__tab-content` }
			>
				{ this.props.children }
			</div>
		);
	}
}
