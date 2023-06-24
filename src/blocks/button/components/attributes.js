/**
 * Set the block attributes
 * @type {Object}
 */

// Import blpge dependencies
const { collectionsObjects } = blpgelib.helpers;

export default {
	id: {
		type: 'string',
		default: null,
	},

	text: {
		type: 'string',
		source: 'html',
		selector: 'span',
		default: 'Button',
	},

	url: {
		type: 'string',
	},

	linkBlank: {
		type: 'boolean',
		default: false,
	},

	linkNoFollow: {
		type: 'boolean',
		default: false,
	},

	size: {
		type: 'string',
		default: 'medium',
	},

	align: {
		type: 'string',
		default: 'center',
	},

	iconAlign: {
		type: 'string',
		default: '2',
	},

	iconEnable: {
		type: 'boolean',
		default: false,
	},

	// Collections
	background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	shadow: {
		type: 'object',
		default: collectionsObjects.shadow,
	},

	typography: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},

	btn_icon: {
		type: 'object',
		default: collectionsObjects.iconPicker,
	},

	icon_typography: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	icon_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	icon_background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	icon_border: {
		type: 'object',
		default: collectionsObjects.border,
	},
};
