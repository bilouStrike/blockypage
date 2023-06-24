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

	subBlock: {
		type: 'string',
		default: 'general',
	},

	type: {
		type: 'string',
		default: null,
	},

	text: {
		type: 'string',
		default: null,
	},

	number: {
		type: 'number',
		source: 'html',
		selector: '.blpge_counter__wrapper__number',
		default: 500,
	},

	sign: {
		type: 'string',
		source: 'html',
		selector: '.blpge_counter__wrapper__sign',
		default: '+',
	},

	signEnable: {
		type: 'boolean',
		default: true,
	},

	text: {
		type: 'string',
		source: 'html',
		selector: '.blpge_counter__text',
		default: 'Active installation',
	},

	textEnable: {
		type: 'boolean',
		default: true,
	},

	min_width: {
		type: 'number',
		default: null,
	},

	duration: {
		type: 'number',
		default: 5000,
	},

	count_start: {
		type: 'number',
		default: 1,
	},

	number_background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	number_border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	number_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	number_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	text_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	text_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	sign_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	sign_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
};
