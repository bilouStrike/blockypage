/**
 * Text Block
 */

// Import Styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;

// Import block dependencies
import attributes from './components/attributes';
import Counter from './components/counter';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Register Block
registerBlockType( 'blockypage-blocks/counter', {
	title: __( 'Counter' ),
	description: __( 'Advanced counter block' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'counter' ), __( 'blockypage' ) ],
	supports: {
		reusable: false,
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
			<Counter editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// Save container
		return <Counter editor={ false } { ...props } />;
	},
} );
