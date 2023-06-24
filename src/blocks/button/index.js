/**
 *
 * Button Block
 *
 */

// Import styles
import './style.scss';
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { ExtraToolBar } = blpgelib.editor;
const { blpge_setBlockId } = blpgelib.utilities;

// Import block dependencies
import Inspector from './components/inspector';
import Button from './components/button';
import attributes from './components/attributes';
import blockIcon from './components/icon';

// Register Block
registerBlockType( 'blockypage-blocks/button', {
	title: __( 'Button' ),
	description: __( 'Advanced Button Block' ),
	icon: blockIcon,
	category: 'BlockyPage',
	keywords: [ __( 'button' ), __( 'blockypage' ) ],
	supports: {
		reusable: false,
	},

	// Defining The Attributes
	attributes: attributes,
	edit( props ) {
		blpge_setBlockId( props );

		return [
			// Include Toolbar
			<ExtraToolBar { ...props } gray={ true } small={ true } />,

			// Include Inspector
			<Inspector { ...props } />,

			// Display Button on the editor
			<Button editor={ true } { ...props } />,
		];
	},

	save( props ) {
		// Save Button
		return <Button editor={ false } { ...props } />;
	},
} );
