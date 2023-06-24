/**
 * Call to action Block
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
import CallToAction from './components/callToAction';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Register Block
registerBlockType( 'blockypage-blocks/calltoaction', {
	title: __( 'Call To Action' ),
	description: __( 'Call To Action block' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'call to action' ), __( 'blockypage' ) ],
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
			<CallToAction editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// Save container
		return <CallToAction editor={ false } { ...props } />;
	},
} );
