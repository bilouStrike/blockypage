/**
 * Sub Block Inspector
 */

import './editor.scss';
// Import wp dependencies
const { Component, Fragment } = wp.element;

export default class SubBlockInspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const { subBlock } = this.props.attributes;
		const returnedMarkup =
			subBlock == this.props.name ? (
				<Fragment>
					{ subBlock != 'general' ? (
						<div className="blpge_inspector_sub-block-selector blpge_fade_in">
							<span className="blpge_inspector_sub-block-selector__title">
								Element
							</span>
							<span className="blpge_inspector_sub-block-selector__selector">
								{ subBlock.charAt( 0 ).toUpperCase() +
									subBlock.slice( 1 ) }
							</span>
						</div>
					) : (
						<Fragment></Fragment>
					) }
					<div className="blpge_fade_in">{ this.props.children }</div>
				</Fragment>
			) : (
				<Fragment></Fragment>
			);
		return returnedMarkup;
	}
}
