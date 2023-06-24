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

	align: {
		type: 'string',
		default: 'full',
	},

	containerType: {
		type: 'string',
		default: 'full-width',
	},

	innerMaxWidth: {
		type: 'number',
	},

	innerMaxWidthUnit: {
		type: 'string',
		default: 'px',
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
		type: 'array',
		default: [ null, null, null, null ],
	},

	minHeightUnit: {
		type: 'array',
		default: [ 'px', 'px', 'px', 'px' ],
	},

	// HTML tag
	htmlTag: {
		type: 'string',
		default: 'div',
	},

	// Collections
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

	shapeDivider: {
		type: 'object',
		default: collectionsObjects.shapeDivider,
	},
};
