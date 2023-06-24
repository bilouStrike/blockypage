/*
 
  Hero Block for learning purpose 

*/

// Importing CSS

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	RichText,
	InspectorControls,
	ColorPalette,
	MediaUpload,
} = wp.blockEditor;
//const { ServerSideRender } = wp.components;

registerBlockType( 'gutenword-blocks/hero-image', {
	title: 'Hero Image',
	icon: 'admin-page',
	category: 'gutenword',

	// Defining The Attributes
	attributes: {
		textString: {
			type: 'array',
			source: 'children',
			selector: 'h2',
		},
		fontColor: {
			type: 'string',
			default: '#eddb34',
		},
		overlayColor: {
			type: 'string',
			default: '#eee',
		},
		backgroundImage: {
			type: 'string',
			default: null, // no image by default!
		},
	},

	edit( props ) {
		const { setAttributes, attributes, className } = props;

		const { fontColor, overlayColor, backgroundImage } = props.attributes;

		function onTextChange( changes ) {
			setAttributes( {
				textString: changes,
			} );
		}

		function onTextColorChange( changes ) {
			setAttributes( {
				fontColor: changes,
			} );
		}

		function onOverlayColorChange( changes ) {
			setAttributes( {
				overlayColor: changes,
			} );
		}

		function onImageSelect( imageObject ) {
			setAttributes( {
				backgroundImage: imageObject.sizes.full.url,
			} );
		}

		return [
			<InspectorControls>
				<div>
					<strong>Select a font color:</strong>
					<ColorPalette
						value={ fontColor }
						onChange={ onTextColorChange }
					/>
				</div>

				<div>
					<strong>Select an Overlay Color:</strong>
					<ColorPalette
						value={ overlayColor }
						onChange={ onOverlayColorChange }
					/>
				</div>

				<div>
					<strong>
						Background image
						<br />
					</strong>
					<div>
						<img
							src={ backgroundImage }
							style={ {
								width: '100%',
								height: '150px',
							} }
						/>
					</div>
					<br />
					<MediaUpload
						onSelect={ onImageSelect }
						type="image"
						value={ backgroundImage }
						render={ ( { open } ) => (
							<button onClick={ open }>Choose an image!</button>
						) }
					/>
				</div>
			</InspectorControls>,
			<div
				className={ className }
				style={ {
					backgroundImage: `url(${ backgroundImage })`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				} }
			>
				{ /* Adding an overlay element */ }
				<div
					className="overlay"
					style={ { background: overlayColor } }
				></div>
				<RichText
					tagName="h2"
					className="content" // adding a class we can target
					value={ attributes.textString }
					onChange={ onTextChange }
					placeholder="Enter your text here!"
					style={ { color: fontColor } }
				/>
			</div>,
		];
	},

	save( props ) {
		const { attributes, className } = props;
		const { fontColor, overlayColor, backgroundImage } = props.attributes;

		return (
			<div
				className={ className }
				style={ {
					backgroundImage: `url(${ backgroundImage })`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				} }
			>
				<div
					className="overlay"
					style={ { background: overlayColor } }
				></div>
				{ /* the class also needs to be added to the h2 for RichText */ }
				<h2 class="content" style={ { color: fontColor } }>
					{ attributes.textString }
				</h2>
			</div>
		);
	},
} );
