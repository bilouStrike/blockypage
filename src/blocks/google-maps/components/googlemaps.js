/**
 *
 * Container Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { dispatch, select } = wp.data;
// Import blpge dependencies
const { blpge_spacing_cssGen, blpge_border_cssGen } = blpgelib.utilities;

const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;

export default class GoogleMaps extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				type,
				apikey,
				address,
				zoom,
				zoomControl,
				mapTypeControl,
				scaleControl,
				streetViewControl,
				rotateControl,
				fullscreenControl,
				minHeight,
				minHeightUnit,
				spacing,
				border,
				animation,
			},
			className,
		} = this.props;

		/**********************************
    // Block Class Names 
    /******************************** */
		let googleMapsClassName = `blpge_googleMaps blpge_googleMaps--id-${ id }`;
		if ( type == 'full-width' ) {
			googleMapsClassName += ' blpge_googleMaps--fluid';
		}

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block
		let final_css;

		// General Settings
		final_css = blpge_cssGen(
			`.blpge_googleMaps--id-${ id }`,
			[ 'min-height' ],
			[
				[
					[ minHeight[ 0 ], minHeightUnit[ 0 ] ],
					[ minHeight[ 1 ], minHeightUnit[ 1 ] ],
					[ minHeight[ 2 ], minHeightUnit[ 2 ] ],
					[ minHeight[ 3 ], minHeightUnit[ 3 ] ],
				],
			],
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_googleMaps--id-${ id }`,
			final_css
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_googleMaps--id-${ id }`,
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

		let mapURL = `https://maps.google.com/maps?q=${ encodeURI(
			address
		) }&z=${ zoom }&ie=UTF8&iwloc=&output=embed`;
		let output = apikey ? (
			<div id="map"></div>
		) : (
			<iframe
				width="100%"
				height="100%"
				frameBorder="0"
				style={ { border: 0 } }
				src={ mapURL }
			/>
		);

		/*
      q= enter full address here or latitude+longitude e.g. (street name, city, county/state, country)
      layer= (t = traffic | c = streetview | tc = both) - show map layer type
      t= (m = normal map | k = satellite | h = hybrid | p = terrain) - Sets the kind of map shown
      z= (1 - 23) - map zoom level. 23 value indicates fully zoomed in. (default is 18)
      width= (value) - height of gmaps
      height= (value) - width of gmaps-->
      */

		const editor_css = blpge_class_based_mq_css( final_css );

		return (
			<div className={ `${ className } blpge_block-container` }>
				<div className="blpge_block-first-wrapper">
					<div className="blpge_block-second-wrapper">
						<div
							className={ googleMapsClassName }
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
							data-mapApiKey={ apikey }
							data-zoomControl={ zoomControl }
							data-scaleControl={ scaleControl }
							data-streetViewControl={ streetViewControl }
							data-rotateControl={ rotateControl }
							data-fullscreenControl={ fullscreenControl }
							data-mapTypeControl={ mapTypeControl }
							data-address={ address }
						>
							{ output }
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
