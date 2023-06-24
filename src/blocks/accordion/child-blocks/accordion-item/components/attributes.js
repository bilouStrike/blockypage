/**
 * Set the block attributes
 * @type {Object}
 */
const { collectionsObjects } = blpgelib.helpers;
export default {
	id: {
		type: 'string',
	},

	title: {
		type: 'string',
		source: 'text',
		selector: '.blpge_according__items__link__title',
		default: 'Accordion Title',
	},

	icon: {
		type: 'array',
		default: null,
	},

	accordion_icon: {
		type: 'object',
		default: collectionsObjects.iconPicker,
	},

	parentBlock: {
		type: 'string',
	},

	tabBackground: {
		type: 'object',
		default: collectionsObjects.background,
	},

	tabTypography: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	tabSpacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	tabBorder: {
		type: 'object',
		default: collectionsObjects.border,
	},

	contentBackground: {
		type: 'object',
		default: collectionsObjects.background,
	},

	contentBorder: {
		type: 'object',
		default: collectionsObjects.border,
	},

	contentSpacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	contentTypo: {
		type: 'object',
		default: collectionsObjects.typography,
	},
};
