jQuery( document ).ready( function ( $ ) {
	jQuery( '.blpge_tabs__contents__tab-content:first-child' ).show();
	jQuery( '.blpge_tabs__titles__link' ).bind( 'click', function ( e ) {
		$this = jQuery( this );
		let tabIndex = $this.index();
		$selectedTab = $this.parent().next().children().eq( tabIndex );
		$this.siblings().removeClass( 'blpge_tabs__titles__link--current' );
		$selectedTab.siblings().css( 'display', 'none' );
		$this.addClass( 'blpge_tabs__titles__link--current' );
		$selectedTab.fadeIn( 'fast' );
	} );
	jQuery( '.blpge_tabs__titles__link:first-child' ).trigger( 'click' );
} );
