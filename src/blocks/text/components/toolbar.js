/**
 *
 * Toolbar Component.
 *
 */

// Import wp dependencies
const { Component, Fragment } = wp.element;
const { BlockControls } = wp.blockEditor;
const { Dropdown } = wp.components;
const { Typography } = blpgelib.collections;

export default class ToolBar extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<Fragment>
				<BlockControls>
					<Dropdown
						position="bottom left"
						renderToggle={ ( { onToggle } ) => (
							<div className="components-toolbar">
								<button
									className="components-button components-icon-button components-toolbar__control"
									onClick={ onToggle }
									title="Columns Number"
								>
									<i
										class="fas fa-font"
										style={ {
											margin: 'auto',
											fontSize: '20px',
										} }
									/>
								</button>
							</div>
						) }
						renderContent={ ( { onToggle, isOpen } ) => {} }
					/>
				</BlockControls>
			</Fragment>
		);
	}
}
