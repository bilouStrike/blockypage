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

	title: {
		type: 'string',
		source: 'html',
		selector: '.blpge_calltoaction__title',
		default: 'Join Our Community Now!',
	},

	text: {
		type: 'string',
		source: 'html',
		selector: '.blpge_calltoaction__text',
		default:
			'Morbi aliquet, magna vel convallis cursus, leo enim rhoncus dolor, non fringilla orci turpis vitae libero. Etiam a dui est. Nunc tempus placerat arcu molestie viverra. Mauris in lacus eu felis dictum blandit sed eu augue.',
	},

	layout: {
		type: 'number',
		default: 1,
	},

	imageEnable: {
		type: 'boolean',
		default: null,
	},

	image: {
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

	title_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	title_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	text_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	text_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
};
