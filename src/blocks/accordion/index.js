/**
 * Accordion
 *
 * Add styled accordion to your page
 *
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
import Accordion from './components/accordion';
import attributes from './components/attributes';
import blockIcon from './components/icon';

// Register block
registerBlockType( 'blockypage-blocks/accordion', {
	title: __( 'Accordion' ),
	description: __( 'Add styled accordion to your page' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'accordion' ), __( 'blockypage' ) ],
	supports: {
		reusable: false,
		align: [ 'full' ],
	},

	// Define attributes
	attributes: attributes,
	edit( props ) {
		blpge_setBlockId( props );
		return [
			// Include Extra ToolBar
			<ExtraToolBar { ...props } />,
			// Include Inspector
			<Inspector { ...props } />,

			// Display Accordion on the editor
			<Accordion editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// save Accordion
		return <Accordion editor={ false } { ...props } />;
	},
} );
