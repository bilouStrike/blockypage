export function blpge_video_popup() {
	( function ( $ ) {
		jQuery.fn.grtyoutube = function ( options ) {
			return this.each( function () {
				// Get video ID
				var getvideoid = jQuery( this ).attr( 'videoSrc' );
				let videoURL, src;
				if ( getvideoid ) {
					if (
						( videoURL = getvideoid.match(
							/(youtube|youtu|vimeo|dailymotion)\.(com|be)\/((watch\?v=([-\w]+))|(video\/([-\w]+))|([-\w]+))/
						) )
					) {
						if ( videoURL[ 1 ] == 'youtube' ) {
							src =
								'https://www.youtube.com/embed/' +
								videoURL[ 5 ] +
								'?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1';
						} else if ( videoURL[ 1 ] == 'youtu' ) {
							src =
								'https://www.youtube.com/embed/' +
								videoURL[ 3 ] +
								'?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1';
						} else if ( videoURL[ 1 ] == 'vimeo' ) {
							src =
								'https://player.vimeo.com/video/' +
								videoURL[ 3 ];
						} else if ( videoURL[ 1 ] == 'dailymotion' ) {
							src =
								'https://www.dailymotion.com/embed/video/' +
								videoURL[ 6 ];
						}
					} else {
						src = getvideoid;
					}
				}

				// Default options
				var settings = jQuery.extend(
					{
						videoID: src,
						autoPlay: true,
						theme: 'dark',
					},
					options
				);

				// Convert some values
				if ( settings.autoPlay === true ) {
					settings.autoPlay = 1;
				} else if ( settings.autoPlay === false ) {
					settings.autoPlay = 0;
				}
				if ( settings.theme === 'dark' ) {
					settings.theme = 'grtyoutube-dark-theme';
				} else if ( settings.theme === 'light' ) {
					settings.theme = 'grtyoutube-light-theme';
				}

				// Initialize on click
				if ( getvideoid ) {
					jQuery( this ).on( 'click', function () {
						jQuery( 'body' ).append(
							'<div class="grtyoutube-popup ' +
								settings.theme +
								'">' +
								'<div class="grtyoutube-popup-content">' +
								'<span class="grtyoutube-popup-close"></span>' +
								'<iframe class="grtyoutube-iframe" src="' +
								settings.videoID +
								'?rel=0&wmode=transparent&autoplay=' +
								settings.autoPlay +
								'&iv_load_policy=3" allowfullscreen frameborder="0" allow="autoplay; fullscreen"></iframe>' +
								'</div>' +
								'</div>'
						);
					} );
				}

				// Close the box on click or escape
				jQuery( this ).on( 'click', function ( event ) {
					event.preventDefault();
					jQuery(
						'.grtyoutube-popup-close, .grtyoutube-popup'
					).click( function () {
						jQuery( '.grtyoutube-popup' ).remove();
					} );
				} );

				jQuery( document ).keyup( function ( event ) {
					if ( event.keyCode == 27 ) {
						jQuery( '.grtyoutube-popup' ).remove();
					}
				} );
			} );
		};
	} )( jQuery );

	jQuery( '.youtube-link' ).grtyoutube( {
		autoPlay: true,
		theme: 'dark',
	} );
}
