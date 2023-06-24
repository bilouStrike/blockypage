/**
 * Button group
 */
// Import styles
import './editor.scss';
import './style.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { blpge_setBlockId } = blpgelib.utilities;
const { ExtraToolBar } = blpgelib.editor;

// Import block dependencies
import Inspector from './components/inspector';
import ButtonGroup from './components/buttonGroup';
import attributes from './components/attributes';
import blockIcon from './components/icon';

// Register block
registerBlockType( 'blockypage-blocks/button-group', {
	title: __( 'Button group' ),
	description: __( 'Add button group to your page' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'button' ), __( 'button group' ), __( 'blockypage' ) ],
	supports: {
		reusable: false,
	},

	// Define attributes
	attributes: attributes,
	edit( props ) {
		blpge_setBlockId( props );
		return [
			// Include the extra toolbar
			<ExtraToolBar { ...props } />,

			// Include the inspector
			<Inspector { ...props } />,

			// Include the btn group component
			<ButtonGroup editor={ true } { ...props } />,
		];
	},
	save( props ) {
		return <ButtonGroup editor={ false } { ...props } />;
	},
} );
