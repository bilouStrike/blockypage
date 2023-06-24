// Import blpge dependencies
const { collectionsObjects } = blpgelib.helpers;

/**
 * Set the block attributes
 * @type {Object}
 */

export default {
	id: {
		type: 'string',
		default: null,
	},

	subBlock: {
		type: 'string',
		default: 'general',
	},

	columnSize: {
		type: 'string',
		default: '12',
	},

	order: {
		type: 'array',
		default: [ null, null, null, null ],
	},

	brp_columnSize: {
		type: 'array',
		default: [ null, null, null ],
	},

	verticalAlign: {
		type: 'string',
		default: null,
	},

	title: {
		type: 'string',
		source: 'html',
		selector: '.blpge_pricing__header__title',
		default: 'Basic',
	},

	subtitle: {
		type: 'string',
		source: 'html',
		selector: '.blpge_pricing__header__subtitle',
		default: 'Add Subtitle Here',
	},

	subtitleEnable: {
		type: 'boolean',
		default: true,
	},

	price: {
		type: 'string',
		default: '39',
	},

	currency: {
		type: 'string',
		default: '$',
	},

	per: {
		type: 'string',
		default: 'Month',
	},

	footerOptionTxt: {
		type: 'string',
		default: 'Footer Text',
	},

	footerOptionEnable: {
		type: 'boolean',
		default: true,
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

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},

	shadow: {
		type: 'object',
		default: collectionsObjects.shadow,
	},

	header_background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	header_border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	footer_background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	footer_border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	title_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	title_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	subtitle_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	subtitle_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	price_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	price_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	currency_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	currency_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	per_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	per_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	features_background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	features_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	features_border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	features_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	footerOption_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	iconsList: {
		type: 'array',
		source: 'query',
		selector: '.blpge_pricing__item',
		query: {
			content: {
				source: 'text',
				selector: '.blpge_pricing__item__text',
			},
			icon: {
				source: 'attribute',
				attribute: 'data-svg',
			},
		},
		default: [
			{
				icon: 'far__arrow-alt-circle-right',
				content: 'Responsive Desing',
			},
			{ icon: 'fas__check', content: 'Color customization' },
			{ icon: 'fas__check', content: 'Styled element' },
			{ icon: 'fas__check', content: 'Ready layout to use' },
		],
	},

	currentItem: {
		type: 'number',
		default: null,
	},

	iconsColor: {
		type: 'string',
		default: null,
	},

	iconsSize: {
		type: 'number',
		default: null,
	},

	direction: {
		type: 'string',
		default: null,
	},
};
