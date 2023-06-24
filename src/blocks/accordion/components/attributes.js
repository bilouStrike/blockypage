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

	subBlock: {
		type: 'string',
		default: 'general',
	},

	spacing: {
		type: 'string',
		default: collectionsObjects.spacing,
	},

	icon: {
		type: 'string',
		default: 'fas fa-plus',
	},

	rtl: {
		type: 'boolean',
		default: false,
	},

	accordion_icon: {
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

	iconPosition: {
		type: 'string',
		default: 'right',
	},

	width: {
		type: 'array',
		default: [ null, null, null, null ],
	},

	widthUnit: {
		type: 'array',
		default: [ 'px', 'px', 'px', 'px' ],
	},

	iconSize: {
		type: 'number',
		default: 18,
	},

	accordianElements: {
		type: 'array',
		default: [],
	},

	accordionTitleBackground: {
		type: 'object',
		default: collectionsObjects.background,
	},

	accordionTitleTypo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	accordionTitleSpacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	accordionTitleBorder: {
		type: 'object',
		default: collectionsObjects.border,
	},

	accordionContentBackground: {
		type: 'object',
		default: collectionsObjects.background,
	},

	accordionContentBorder: {
		type: 'object',
		default: collectionsObjects.border,
	},

	accordionContentSpacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	accordionContentTypo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
};
