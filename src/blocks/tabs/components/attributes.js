/**
 * Set the block attributes
 * @type {Object}
 */
const { collectionsObjects } = blpgelib.helpers;
export default {
	// Inspector Attributes
	id: {
		type: 'string',
		default: null,
	},

	subBlock: {
		type: 'string',
		default: 'general',
	},

	spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	tabs: {
		type: 'array',
		source: 'query',
		selector: '.blpge_tabs__titles__link',
		query: {
			title: {
				source: 'text',
				multiline: 'li',
			},
		},
		default: [
			{ title: 'Tab Title', id: 99999 },
			{ title: 'Tab Title', id: 99998 },
			{ title: 'Tab Title', id: 99997 },
		],
	},

	width: {
		type: 'array',
		default: [ null, null, null, null ],
	},

	widthUnit: {
		type: 'array',
		default: [ 'px', 'px', 'px', 'px' ],
	},

	Navigation_background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	content_background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	Navigation_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	tabsContent_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},

	navigation_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	content_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	navigation_border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	content_border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	activeNav_background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	activeNav_typo: {
		type: 'object',
		default: collectionsObjects.typography,
	},
	activeNav_border: {
		type: 'object',
		default: collectionsObjects.border,
	},

	activeNav_spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},
	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
};
