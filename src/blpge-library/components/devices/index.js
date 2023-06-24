/**
 *
 * Devices component
 *
 * Display Device Icons To set values for different Breakpoints
 *
 */

// Import wp components
const { Component } = wp.element;
const { dispatch, select } = wp.data;

export default class Devices extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const currentDeviceState = select(
			'blockypage-device-state'
		).getDeviceState();
		function changeView( value ) {
			switch ( value ) {
				case 0:
					dispatch( 'blockypage-device-state' ).updateDeviceState(
						'default'
					);
					break;

				case 1:
					dispatch( 'blockypage-device-state' ).updateDeviceState(
						'tablet'
					);
					break;

				case 2:
					dispatch( 'blockypage-device-state' ).updateDeviceState(
						'landscape-mobile'
					);
					break;

				case 3:
					dispatch( 'blockypage-device-state' ).updateDeviceState(
						'portrait-mobile'
					);
					break;

				default:
					break;
			}
		}

		return (
			<div
				className={ `blpge_inspector_device-icons ${ this.props.className }` }
			>
				<span
					className={ `blpge_inspector_device-icons__icon ${
						currentDeviceState == 'default'
							? 'blpge_inspector_device-icons__icon--active'
							: ''
					}` }
					title="Default"
					onClick={ () => {
						this.props.onChange();
						changeView( 0 );
					} }
				>
					<i className="fas fa-desktop" />
				</span>
				<span
					className={ `blpge_inspector_device-icons__icon ${
						currentDeviceState == 'tablet'
							? 'blpge_inspector_device-icons__icon--active'
							: ''
					}` }
					title="Tablets"
					onClick={ () => {
						this.props.onChange();
						changeView( 1 );
					} }
				>
					<i className="fas fa-tablet-alt" />
				</span>
				<span
					className={ `blpge_inspector_device-icons__icon ${
						currentDeviceState == 'landscape-mobile'
							? 'blpge_inspector_device-icons__icon--active'
							: ''
					}` }
					title="Landscape Mobile"
					onClick={ () => {
						this.props.onChange();
						changeView( 2 );
					} }
				>
					<i
						className="fas fa-mobile-alt"
						style={ { transform: 'rotate(90deg)' } }
					/>
				</span>
				<span
					className={ `blpge_inspector_device-icons__icon ${
						currentDeviceState == 'portrait-mobile'
							? 'blpge_inspector_device-icons__icon--active'
							: ''
					}` }
					title="Portrait Mobile"
					onClick={ () => {
						this.props.onChange();
						changeView( 3 );
					} }
				>
					<i className="fas fa-mobile-alt" />
				</span>
			</div>
		);
	}
}
