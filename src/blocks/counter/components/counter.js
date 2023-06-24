/**
 *
 * Container Component.
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

// Container Component
const { blpge_class_based_mq_css, blpge_cssGen } = blpgelib.helpers;
const { SubBlock } = blpgelib.editor;

export default class Counter extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				type,
				number,
				text,
				textEnable,
				sign,
				signEnable,
				sign_spacing,
				sign_typo,
				min_width,
				duration,
				count_start,
				number_background,
				number_spacing,
				number_border,
				number_typo,
				text_spacing,
				text_typo,
				animation,
			},
			setAttributes,
			className,
		} = this.props;

		/**********************************
    // Block Class Names 
    /******************************** */
		let counterClassName = `blpge_counter blpge_counter--block blpge_counter--id-${ id }`;
		if ( type == 'full-width' ) {
			counterClassName += ' blpge_heading--fluid';
		}

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block
		let final_css;

		final_css = blpge_cssGen(
			`.blpge_counter--id-${ id } .blpge_counter__wrapper`,
			[ 'min-width' ],
			[ [ min_width, 'px' ] ],
			final_css
		);

		// Typography
		final_css = blpge_typography_cssGen(
			number_typo,
			`.blpge_counter--id-${ id } .blpge_counter__wrapper`,
			final_css
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			number_spacing,
			`.blpge_counter--id-${ id } .blpge_counter__wrapper`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			number_border,
			`.blpge_counter--id-${ id } .blpge_counter__wrapper`,
			final_css
		);

		// Background
		final_css = blpge_background_cssGen(
			number_background,
			`.blpge_counter--id-${ id } .blpge_counter__wrapper`,
			final_css
		);

		/********* Text ********/
		// Typography
		final_css = blpge_typography_cssGen(
			text_typo,
			`.blpge_counter--id-${ id } .blpge_counter__text`,
			final_css
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			text_spacing,
			`.blpge_counter--id-${ id } .blpge_counter__text`,
			final_css
		);

		/*****  Sign *********************/
		// Typography
		final_css = blpge_typography_cssGen(
			sign_typo,
			`.blpge_counter--id-${ id } .blpge_counter__wrapper__sign`,
			final_css
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			sign_spacing,
			`.blpge_counter--id-${ id } .blpge_counter__wrapper__sign`,
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

		let setting = JSON.stringify( {
			counter_duration: duration,
			start_from: count_start,
		} );

		const editor_css = blpge_class_based_mq_css( final_css );

		return (
			<div className={ `${ className } blpge_block-container` }>
				<div className="blpge_block-first-wrapper">
					<div className="blpge_block-second-wrapper">
						<div
							className={ counterClassName }
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
							<SubBlock { ...this.props } name="counter">
								<div className="blpge_counter__wrapper">
									<span
										className="blpge_counter__wrapper__number Count"
										data-counter={ setting }
									>
										{ number }
									</span>
									{ signEnable ? (
										<span className="blpge_counter__wrapper__sign">
											{ sign }
										</span>
									) : null }
								</div>
							</SubBlock>
							{ textEnable ? (
								<SubBlock { ...this.props } name="description">
									<div className="blpge_counter__text">
										{ this.props.editor ? (
											<RichText
												tagName="span"
												format="string"
												value={ text }
												onChange={ ( value ) => {
													setAttributes( {
														text: value,
													} );
												} }
											/>
										) : (
											<RichText.Content value={ text } />
										) }
									</div>
								</SubBlock>
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
