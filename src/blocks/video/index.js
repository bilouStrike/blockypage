/**
 * Video Block
 */

// Import Styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Import block dependencies
import attributes from './components/attributes';
import VideoPopup from './components/videoPopup';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Register Block
registerBlockType( 'blockypage-blocks/videopopup', {
	title: __( 'Video Popup' ),
	description: __( 'Advanced Video Popup' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [
		__( 'video' ),
		__( 'media' ),
		__( 'popup' ),
		__( 'blockypage' ),
	],
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
			<VideoPopup editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// Save
		return <VideoPopup editor={ false } { ...props } />;
	},
} );
