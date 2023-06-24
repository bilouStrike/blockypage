/**
 * Tabs Block
 *
 * Add Tabs to your post or page
 *
 */
//import "./child-blocks/tabContent/index.js";
// Import styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { blpge_setBlockId } = blpgelib.utilities;
const { ExtraToolBar } = blpgelib.editor;

// Import block dependencies
import Inspector from './components/inspector';
import Tabs from './components/tabs';
import attributes from './components/attributes';
import blockIcon from './components/icon';

// Register Block
registerBlockType( 'blockypage-blocks/tabs', {
	title: __( 'Tabs' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'tabs' ), __( 'blockypage' ) ],
	supports: {
		reusable: false,
		align: [ 'full' ],
	},

	// Define attributes
	attributes: attributes,

	edit( props ) {
		// Generate Unique ID for The Block
		//console.log(props);
		blpge_setBlockId( props );
		return [
			<ExtraToolBar { ...props } />,
			// Include inspector
			<Inspector { ...props } />,
			// Display tabs on the editor
			<Tabs editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// Save tabs
		return <Tabs editor={ false } { ...props } />;
	},
} );
