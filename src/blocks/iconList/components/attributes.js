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

	iconsList: {
		type: 'array',
		source: 'query',
		selector: '.blpge_iconList__item',
		query: {
			content: {
				source: 'text',
				selector: '.blpge_iconList__item__text',
			},
			icon: {
				source: 'attribute',
				attribute: 'data-svg',
			},
		},
		default: [
			{ icon: 'far__arrow-alt-circle-right', content: 'Item text' },
			{ icon: 'fas__check', content: 'Item text' },
		],
	},

	direction: {
		type: 'string',
		default: null,
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

	typography: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
};
