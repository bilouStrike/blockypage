/**
 * Google maps
 */

// Import Styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;

// Import block dependencies
import attributes from './components/attributes';
import GoogleMaps from './components/googlemaps';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Register Block
registerBlockType( 'blockypage-blocks/googlemaps', {
	title: __( 'Google Maps' ),
	description: __( 'Advanced google maps' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'google' ), __( 'maps' ), __( 'blockypage' ) ],
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

			<GoogleMaps editor={ true } { ...props } />,
		];
	},

	save( props ) {
		return (
			<GoogleMaps editor={ false } { ...props }>
				<RichText.Content />
			</GoogleMaps>
		);
	},
} );
