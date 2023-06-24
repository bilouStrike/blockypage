/**
 *
 * CSS units component
 *
 * Display CSS units for a property
 *
 */

// Import wp components
const { Component } = wp.element;
const { Button, ButtonGroup } = wp.components;

export default class CssUnits extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	static defaultProps = {
		units: [ 'px', '%', 'em' ],
	};

	render() {
		if ( ! this.props.attribute ) {
			console.error( ' CssUnits Requires an attribute name! ' );
			return;
		}

		let buttons = [];
		this.props.units.forEach( ( unit ) => {
			buttons.push(
				<Button
					className={ `blpge_inspector_css-units__unit ${
						this.props.attribute == unit
							? 'blpge_inspector_css-units__unit--active'
							: ''
					}` }
					onClick={ () => {
						this.props.onChange( unit );
					} }
				>
					{ unit }
				</Button>
			);
		} );

		return (
			<ButtonGroup className="blpge_inspector_css-units">
				{ buttons }
			</ButtonGroup>
		);
	}
}
