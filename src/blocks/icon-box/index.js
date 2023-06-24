/**
 * Icon box Block
 */

// Import Styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Import block dependencies
import attributes from './components/attributes';
import IconBox from './components/iconBox';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Register Block
registerBlockType( 'blockypage-blocks/iconbox', {
	title: __( 'Icon Box' ),
	description: __( 'Advanced Icon Box block' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'IconBox' ), __( 'icon' ), __( 'blockypage' ) ],
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
			<IconBox editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// Save container
		return <IconBox { ...props } />;
	},
} );
