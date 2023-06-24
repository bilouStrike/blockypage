/**
 * select style
 */

// Import wp components
const { Component, Fragment } = wp.element;

export default class BlpgeSelectStyle extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		let stylesMocup = [];
		let stylesList = this.props.activeStyle;
		let stylesListLength = stylesList.length;

		for ( let i = 0; i < stylesListLength; i++ ) {
			stylesMocup.push(
				<div
					className="blpge_select_style__item"
					onClick={ () => this.props.setAttributes( { style: i } ) }
				>
					<span>{ this.props.activeStyle[ i ].icon }</span>
					<span> { this.props.activeStyle[ i ].name } </span>
				</div>
			);
		}

		return (
			<div className="blpge_inspector_select_style">{ stylesMocup }</div>
		);
	}
}
