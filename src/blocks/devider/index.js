/**
 * Devider Block
 *
 * Adds a devider between blocks
 *
 */

// Import styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Import block dependencies
import Inspector from './components/inspector';
import attributes from './components/attributes';
import Divider from './components/divider';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { blpge_setBlockId } = blpgelib.utilities;
const { ExtraToolBar } = blpgelib.editor;
// Register Block
registerBlockType( 'blockypage-blocks/devider', {
	title: __( 'Divider' ),
	description: __( 'Adds a devider between blocks' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [
		__( 'divider' ),
		__( 'spacer' ),
		__( 'separator' ),
		__( 'blockypage' ),
	],
	supports: {
		reusable: false,
		align: [ 'full' ],
	},

	// Define attributes
	attributes: attributes,

	edit( props ) {
		// Generate Unique ID for The Block
		blpge_setBlockId( props );
		return [
			// include Inspector
			<ExtraToolBar { ...props } />,
			<Inspector { ...props } />,

			// Display Devider on the  editor
			<Divider editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// Save devider
		return <Divider { ...props } />;
	},
} );
