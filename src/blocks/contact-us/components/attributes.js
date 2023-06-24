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

	recaptcha: {
		type: 'boolean',
		default: false,
	},

	error_message: {
		type: 'string',
		default: 'Failed to send! fill the form and try again',
	},

	success_message: {
		type: 'string',
		default: 'Your message has been sent successfully',
	},

	site_key: {
		type: 'string',
		default: 'fdsf',
	},

	secret_key: {
		type: 'string',
		default: null,
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

	label_typography: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	button_text: {
		type: 'string',
		default: 'Submit',
	},

	button_align: {
		type: 'string',
		default: null,
	},

	button_background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	button_border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	button_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	button_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	input_border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
};
