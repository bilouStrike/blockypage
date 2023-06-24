/**
 *
 * Toolbar Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blockEditor;

export default class Toolbar extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: { align },
			setAttributes,
		} = this.props;

		return (
			<BlockControls>
				<AlignmentToolbar
					value={ align }
					onChange={ ( value ) =>
						setAttributes( {
							align: value,
						} )
					}
				/>
			</BlockControls>
		);
	}
}
