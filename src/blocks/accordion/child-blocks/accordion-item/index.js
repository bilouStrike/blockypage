/**
 *
 * Single accordion component.
 *
 */

// Import Style
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;
const { registerBlockType } = wp.blocks;

import attributes from './components/attributes';
import Inspector from './components/inspector';
import AccordionItem from './components/accordionItem';

// Register Block
registerBlockType( 'blockypage-blocks/accordion-item', {
	title: __( 'Accordion-item' ),

	parent: [ 'blockypage-blocks/accordion' ],

	description: __( 'A single accordion item within an accordion block.' ),

	category: 'BlockyPage',

	supports: {
		inserter: false,
		reusable: false,
		html: true,
	},

	attributes: attributes,

	edit( props ) {
		// Set Unique Block ID
		blpge_setBlockId( props );

		// Return Function
		return [
			// Include Extra ToolBar
			<ExtraToolBar { ...props } gray={ true } small={ true } />,

			// Include Inspector
			<Inspector { ...props } />,

			// Display Container on the editor
			<AccordionItem editor={ true } { ...props } />,
		];
	},

	save( props ) {
		return <AccordionItem editor={ false } { ...props } />;
	},
} );
