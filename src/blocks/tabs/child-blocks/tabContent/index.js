/**
 *
 * Single column component.
 *
 */

// Import styles
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;

// Import block dependencies
import attributes from './components/attributes';
import Inspector from './components/inspector';
import TabContent from './components/tabContent';

// Import blpge dependencies
const { BlockAppender } = blpgelib.editor;

// Register Block
registerBlockType( 'blockypage-blocks/tab-content', {
	title: __( 'tab-content' ),

	parent: [ 'blockypage-blocks/tabs' ],

	description: __( 'A single content within a tab block.' ),

	category: 'BlockyPage',

	supports: {
		inserter: false,
		reusable: false,
		html: true,
	},

	attributes: attributes,

	edit( props ) {
		return [
			// Include Inspector
			<Inspector />,
			// Display Block on the editor
			<TabContent { ...props }>
				<InnerBlocks
					templateLock={ false }
					template={ [ [ 'core/paragraph' ] ] }
				/>
				<BlockAppender { ...props } />
			</TabContent>,
		];
	},

	save( props ) {
		return (
			<TabContent { ...props }>
				<InnerBlocks.Content />
			</TabContent>
		);
	},
} );
