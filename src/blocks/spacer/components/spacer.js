/**
 *
 * The Spacer component is used on the save function
 *
 */
// Import wp dependencies
const { Component } = wp.element;
const { dispatch, select } = wp.data;

// Import blpge dependencies
const { blpge_cssGen, blpge_class_based_mq_css } = blpgelib.helpers;
const { blpge_background_cssGen } = blpgelib.utilities;
export default class Spacer extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: { id, height, HeightUnit, animation, background },
			className,
		} = this.props;

		let final_css = blpge_cssGen(
			`.blpge_spacer--${ id }`,
			[ 'min-height' ],
			[
				[
					[ height[ 0 ], HeightUnit[ 0 ] ],
					[ height[ 1 ], HeightUnit[ 1 ] ],
					[ height[ 2 ], HeightUnit[ 2 ] ],
					[ height[ 3 ], HeightUnit[ 3 ] ],
				],
			]
		);

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_spacer--${ id }`,
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
							className={ `blpge_spacer blpge_spacer--${ id }` }
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
						/>
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
