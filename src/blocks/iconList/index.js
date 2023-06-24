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
import IconList from './components/iconList';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Register Block
registerBlockType( 'blockypage-blocks/iconlist', {
	title: __( 'Advanced List' ),
	description: __( 'Icon list block' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'list' ), __( 'icon' ), __( 'blockypage' ) ],
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
			<IconList editor={ true } { ...props } />,
		];
	},
	save( props ) {
		return <IconList editor={ false } { ...props } />;
	},
} );
