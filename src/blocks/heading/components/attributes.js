/**
 * Set the block attributes
 * @type {Object}
 */
const { collectionsObjects } = blpgelib.helpers;
export default {
	id: {
		type: 'string',
		default: null,
	},

	text: {
		type: 'string',
		default: 'text here',
	},

	headingTag: {
		type: 'string',
		default: 'h3',
	},

	headingContent: {
		type: 'string',
		source: 'html',
		selector: '.blpge_heading--block',
		default: 'Blockypage - Page-Building Gutenberg Blocks',
	},

	containerType: {
		type: 'string',
		default: 'full-width',
	},

	containerId: {
		type: 'number',
		default: 0,
	},

	width: {
		type: 'number',
		default: null,
	},

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

	typography: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
};
