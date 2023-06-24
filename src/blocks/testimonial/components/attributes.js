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

	layout: {
		type: 'number',
		default: null,
	},

	topIcon: {
		type: 'number',
		default: null,
	},

	iconWidth: {
		type: 'string',
		default: null,
	},

	iconColor: {
		type: 'string',
		default: null,
	},

	topIconAlign: {
		type: 'string',
		default: null,
	},

	topIconY: {
		type: 'boolean',
		default: false,
	},

	topIconX: {
		type: 'boolean',
		default: false,
	},

	bottomIcon: {
		type: 'number',
		default: null,
	},

	bottomIconAlign: {
		type: 'string',
		default: null,
	},

	bottomIconX: {
		type: 'boolean',
		default: false,
	},

	bottomIconY: {
		type: 'boolean',
		default: false,
	},

	message: {
		type: 'string',
		source: 'html',
		selector: '.blpge_testimonial__message',
		default:
			'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save. Thanks, guys!',
	},

	avatar: {
		type: 'string',
		selector: 'img',
		source: 'attribute',
		attribute: 'src',
		default:
			'https://store.blockypage.com/wp-content/uploads/2019/10/testimonials-3.jpg',
	},

	avatarEnabled: {
		type: 'boolean',
		default: false,
	},

	avatarWidth: {
		type: 'array',
		default: [ null, null, null, null ],
	},

	avatarWidthUnit: {
		type: 'array',
		default: [ 'px', 'px', 'px', 'px' ],
	},

	name: {
		type: 'string',
		source: 'html',
		selector: '.blpge_testimonial__details__info__name',
		default: 'John T. Thiessen',
	},

	job: {
		type: 'string',
		source: 'html',
		selector: '.blpge_testimonial__details__info__job',
		default: 'Marketing Manager',
	},

	jobEnabled: {
		type: 'boolean',
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

	/* Icon */
	icon_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	icon_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	/**  message */
	message_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	message_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	message_background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	/** Avatar */
	avatar_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	avatar_border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	/** Name */
	name_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	name_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	/** Job */
	job_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	job_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},
};
