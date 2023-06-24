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

	style: {
		type: 'number',
		default: null,
	},

	align: {
		type: 'string',
		default: null,
	},

	title: {
		type: 'string',
		source: 'html',
		selector: '.blpge_infoBox__title',
		default: 'Your Title Goes Here',
	},

	information: {
		type: 'string',
		source: 'html',
		selector: '.blpge_infoBox__information',
		default:
			'Your content goes here. edit or remove this text, you can also customize it with the options on the sidebar',
	},

	image: {
		type: 'string',
		default: null,
	},

	imageWidth: {
		type: 'array',
		default: [ null, null, null, null ],
	},

	imageWidthUnit: {
		type: 'array',
		default: [ 'px', 'px', 'px', 'px' ],
	},

	customIcon: {
		type: 'boolean',
		default: false,
	},

	button: {
		type: 'boolean',
		default: false,
	},

	image_border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	enabled_icon: {
		type: 'boolean',
		default: true,
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

	infoBox_icon: {
		type: 'object',
		default: collectionsObjects.iconPicker,
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

	titleTypo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	titleSpacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	informationTypo: {
		type: 'object',
		default: collectionsObjects.typography,
	},
	informationSpacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
};
