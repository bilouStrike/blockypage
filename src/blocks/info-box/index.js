/**
 * Info box Block
 */

// Import Styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Import block dependencies
import attributes from './components/attributes';
import InfoBox from './components/infoBox';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Register Block
registerBlockType( 'blockypage-blocks/infobox', {
	title: __( 'Info Box' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'infoBox' ), __( 'testimonial' ), __( 'blockypage' ) ],
	supports: {
		reusable: false,
		align: [ 'full' ],
	},

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
			<InfoBox editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// Save container
		return <InfoBox editor={ false } { ...props } />;
	},
} );
