/**
 *
 * Toolbar Component.
 *
 */

// Import wp dependencies
const { Component, Fragment } = wp.element;
const { BlockControls } = wp.blockEditor;
const { Dropdown } = wp.components;

// Import component dependencies
import RowStyles from './child-components/row-styles/';

export default class ToolBar extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<Fragment>
				<BlockControls>
					<Dropdown
						position="bottom right"
						renderToggle={ ( { onToggle } ) => (
							<div className="components-toolbar">
								<button
									className="components-button components-icon-button components-toolbar__control"
									onClick={ onToggle }
									title="Columns Number"
								>
									<i
										class="fas fa-columns"
										style={ {
											margin: 'auto',
											fontSize: '20px',
										} }
									/>
								</button>
							</div>
						) }
						renderContent={ ( { onToggle } ) => (
							<RowStyles
								{ ...this.props }
								toggle={ onToggle }
								toolbar={ true }
								inspector={ false }
							/>
						) }
					/>
				</BlockControls>
			</Fragment>
		);
	}
}
