import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';

jQuery( document ).ready( function () {
	// Remove the selection onload
	window.localStorage.removeItem( 'blpge_selection' );

	// Mouse up event for the document
	document.addEventListener( 'mouseup', function ( event ) {
		// Selection Handeling
		let selection = rangy.getSelection();

		if ( selection ) {
			if (
				! selection.isCollapsed &&
				selection.toString().replace( /\s/g, '' ).length != 0
			) {
				const $selection_node = jQuery( selection.focusNode );

				if (
					$selection_node.parents( '.blpge_editor_richText' ).length
				) {
					let span_class = `blpge_selected_${ Math.floor(
						Math.random() * 10100
					) }`;

					// Check if the selected text is entirely wrraped with a blpge class
					let alreadyWrapped = false;
					if ( $selection_node.parent().attr( 'class' ) ) {
						if (
							$selection_node
								.parent()
								.attr( 'class' )
								.indexOf( 'blpge_selected' ) != -1
						) {
							if (
								selection.toString() ==
								$selection_node.parent()[ 0 ].childNodes[ 0 ]
									.wholeText
							) {
								alreadyWrapped = true;
								span_class = $selection_node.parent()[ 0 ]
									.className;
							}
						}
					}

					// Store the range and the className
					window.localStorage.setItem(
						'blpge_selection',
						JSON.stringify( {
							class: span_class,
							exist: alreadyWrapped,
						} )
					);
					window.blpge_currentRange = selection._ranges[ 0 ];

					// Append selection style
					if ( jQuery( '.blpge_selection_css' ).length > 0 ) {
						jQuery(
							'.blpge_selection_css'
						)[ 0 ].innerHTML = `<style>.${ span_class }{outline:1px dashed #b8abd3;}</style>`;
					} else {
						jQuery( 'body' ).append(
							`<div class="blpge_selection_css"><style>.${ span_class }{outline:1px dashed #b8abd3;}</style></div>`
						);
					}
				}
			}
		}

		if ( jQuery( '.blpge_inspector_typographyWrraper' )[ 0 ] ) {
			if (
				! jQuery( '.blpge_inspector_typographyWrraper' )[ 0 ].contains(
					event.target
				) &&
				! jQuery( event.target ).parents( '.blpge_editor_richText' )
					.length &&
				! jQuery( event.target ).hasClass( 'blpge_editor_richText' ) &&
				! jQuery( event.target ).parents(
					'.blpge_inspector_shadowWrraper'
				).length &&
				! jQuery( event.target ).parents(
					'.blpge_inspector_advancedOptionsWrraper'
				).length &&
				! jQuery( event.target ).parents( '.blpge_color_picker' ).length
			) {
				{
					window.localStorage.removeItem( 'blpge_selection' );
					if ( jQuery( '.blpge_selection_css' ) ) {
						jQuery( '.blpge_selection_css' ).remove();
					}
				}
			}
		} else {
			const $selection_node = jQuery( selection.focusNode );
			if (
				! $selection_node.parents( '.blpge_editor_richText' ).length
			) {
				window.localStorage.removeItem( 'blpge_selection' );
				if ( jQuery( '.blpge_selection_css' ) ) {
					jQuery( '.blpge_selection_css' ).remove();
				}
			}
		}
	} );
} );
