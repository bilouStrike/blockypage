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

	style: {
		type: 'number',
		default: 0,
	},

	type: {
		type: 'string',
		default: null,
	},

	name: {
		type: 'string',
		source: 'text',
		selector: '.blpge_team__content__name',
		default: 'Dennis Ritchie',
	},

	role: {
		type: 'string',
		source: 'text',
		selector: '.blpge_team__content__role',
		default: 'Founder And CEO',
	},

	description: {
		type: 'string',
		source: 'text',
		selector: '.blpge_team__content__description',
		default:
			'Description goes here. edit or remove this text, you can also customize it with the options on the sidebar',
	},

	descriptionOpt: {
		type: 'boolean',
		default: true,
	},

	image: {
		type: 'string',
		selector: 'img',
		source: 'attribute',
		attribute: 'src',
		default:
			'https://store.blockypage.com/wp-content/uploads/2019/10/clem-onojeghuo-3.jpg',
	},

	image_border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	imageWidth: {
		type: 'array',
		default: [ null, null, null, null ],
	},

	imageWidthUnit: {
		type: 'array',
		default: [ 'px', 'px', 'px', 'px' ],
	},

	direction: {
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

	shadow: {
		type: 'object',
		default: collectionsObjects.shadow,
	},

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},

	name_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	name_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	role_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	role_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	desc_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	desc_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	content_background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	content_border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	content_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	facebook: {
		type: 'string',
		selector: '.blpge-facebook',
		source: 'attribute',
		attribute: 'href',
		default: 'facebook.com',
	},

	twitter: {
		type: 'string',
		selector: '.blpge-twitter',
		source: 'attribute',
		attribute: 'href',
		default: 'twitter.com',
	},

	linkedin: {
		type: 'string',
		selector: '.blpge-linkedin',
		source: 'attribute',
		attribute: 'href',
		default: 'linkidin.com',
	},

	youtube: {
		type: 'string',
		selector: '.blpge-youtube',
		source: 'attribute',
		attribute: 'href',
		default: null,
	},

	github: {
		type: 'string',
		selector: '.blpge-github',
		source: 'attribute',
		attribute: 'href',
		default: null,
	},

	instagram: {
		type: 'string',
		selector: '.blpge-instagram',
		source: 'attribute',
		attribute: 'href',
		default: 'instagram.com',
	},

	pinterest: {
		type: 'string',
		selector: '.blpge-pinterest',
		source: 'attribute',
		attribute: 'href',
		default: null,
	},

	dribbble: {
		type: 'string',
		selector: '.blpge-dribbble',
		source: 'attribute',
		attribute: 'href',
		default: null,
	},

	behance: {
		type: 'string',
		selector: '.blpge-behance',
		source: 'attribute',
		attribute: 'href',
		default: null,
	},

	flickr: {
		type: 'string',
		selector: '.blpge-flickr',
		source: 'attribute',
		attribute: 'href',
		default: null,
	},

	iconSize: {
		type: 'number',
		default: null,
	},
};
