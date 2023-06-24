/**
 * Testimonial Block
 */

// Import Styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Import block dependencies
import attributes from './components/attributes';
import Testimonial from './components/testimonial';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Register Block
registerBlockType( 'blockypage-blocks/testimonial', {
	title: __( 'Testimonial' ),
	description: __( 'Testimonial block' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'testimonial' ), __( 'blockypage' ) ],
	supports: {
		reusable: false,
		align: [ 'full' ],
	},

	// Register block styles.
	styles: [
		// Mark style as default.
		{
			name: 'blpge_testimonial__layout-style_1',
			label: __( 'Message First' ),
			isDefault: true,
		},
		{
			name: 'blpge_testimonial__layout-style_3',
			label: __( 'Author first' ),
		},
		{
			name: 'blpge_testimonial__layout-style_2',
			label: __( 'Floated' ),
		},
	],

	// Define attributes
	attributes: attributes,

	edit( props ) {
		// Generate Unique ID for The Block
		blpge_setBlockId( props );

		return [
			<ExtraToolBar { ...props } />,
			// Include Inspector
			<Inspector { ...props } />,

			// Display Container on the editor
			<Testimonial editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// Save container
		return <Testimonial editor={ false } { ...props } />;
	},
} );
