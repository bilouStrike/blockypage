// Importing CSS
import './editor.scss';
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

// Block Registeration
registerBlockType( 'blockypage-blocks/blank', {
	title: __( 'blank' ),

	description: __( ' plus icon to add on layout blocks' ),

	category: 'BlockyPage',

	supports: {
		inserter: false,
		reusable: false,
		html: false,
	},

	attributes: {},

	edit() {
		return null;
	},

	save() {
		return null;
	},
} );
