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

	imageBlockUrl: {
		type: 'string',
		selector: 'img',
		source: 'attribute',
		attribute: 'src',
		default: null,
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
	height: {
		type: 'array',
		default: [ null, null, null, null ],
	},

	heightUnit: {
		type: 'array',
		default: [ 'px', 'px', 'px', 'px' ],
	},

	imageBlockCaption: {
		type: 'string',
		source: 'text',
		selector: 'figcaption',
		default: 'Image caption',
	},

	showCaption: {
		type: 'boolean',
		default: true,
	},

	imageBlockAlt: {
		type: 'string',
		selector: 'img',
		source: 'attribute',
		attribute: 'alt',
		default: 'Image alt',
	},

	imgAlign: {
		type: 'string',
		default: null,
	},

	containerType: {
		type: 'string',
		default: 'full-width',
	},

	containerId: {
		type: 'number',
		default: 0,
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

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
};
