const { Component } = wp.element;
const { Dropdown } = wp.components;
import { SketchPicker } from 'react-color';
import './editor.scss';

export default class BlpgeColorPicker extends Component {
	constructor( props ) {
		super( ...arguments );
	}
	state = {
		displayColorPicker: false,
	};

	handleClick = () => {
		this.setState( {
			displayColorPicker: ! this.state.displayColorPicker,
		} );
	};

	handleClose = () => {
		this.setState( { displayColorPicker: false } );
	};

	render() {
		let self = this;
		let styles = {
			color: {
				width: '25px',
				height: '25px',
				borderRadius: '50%',
				backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%),
                         linear-gradient(-45deg, #ccc 25%, transparent 25%),
                         linear-gradient(45deg, transparent 75%, #ccc 75%),
                         linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
				backgroundSize: '10px 10px',
				backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`,
				background: `${ this.props.color }`,
			},

			swatch: {
				padding: '3px',
				background: '#fff',
				borderRadius: '50%',
				boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
				display: 'inline-block',
				cursor: 'pointer',
			},
		};

		return (
			<div>
				<Dropdown
					position="bottom left"
					renderToggle={ ( { onToggle } ) => (
						<div>
							<div style={ styles.swatch } onClick={ onToggle }>
								<div
									style={ styles.color }
									ref={ ( ele ) => {
										self._ele = ele;
									} }
								/>
							</div>
							<div
								className="blpge_inspector_clear_btn--right"
								style={ { marginLeft: '8px' } }
								onClick={ () => {
									this.props.onChange( { hex: null } );
									self._ele.style.background = `linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%)`;
									self._ele.style.backgroundSize =
										'10px 10px';
									self._ele.style.backgroundPosition = `0 0, 0 10px, 10px -10px, -10px 0px`;
								} }
							>
								<i className="fa fa-undo" />
							</div>
						</div>
					) }
					renderContent={ ( { onToggle } ) => (
						<SketchPicker
							color={ this.props.color ? this.props.color : {} }
							onChangeComplete={ this.props.onChange }
							disableAlpha={ false }
							className="blpge_color_picker"
						/>
					) }
				/>
			</div>
		);
	}
}
