/**
 * Container Block
 *
 * Adds a Wrapper Div to your blocks
 *
 */

// Import Styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

// Import block dependencies
import attributes from './components/attributes';
import Container from './components/container';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { ExtraToolBar, BlockAppender } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Register Block
registerBlockType( 'blockypage-blocks/container', {
	title: __( 'Container' ),
	description: __( 'Adds a Wrapper Div to your blocks' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [
		__( 'contaner' ),
		__( 'wrapper' ),
		__( 'section' ),
		__( 'blockypage' ),
	],
	supports: {
		reusable: false,
		align: [ 'full' ],
	},

	// Define attributes
	attributes: attributes,

	edit( props ) {
		// Set Unique Block ID
		blpge_setBlockId( props );

		// Return Function
		return [
			// Include Extra ToolBar
			<ExtraToolBar { ...props } />,

			// Include Inspector
			<Inspector { ...props } />,

			// Display Container on the editor
			<Container editor={ true } { ...props }>
				<InnerBlocks
					renderAppender={ () => <InnerBlocks.ButtonBlockAppender /> }
				/>
			</Container>,
		];
	},

	save( props ) {
		// Save container
		return (
			<Container editor={ false } { ...props }>
				<InnerBlocks.Content />
			</Container>
		);
	},
} );
