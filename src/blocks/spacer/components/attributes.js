/**
 * Set the block attributes
 * @type {Object}
 */
const { collectionsObjects } = blpgelib.helpers;
export default {
	id: {
		type: 'string',
	},

	height: {
		type: 'number',
		default: [ 50, null, null, null ],
	},

	HeightUnit: {
		type: 'array',
		default: [ 'px', 'px', 'px', 'px' ],
	},

	background: {
		type: 'object',
		default: collectionsObjects.background,
	},

	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
};
