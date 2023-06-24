/**
 * Sub Block Component
 */

// Import CSS
import './editor.scss';

// Import wp dependencies
const { Component, Fragment } = wp.element;
const { dispatch } = wp.data;

export default class SubBlock extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	componentWillMount() {
		document.addEventListener( 'mousedown', this.handleClick, false );
	}

	componentWillUnmount() {
		document.removeEventListener( 'mousedown', this.handleClick, false );
	}

	handleClick = ( e ) => {
		const { subBlock } = this.props.attributes;
		const self = this;

		jQuery( e.target )
			.closest( '[data-type^="blockypage-blocks"]' )
			.click( function () {
				if ( subBlock != 'general' ) {
					self.props.setAttributes( { subBlock: 'general' } );
					jQuery( e.target )
						.closest( '[data-type^="blockypage-blocks"]' )
						.removeClass( 'blpge_sub-block-selected' );
				}
			} );
	};

	render() {
		const self = this;
		const { subBlock } = this.props.attributes;

		function onClickSubBlock( e ) {
			if ( subBlock != self.props.name ) {
				self.props.setAttributes( { subBlock: self.props.name } );
			}
			dispatch( 'core/edit-post' ).openGeneralSidebar(
				'edit-post/block'
			);
			e.stopPropagation();
		}

		// add Block borders class
		jQuery( this.node )
			.closest( '[data-type^="blockypage-blocks"]' )
			.addClass( 'blpge_sub-block-selected' );

		const returnedMarkup = this.props.editor ? (
			<div
				title="Customize This Element"
				className={ `blpge_editor_sub-block ${
					subBlock == self.props.name && self.props.isSelected == true
						? ' blpge_editor_sub-block--selected'
						: ''
				}` }
				ref={ ( node ) => ( this.node = node ) }
				onClick={ onClickSubBlock }
				style={ this.props.style }
			>
				{ this.props.children }
			</div>
		) : (
			<Fragment>{ this.props.children }</Fragment>
		);
		return returnedMarkup;
	}
}
