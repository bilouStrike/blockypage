/**
 * Row Block
 *
 * Adds a Row with columns
 *
 */

// Import children blocks
import './child-blocks/column/index.js';

// Import styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

// Import blpge depenedencies
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Import block dependencies
import Row from './components/row';
import Inspector from './components/inspector';
import ToolBar from './components/toolbar';
import RowStyles from './components/child-components/row-styles/';
import attributes from './components/attributes';
import blockIcon from './components/icon';

// Register block
registerBlockType( 'blockypage-blocks/row', {
	title: __( 'Row' ),
	description: __( 'Adds a Row with columns' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [
		__( 'row' ),
		__( 'columns' ),
		__( 'grid' ),
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

		return [
			// Include Extra Toolbar
			<ExtraToolBar gray={ true } { ...props } />,
			// Include Inspector and Toolbar
			<ToolBar { ...props } />,
			<Inspector { ...props } />,
			// Display Row on the editor
			<Row editor={ true } { ...props }>
				<RowStyles { ...props } toolbar={ false } />
				<InnerBlocks
					templateInsertUpdatesSelection={ false }
					allowedBlocks={ [ 'blockypage-blocks/row-column' ] }
				/>
			</Row>,
		];
	},

	save( props ) {
		// Save Row
		return (
			<Row editor={ false } { ...props }>
				<InnerBlocks.Content />
			</Row>
		);
	},
} );
