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

	size: {
		type: 'number',
		default: 1,
	},

	width: {
		type: 'array',
		default: [ 100, null, null, null ],
	},

	widthUnit: {
		type: 'array',
		default: [ '%', '%', '%', '%' ],
	},

	style: {
		type: 'string',
		default: 'solid',
	},

	iconEnable: {
		type: 'boolean',
		default: false,
	},

	color: {
		type: 'string',
		default: '#000000',
	},

	align: {
		type: 'string',
		default: 'center',
	},

	divider_icon: {
		type: 'object',
		default: collectionsObjects.iconPicker,
	},

	typography: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	divider_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
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
