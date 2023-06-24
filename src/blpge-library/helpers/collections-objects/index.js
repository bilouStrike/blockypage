// Collections Objects
export default {
	animation: { duration: 1000, delay: 10 },

	background: { backgroundState: 'Classic', backgroundHoverState: 'Classic' },

	border: {
		borderRadius: { values: {}, unit: 'px', locked: true },
		style: {},
		size: {},
		color: {},
	},

	overlay: {},

	shadow: {
		hoffset: 0,
		voffset: 0,
		blur: 0,
		spread: 0,
		color: '#333',
		position: null,
	},

	shapeDivider: { topShape: {}, bottomShape: {} },

	spacing: {
		margin: {
			values: {},
			unit: [ 'px', 'px', 'px', 'px' ],
			locked: false,
		},
		padding: {
			values: {},
			unit: [ 'px', 'px', 'px', 'px' ],
			locked: false,
		},
	},

	typography: {
		sizeUnit: 'px',
		lineHeightUnit: [ 'px', 'px', 'px', 'px' ],
		textShadow: {},
	},

	iconPicker: {
		icon: null,
		fill: null,
		iconSize: [ null, null, null, null ],
		rotateY: false,
		rotateX: false,
	},
};
