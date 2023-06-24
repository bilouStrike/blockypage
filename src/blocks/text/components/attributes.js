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

	text: {
		type: 'string',
		source: 'html',
		selector: '.blpge_textBlock',
		default:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec molestie lectus. In sagittis tempus sapien, id fringilla erat interdum auctor. Aenean placerat volutpat odio ac rhoncus. Ut mollis sagittis est et viverra. Vestibulum tristique dapibus orci, sit amet gravida nunc rhoncus vel. Phasellus iaculis eros vehicula ex tristique venenatis. Sed id diam quis nunc volutpat finibus eget sit amet arcu. Nulla at est eu leo placerat sagittis quis ut libero. Nulla feugiat egestas lacus, vulputate tincidunt lacus aliquet et. Integer ut congue ligula. Sed nec odio in eros tempor fringilla.',
	},

	// Collections
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
