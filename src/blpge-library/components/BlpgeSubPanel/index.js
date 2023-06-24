/**
 *
 * SubPanel component
 *
 * Nested panel
 *
 */

// Import wp components
const { Component, Fragment } = wp.element;
const { Dropdown } = wp.components;

import Spacing from '../../collections/spacing';
import Background from '../../collections/background';
import Border from '../../collections/border';
import Shadow from '../../collections/shadow';
import Animation from '../../collections/animation';
import ShapeDivider from '../../collections/shapeDivider';
import Overlay from '../../collections/overlay';
import Typography from '../../collections/typography';

export default class BlpgeSubPanel extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		let propsInstance = this.props;
		let currentCollection = { ...this.props.activeCollections };
		let panel_tabs = [];
		let panel_content = [];
		const collectionsIcons = {
			Background: 'fas fa-paint-brush',
			Spacing: 'fas fa-arrows-alt-v',
			Typography: 'fas fa-text-height',
			Border: 'far fa-square',
			Animation: 'fas fa-square',
			Shadow: 'fas fa-clone',
			Overlay: 'fas fa-clone',
		};
		Object.keys( currentCollection ).forEach( function ( name ) {
			const { attrb, excluded, autoMargin } = currentCollection[ name ];
			let fullTab =
				panel_tabs.length == 0 &&
				Object.keys( currentCollection ).length % 2 != 0
					? true
					: false;
			var dropDownContent;
			switch ( name ) {
				case 'Background':
					dropDownContent = (
						<Background
							attributeName={ attrb }
							{ ...propsInstance }
							exclude={ excluded }
							isDropDown={ true }
						/>
					);
					break;
				case 'Border':
					dropDownContent = (
						<Border
							attributeName={ attrb }
							{ ...propsInstance }
							exclude={ excluded }
							isDropDown={ true }
						/>
					);
					break;
				case 'Spacing':
					dropDownContent = (
						<Spacing
							attributeName={ attrb }
							{ ...propsInstance }
							exclude={ excluded }
							isDropDown={ true }
						/>
					);
					break;
				case 'Typography':
					dropDownContent = (
						<Typography
							attributeName={ attrb }
							{ ...propsInstance }
							exclude={ excluded }
							isDropDown={ true }
						/>
					);
					break;
				case 'Shadow':
					dropDownContent = (
						<Shadow
							attributeName={ attrb }
							{ ...propsInstance }
							exclude={ excluded }
							isDropDown={ true }
						/>
					);
					break;
				default:
					console.log( 'No collection' );
			}
			panel_content.push(
				<div className="blpge_row blpge_row--no-padding-col">
					<div
						className="blpge_row__col--10"
						style={ { display: 'flex', alignItems: 'center' } }
					>
						{ name }
					</div>
					<div className="blpge_row__col--2">
						<Dropdown
							position="left left"
							renderToggle={ ( { onToggle } ) => (
								<div>
									<button
										className="components-button components-icon-button components-toolbar__control"
										onClick={ onToggle }
									>
										<i
											class="far fa-sun"
											style={ {
												margin: 'auto',
												fontSize: '20px',
											} }
										/>
									</button>
								</div>
							) }
							renderContent={ ( { onToggle } ) =>
								dropDownContent
							}
						/>
					</div>
				</div>
			);
		} );
		return <Fragment>{ panel_content }</Fragment>;
	}
}
