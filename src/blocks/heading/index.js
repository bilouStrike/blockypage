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
import Heading from './components/heading';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Register Block
registerBlockType( 'blockypage-blocks/heading', {
	title: __( 'Advanced Heading' ),
	description: __( 'Advanced heading block' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'heading' ), __( 'title' ), __( 'blockypage' ) ],
	supports: {
		reusable: false,
		align: [ 'full' ],
	},

	// Define attributes
	attributes: attributes,

	edit( props ) {
		// Generate Unique ID for The Block
		blpge_setBlockId( props );
		const { attributes, setAttributes } = props;

		return [
			<ExtraToolBar { ...props } />,
			// Include Inspector
			<Inspector { ...props } />,

			// Display Container on the editor
			<Heading editor={ true } { ...props }>
				<RichText
					className="blpge_editor_richText"
					value={ attributes.headingContent }
					onChange={ ( value ) => {
						setAttributes( { headingContent: value } );
					} }
				/>
			</Heading>,
		];
	},

	save( props ) {
		// Save container
		const { attributes } = props;
		return (
			<Heading editor={ false } { ...props }>
				<RichText.Content value={ attributes.headingContent } />
			</Heading>
		);
	},
} );
