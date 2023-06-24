/**
 * Text Block
 */

// Import Styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Import block dependencies
import attributes from './components/attributes';
import Image from './components/image';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Register Block
registerBlockType( 'blockypage-blocks/image', {
	title: __( 'Advanced Image' ),
	description: __( 'Image block' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [
		__( 'image' ),
		__( 'picture' ),
		__( 'photo' ),
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

		// Return Function
		return [
			<ExtraToolBar { ...props } />,
			// Include Inspector
			<Inspector { ...props } />,

			// Display Container on the editor
			<Image editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// Save container
		return <Image editor={ false } { ...props } />;
	},
} );
