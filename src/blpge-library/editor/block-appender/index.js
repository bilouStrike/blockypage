/**
 *
 * Block Appender
 *
 */
// Import Style
import './editor.scss';

// Import wp dependencies
const { Component } = wp.element;
const { Inserter } = wp.blockEditor;

export default class BlockAppender extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div className="blpge_editor_appender">
				<Inserter
					isAppender={ true }
					rootClientId={ this.props.clientId }
				/>
			</div>
		);
	}
}
