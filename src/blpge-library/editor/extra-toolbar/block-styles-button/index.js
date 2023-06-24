/**
 *
 * Loading Block styles component
 *
 */

// Import wp components
const { Component, Fragment } = wp.element;

export default class BlockStyles extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const self = this;
		let blockName = self.props.name.split( '/' )[ 1 ];
		function blpge_importStyle() {
			jQuery( '.blpge_danwload_layout_icon' ).show();
			jQuery( '.blpge_loading_layout_gif' ).hide();
			jQuery.ajax( {
				url: blpge_params.ajaxUrl,
				type: 'post',
				dataType: 'json',
				data: {
					action: 'blpge_get_layouts',
					category: 'Block', // Block-styles
					block_name: blockName,
				},
				success: function ( response ) {
					jQuery( '.blpge_model__loading_layouts' ).hide();
					var all_layouts = '';
					jQuery.each( response, function ( key, value ) {
						all_layouts += `
            <div class="blpge_model__layout_item">
                <img src="${ value.thumbnail }" class="blpge_model__layout_item__thumbnail">
                <div class="blpge_model__layout_item__overlay">
                  <a href="#" class="blpge_model_layout__item_button" data-tab="${ value.id }">
                    <i class="fas fa-download blpge_danwload_layout_icon"></i>
                    <i class="fas fa-home blpge_loading_layout_gif"></i> 
                    Import 
                  </a>
                </div>
            </div>`;
					} );
					jQuery( '#layouts_items-' + self.props.clientId ).html(
						all_layouts
					);
					jQuery( '.blpge_model_layout__item_button' ).bind(
						'click',
						function ( e ) {
							var layout_id = jQuery( this ).attr( 'data-tab' );
							jQuery( '.blpge_danwload_layout_icon' ).hide();
							jQuery( '.blpge_loading_layout_gif' ).show();
							jQuery.ajax( {
								url: blpge_params.ajaxUrl,
								type: 'post',
								dataType: 'json',
								data: {
									action: 'blpge_get_layout_by_id',
									blpge_layout_id: layout_id,
								},
								success: function ( response ) {
									let BlockObject = JSON.parse(
										response.content
									);
									wp.data
										.dispatch( 'core/block-editor' )
										.updateBlockAttributes(
											self.props.clientId,
											BlockObject
										);
									jQuery( '#' + self.props.clientId ).css(
										'display',
										'none'
									);
								},
								error: function () {
									console.log( 'wrong' );
								},
							} );
						}
					);
				},
				error: function () {
					jQuery( '#layouts_items-' + self.props.clientId ).html(
						'Failed to load styles'
					);
				},
			} );

			jQuery( '.modal-trigger' ).click( function ( e ) {
				e.preventDefault();
				let dataModal = jQuery( this ).attr( 'data-modal' );
				jQuery( '#' + dataModal ).css( { display: 'block' } );
			} );
			jQuery(
				'.blpge_modal__content__header__close, .modal-sandbox'
			).click( function () {
				jQuery( '.blpge_modal' ).css( { display: 'none' } );
			} );
		}

		return (
			<Fragment>
				<span
					id="blpge_btn-layout"
					data-modal={ self.props.clientId }
					className="blpge_editor_extra-toolbar__icon modal-trigger"
					onClick={ blpge_importStyle }
					title="import!"
				>
					<i class="fas fa-palette"></i> Prebuild Styles
				</span>
				<div
					id={ self.props.clientId }
					data-modal={ self.props.clientId }
					class="blpge_modal"
				>
					<div class="blpge_modal__content">
						<div class="blpge_modal__content__header">
							<h5 class="blpge_modal__content__header__title">
								{ ' ' }
								Block styles :{ ' ' }
							</h5>
							<span class="blpge_modal__content__header__close">
								&times;
							</span>
						</div>
						<div class="blpge_modal__content__body">
							<div
								id={ `layouts_items-${ self.props.clientId }` }
							>
								<div class="blpge_model__loading_layouts">
									<h1> Loading styles </h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
