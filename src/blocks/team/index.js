/**
 * Text Block
 */

// Import Styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Import block dependencies
import attributes from './components/attributes';
import Team from './components/team';
import Inspector from './components/inspector';

// Import blpge depenedencies
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;
import blockIcon from './components/icon';

// Register Block
registerBlockType( 'blockypage-blocks/team', {
	title: __( 'Team Member' ),
	description: __( 'Advanced team block' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'team' ), __( 'blockypage' ) ],
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

			// Display Team on the editor
			<Team editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// Save
		return <Team editor={ false } { ...props } />;
	},
} );
