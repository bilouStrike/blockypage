/**
 * Contact us Block
 */

// Import Styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Import block dependencies
import attributes from './components/attributes';
import ContactUs from './components/contact';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Register Block
registerBlockType( 'blockypage-blocks/contact', {
	title: __( 'Contact Form' ),
	description: __( 'Advanced contact form' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [
		__( 'contact' ),
		__( 'message' ),
		__( 'form' ),
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
			<ExtraToolBar { ...props } />,
			// Include Inspector
			<Inspector { ...props } />,

			// Display Container on the editor
			<ContactUs editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// Save container
		return <ContactUs editor={ false } { ...props } />;
	},
} );
