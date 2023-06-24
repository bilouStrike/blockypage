/**
 *
 * IconList Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { dispatch, select } = wp.data;
const { RichText } = wp.blockEditor;

// Import blpge dependencies
const {
	blpge_spacing_cssGen,
	blpge_background_cssGen,
	blpge_border_cssGen,
	blpge_typography_cssGen,
} = blpgelib.utilities;

const { blpge_class_based_mq_css, blpge_cssGen } = blpgelib.helpers;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class IconList extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const self = this;
		const {
			attributes: {
				id,
				type,
				iconsList,
				currentItem,
				iconsColor,
				iconsSize,
				direction,
				typography,
				spacing,
				border,
				background,
				animation,
			},
			setAttributes,
			className,
		} = this.props;

		let iconsListInstance = iconsList.slice();

		/**********************************
    // Block Class Names 
    /******************************** */
		let iconListClassName = `blpge_iconList blpge_iconList--block blpge_iconList--id-${ id }`;
		if ( type == 'full-width' ) {
			iconListClassName += ' blpge_iconList--fluid';
		}

		let animationObject = animation;
		let listItems = [];

		function updateTextOfItem( value ) {
			if ( currentItem != null ) {
				let newIconList = iconsList.slice();
				iconsList[ currentItem ].content = value;
				setAttributes( { iconsList: newIconList } );
			} else {
				console.log( 'You have to chose item from the list' );
			}
		}

		for ( let i = 0; i < iconsListInstance.length; i++ ) {
			let fontAwesomeArr;
			if ( typeof iconsListInstance[ i ].icon != 'undefined' ) {
				fontAwesomeArr = [
					iconsListInstance[ i ].icon.split( '__' )[ 0 ],
					iconsListInstance[ i ].icon.split( '__' )[ 1 ],
				];
			}

			listItems.push(
				<div
					className="blpge_iconList__item"
					data-id={ i }
					data-svg={ iconsListInstance[ i ].icon }
					onClick={ () => getcurrentItem( event ) }
				>
					<FontAwesomeIcon icon={ fontAwesomeArr } />
					<span className="blpge_iconList__item__text">
						{ this.props.editor ? (
							<RichText
								format="string"
								value={ iconsListInstance[ i ].content }
								onChange={ ( value ) =>
									updateTextOfItem( value )
								}
							/>
						) : (
							iconsListInstance[ i ].content
						) }
					</span>
					{ this.props.editor ? (
						<span
							className="blpge_iconList__item__removeIcon"
							onClick={ () => removeItemList( event ) }
							item-id={ i }
						>
							<FontAwesomeIcon icon={ [ 'far', 'trash-alt' ] } />
						</span>
					) : null }
				</div>
			);
		}

		function removeItemList( evt ) {
			let target = evt.target;
			var elemnTarget = target.closest(
				'.blpge_iconList__item__removeIcon'
			);
			let id = jQuery( elemnTarget ).attr( 'item-id' );
			if ( id > -1 ) {
				iconsListInstance.splice( id, 1 );
				setAttributes( { iconsList: iconsListInstance } );
				self.forceUpdate();
			}
		}

		function getcurrentItem( evt ) {
			let target = evt.target;
			var elemnTarget = target.closest( '.blpge_iconList__item' );
			let currentItemId = jQuery( elemnTarget ).attr( 'data-id' );
			setAttributes( { currentItem: currentItemId } );
		}

		function blpge_add_new_ListItem() {
			iconsListInstance.push( {
				icon: 'fas__check',
				content: 'New item list',
			} );
			setAttributes( { iconsList: iconsListInstance } );
			self.forceUpdate();
		}

		let final_css;

		final_css = blpge_cssGen(
			`.blpge_iconList--id-${ id } svg`,
			[ 'color' ],
			[ iconsColor ],
			final_css
		);

		final_css = blpge_cssGen(
			`.blpge_iconList--id-${ id } svg`,
			[ 'width' ],
			[ [ iconsSize, 'px' ] ],
			final_css
		);

		final_css = blpge_cssGen(
			`.blpge_iconList--id-${ id } .blpge_iconList__item`,
			[ 'justify-content' ],
			[ direction ],
			final_css
		);

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block

		// Typography
		final_css = blpge_typography_cssGen(
			typography,
			`.blpge_iconList--id-${ id } .blpge_iconList__item__text`,
			final_css
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_iconList--id-${ id }`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_iconList--id-${ id }`,
			final_css
		);

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_iconList--id-${ id }`,
			final_css
		);

		// Get The Stored CSS
		let storedCSS = select( 'blockypage-css' ).getCSS();

		// Store the final CSS
		if ( final_css ) {
			if ( storedCSS[ id ] != final_css ) {
				dispatch( 'blockypage-css' ).addCSS( id, final_css );
			}
		} else {
			if ( id in storedCSS ) {
				dispatch( 'blockypage-css' ).removeCSS( id );
			}
		}

		const editor_css = blpge_class_based_mq_css( final_css );

		return (
			<div className={ `${ className } blpge_block-container` }>
				<div className="blpge_block-first-wrapper">
					<div className="blpge_block-second-wrapper">
						<div
							className={ iconListClassName }
							data-aos={
								! this.props.editor
									? animationObject.type
									: null
							}
							data-aos-delay={
								! animationObject.type
									? null
									: animationObject.delay
							}
							data-aos-duration={
								! animationObject.type
									? null
									: animationObject.duration
							}
							data-aos-once={
								! animationObject.type ? null : true
							}
						>
							{ listItems }
							{ this.props.editor ? (
								<div
									className="blpge_iconList__add_newItem"
									onClick={ () => blpge_add_new_ListItem() }
								>
									<FontAwesomeIcon
										icon={ [ 'fas', 'plus-circle' ] }
									/>
									Add new item
								</div>
							) : null }
							{ this.props.children }
							{ this.props.editor ? (
								<style
									dangerouslySetInnerHTML={ {
										__html: editor_css,
									} }
								/>
							) : null }
						</div>
					</div>
				</div>
			</div>
		);
	}
}
