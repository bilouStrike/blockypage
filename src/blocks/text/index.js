/**
 * Text Block
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
import Text from './components/text';
import Inspector from './components/inspector';
import blockIcon from './components/icon';
import ToolBar from './components/toolbar';

// Import blpge depenedencies
const { blpge_setBlockId } = blpgelib.utilities;
const { ExtraToolBar } = blpgelib.editor;

// Register Block
registerBlockType( 'blockypage-blocks/text', {
	title: __( 'Rich Text' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'text' ), __( 'paragraph' ), __( 'blockypage' ) ],
	supports: {
		reusable: false,
		align: [ 'full' ],
	},

	// Define attributes
	attributes: attributes,

	edit( props ) {
		// Generate Unique ID for The Block
		blpge_setBlockId( props );
		const {
			attributes: { text },
			setAttributes,
		} = props;

		// Return Function
		return [
			<ExtraToolBar { ...props } />,
			// Include Inspector

			<Inspector { ...props } />,

			// Display Container on the editor
			<Text editor={ true } { ...props }>
				<RichText
					format="string"
					className="blpge_editor_richText"
					value={ text }
					onChange={ ( value ) => {
						setAttributes( { text: value } );
					} }
				/>
			</Text>,
		];
	},

	save( props ) {
		// Save container
		const {
			attributes: { text },
		} = props;
		return (
			<Text editor={ false } { ...props }>
				<RichText.Content value={ text } />
			</Text>
		);
	},
} );
