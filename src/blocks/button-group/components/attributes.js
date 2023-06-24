/**
 * Set the block attributes
 * @type {Object}
 */
// Import blpge dependencies
const { collectionsObjects } = blpgelib.helpers;
export default {
	id: {
		type: 'string',
		default: null,
	},

	spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},

	align: {
		type: 'string',
		default: 'flex-start',
	},
	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
};
