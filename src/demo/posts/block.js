/*
 
  A block to show posts from a specific category with a variaty of styles and options 
  to choose from. 

*/

// Importing CSS
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const {
	ServerSideRender,
	RadioControl,
	Panel,
	PanelBody,
	PanelRow,
} = wp.components;

registerBlockType( 'gutenword-blocks/posts', {
	title: 'posts',
	icon: 'admin-page',
	category: 'gutenword',

	edit: function ( props ) {
		const { attributes, setAttributes } = props;
		// ensure the block attributes matches this plugin's name
		const { style } = attributes;

		function OnChangeStyle( changes ) {
			setAttributes( {
				style: changes,
			} );
		}

		return [
			<InspectorControls>
				<PanelBody
					title="Style"
					icon="welcome-widgets-menus"
					initialOpen={ true }
				>
					<PanelRow>
						<RadioControl
							label="Posts Style"
							help="The Style of the posts"
							selected={ style }
							options={ [
								{ label: 'Style 01', value: 'style01' },
								{ label: 'Style 02', value: 'style02' },
							] }
							onChange={ OnChangeStyle }
						/>
					</PanelRow>
				</PanelBody>

				<PanelBody
					title="Configuration"
					icon="welcome-widgets-menus"
					initialOpen={ true }
				></PanelBody>
			</InspectorControls>,
			<ServerSideRender
				block="gutenword-blocks/posts"
				attributes={ props.attributes }
			/>,
		];
	},

	save() {
		// Rendering in PHP
		return null;
	},
} );
