/**
 *
 * Shape Selector
 * Select SVG Shape
 *
 */

// Import CSS
import './editor.scss';

// Import wp components
const { Component, cloneElement } = wp.element;
const { Dropdown } = wp.components;

// import component dependencies
import shapes from './shapes';

export default class shapeSelector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const self = this;
		let newShapes = [];
		for ( const shape of shapes ) {
			const clonedElementWithMoreProps = cloneElement( shape, {
				onClick: ( ev ) => updateShapeAttribute( ev ),
			} );
			newShapes.push( clonedElementWithMoreProps );
		}

		// Get shapeDivider attribute name
		const attribute = this.props.attributeName;
		const { setAttributes } = this.props;

		// Get shapeDivider object
		let ShapeDivider = JSON.parse(
			JSON.stringify( this.props.attributes[ attribute ] )
		);

		// Update shape attribute
		function updateShapeAttribute( ev ) {
			ShapeDivider[ self.props.position ][ 'shape' ] = ev.target.id;
			let newShapeDividerObject = {};
			newShapeDividerObject[ attribute ] = ShapeDivider;
			setAttributes( newShapeDividerObject );
			console.log( newShapeDividerObject );
		}

		return (
			<div className="blpge_inspector_shape-selector">
				<Dropdown
					position="bottom center"
					renderToggle={ ( { onToggle } ) => (
						<div className="components-toolbar">
							<button
								className="components-button components-icon-button components-toolbar__control blpge_inspector_shapes-selector-button"
								onClick={ onToggle }
								title="Columns Number"
							>
								{
									shapes[
										ShapeDivider[ self.props.position ]
											.shape
									]
								}

								<i
									class="fas fa-sort-down"
									style={ {
										margin: 'auto',
										fontSize: '20px',
									} }
								/>
							</button>
						</div>
					) }
					renderContent={ ( { onToggle } ) => (
						<div className="blpge_inspector_shapes-selector-container">
							{ newShapes }
						</div>
					) }
				/>
			</div>
		);
	}
}
