/**
 *
 * Extra Toolbar
 *
 * Extra Toolbar for Blocks to improve UX.
 *
 */

// Import wp dependencies
const { Component, Fragment } = wp.element;
const { select, dispatch } = wp.data;
const { cloneBlock } = wp.blocks;

export default class ExtraToolBar extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	static defaultProps = {
		editOnly: false,
		gray: false,
		small: false,
		inner: false,
	};

	render() {
		const self = this;

		function onDelete() {
			dispatch( 'core/block-editor' ).removeBlock(
				self.props.clientId,
				true
			);
		}

		function onEdit() {
			dispatch( 'core/edit-post' ).openGeneralSidebar(
				'edit-post/block'
			);
			dispatch( 'core/block-editor' ).selectBlock( self.props.clientId );
		}

		function onDuplicate() {
			const index = select( 'core/block-editor' ).getBlockInsertionPoint()
				.index;

			const currentBlock = select( 'core/block-editor' ).getBlock(
				self.props.clientId
			);

			const rootClientId = select(
				'core/block-editor'
			).getBlockRootClientId( self.props.clientId );

			const duplicatedBlock = cloneBlock( currentBlock );
			dispatch( 'core/block-editor' ).insertBlock(
				duplicatedBlock,
				index,
				rootClientId
			);
		}

		let iconMarkup = (
			<Fragment>
				<div
					className={ `blpge_editor_extra-toolbar ${
						this.props.gray
							? 'blpge_editor_extra-toolbar--gray'
							: ''
					}
          ${ this.props.small ? ' blpge_editor_extra-toolbar--sm' : '' }
          ${ this.props.inner ? ' blpge_editor_extra-toolbar--inner' : '' }
          ` }
				>
					<span
						className="blpge_editor_extra-toolbar__icon"
						onClick={ onDuplicate }
						title="Duplicate"
					>
						<i class="fas fa-clone" />
					</span>
					<span
						className="blpge_editor_extra-toolbar__icon"
						onClick={ onEdit }
						title="Customize"
					>
						<i class="fas fa-pencil-alt" />
					</span>
					<span
						className="blpge_editor_extra-toolbar__icon"
						onClick={ onDelete }
						title="Remove!"
					>
						<i class="far fa-trash-alt" />
					</span>
				</div>
			</Fragment>
		);

		if ( this.props.editOnly ) {
			iconMarkup = (
				<div
					className={ `blpge_editor_extra-toolbar blpge_editor_extra-toolbar--inner ${
						this.props.gray
							? 'blpge_editor_extra-toolbar--gray'
							: ''
					}` }
				>
					<span
						className="blpge_editor_extra-toolbar__icon"
						onClick={ onEdit }
					>
						<i class="fas fa-pencil-alt" />
					</span>
				</div>
			);
		}

		return iconMarkup;
	}
}
