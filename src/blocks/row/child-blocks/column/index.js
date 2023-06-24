/**
 *
 * Single column component.
 *
 */

// Import styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;

// Import block dependencies
import attributes from './components/attributes';
import Inspector from './components/inspector';
import Column from './components/column';

// Import blpge dependencies
const { blpge_setBlockId } = blpgelib.utilities;
const { ExtraToolBar, BlockAppender } = blpgelib.editor;

// Register Block
registerBlockType( 'blockypage-blocks/row-column', {
	title: __( 'Column' ),

	parent: [ 'blockypage-blocks/row' ],

	description: __( 'A single Column Within A Row .' ),

	category: 'BlockyPage',

	supports: {
		inserter: false,
		reusable: false,
		html: true,
	},

	attributes: attributes,

	edit( props ) {
		// Set Unique Block ID
		blpge_setBlockId( props );

		return [
			// Include Extra Toolbar
			<ExtraToolBar gray={ true } editOnly={ true } { ...props } />,
			// Include Inspector
			<Inspector { ...props } />,
			// Display Block on the editor
			<Column editor={ true } { ...props }>
				<div class="blpge_backgroundOverlay" />

				<div class="blpge_row__col__wrapper">
					<InnerBlocks
						renderAppender={ () => (
							<InnerBlocks.ButtonBlockAppender />
						) }
					/>
				</div>
			</Column>,
		];
	},

	save( props ) {
		return (
			<Column editor={ false } { ...props }>
				<div class="blpge_backgroundOverlay" />
				<div class="blpge_row__col__wrapper">
					<InnerBlocks.Content />
				</div>
			</Column>
		);
	},
} );
