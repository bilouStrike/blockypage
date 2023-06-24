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

	type: {
		type: 'string',
		default: null,
	},

	url: {
		type: 'string',
		selector: '.youtube-link',
		source: 'attribute',
		attribute: 'videosrc',
		default: null,
	},

	// Height
	height: {
		type: 'array',
		default: [ null, null, null, null ],
	},

	heightUnit: {
		type: 'array',
		default: [ 'px', 'px', 'px', 'px' ],
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

	video_cover_overlay: {
		type: 'object',
		default: collectionsObjects.overlay,
	},

	video_icon: {
		type: 'object',
		default: collectionsObjects.iconPicker,
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

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
};
