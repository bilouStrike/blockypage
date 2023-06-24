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

	iconBox_icon: {
		type: 'object',
		default: collectionsObjects.iconPicker,
	},

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
};
