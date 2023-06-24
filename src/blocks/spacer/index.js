/**
 * Spacer Block
 *
 * Adds a blank space between blocks
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
import Spacer from './components/spacer';
import attributes from './components/attributes';
import blockIcon from './components/icon';

// Import blpge dependencies
const { blpge_setBlockId } = blpgelib.utilities;
const { ExtraToolBar } = blpgelib.editor;

// Register Block
registerBlockType( 'blockypage-blocks/spacer', {
	title: __( 'Spacer' ),
	description: __( 'Adds a space between blocks, values are in pixels' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [
		__( 'spacer' ),
		__( 'divider' ),
		__( 'separator' ),
		__( 'blockypage' ),
	],
	supports: {
		reusable: false,
		align: [ 'full' ],
	},

	// Defining The Attributes
	attributes: attributes,

	edit( props ) {
		// Generate Unique id
		blpge_setBlockId( props );

		return [
			<ExtraToolBar { ...props } />,
			// Include Inspector
			<Inspector { ...props } />,

			// Display Spacer on the editor
			<Spacer editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// Save Spacer
		return <Spacer editor={ false } { ...props } />;
	},
} );
