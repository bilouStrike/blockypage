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

	apikey: {
		type: 'string',
		default: null,
	},

	address: {
		type: 'string',
		default: null,
	},

	zoom: {
		type: 'number',
		default: 3,
	},

	zoomControl: {
		type: 'boolean',
		default: true,
	},

	mapTypeControl: {
		type: 'boolean',
		default: true,
	},

	scaleControl: {
		type: 'boolean',
		default: true,
	},

	streetViewControl: {
		type: 'boolean',
		default: true,
	},

	rotateControl: {
		type: 'boolean',
		default: true,
	},

	fullscreenControl: {
		type: 'boolean',
		default: true,
	},

	minHeight: {
		type: 'array',
		default: [ null, null, null, null ],
	},

	minHeightUnit: {
		type: 'array',
		default: [ 'px', 'px', 'px', 'px' ],
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
