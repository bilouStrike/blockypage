// Import blpge dependencies
const { collectionsObjects } = blpgelib.helpers;

/**
 * Set the block attributes
 * @type {Object}
 */

export default {
	id: {
		type: 'string',
		default: null,
	},

	order: {
		type: 'array',
		default: [ null, null, null, null ],
	},

	columnSize: {
		type: 'string',
		default: '12',
	},

	brp_columnSize: {
		type: 'array',
		default: [ null, null, null ],
	},

	verticalAlign: {
		type: 'string',
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

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},

	overlay: {
		type: 'object',
		default: collectionsObjects.overlay,
	},

	shadow: {
		type: 'object',
		default: collectionsObjects.shadow,
	},

	typography: {
		type: 'object',
		default: collectionsObjects.typography,
	},
};
