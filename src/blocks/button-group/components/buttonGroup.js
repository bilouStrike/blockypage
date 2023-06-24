/**
 *
 * Accordion Component
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;
const { dispatch, select } = wp.data;
const { Dashicon } = wp.components;

// Import blpge dependencies
const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;
const { blpge_spacing_cssGen } = blpgelib.utilities;

// Import blpge dependencies
export default class ButtonGroup extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const self = this;
		const {
			attributes: { id, spacing, align, animation },
			className,
		} = this.props;

		/**********************************
    // Block ClassName
    /**********************************/
		let btnGroupClassName = `blpge_btn_group blpge_btn-grp-${ id }`;

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block
		let final_css;

		// General Settings
		final_css = blpge_cssGen(
			`.blpge_btn-grp-${ id }`,
			[ 'justify-content' ],
			[ [ align, ' !important' ] ]
		);

		// Spacing
		// spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_btnGroup`,
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
							class="blpge_btnGroup"
							data-aos={
								! this.props.editor ? animation.type : null
							}
							data-aos-delay={
								! animation.type ? null : animation.delay
							}
							data-aos-duration={
								! animation.type ? null : animation.duration
							}
							data-aos-once={ ! animation.type ? null : true }
						>
							<ul className={ btnGroupClassName }>
								{ this.props.editor ? (
									<InnerBlocks
										renderAppender={ () => null }
										allowedBlocks={ [
											'blockypage-blocks/button',
										] }
										template={ [
											[ 'blockypage-blocks/button' ],
											[ 'blockypage-blocks/button' ],
										] }
									/>
								) : (
									<InnerBlocks.Content />
								) }
								{ this.props.editor ? (
									<a
										class="blpge_add_new_button"
										style={
											select( 'core/editor' ).getBlock(
												self.props.clientId
											).innerBlocks.length > 7
												? { display: 'none' }
												: null
										}
										onClick={ () => {
											const index =
												select(
													'core/editor'
												).getBlock(
													self.props.clientId
												).innerBlocks.length + 1;
											let insertedBlock = wp.blocks.createBlock(
												'blockypage-blocks/button'
											);
											dispatch(
												'core/block-editor'
											).insertBlock(
												insertedBlock,
												index,
												self.props.clientId
											);
										} }
									>
										<Dashicon icon="insert" />
									</a>
								) : null }
							</ul>
						</div>
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
		);
	}
}
