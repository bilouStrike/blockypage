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

	gutterClassName: {
		type: 'string',
		default: null,
	},

	rowLayout: {
		type: 'string',
		default: '1',
	},

	brp_rowLayout: {
		type: 'array',
		default: [ null, null, null ],
	},

	// Width
	width: {
		type: 'array',
		default: [ null, null, null, null ],
	},

	widthUnit: {
		type: 'array',
		default: [ 'px', 'px', 'px', 'px' ],
	},

	// Min Height
	minHeight: {
		type: 'number',
		default: [ null, null, null, null ],
	},

	minHeightUnit: {
		type: 'array',
		default: [ 'px', 'px', 'px', 'px' ],
	},

	displayStyles: {
		type: 'boolean',
		default: true,
	},

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},

	background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	overlay: {
		type: 'object',
		default: collectionsObjects.overlay,
	},

	border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	shadow: {
		type: 'object',
		default: collectionsObjects.shadow,
	},

	typography: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},
};
