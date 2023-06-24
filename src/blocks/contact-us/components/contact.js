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

export default class Contact extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				id,
				type,
				recaptcha,
				site_key,
				secret_key,
				success_message,
				error_message,
				label_typography,
				input_border,
				spacing,
				border,
				background,
				button_text,
				button_align,
				button_background,
				button_spacing,
				button_border,
				button_typo,
				animation,
			},
			setAttributes,
			className,
		} = this.props;

		/**********************************
    // Block Class Names 
    /******************************** */
		let contactClassName = `blpge_contact blpge_contact--id-${ id }`;

		/**********************************
    // Generate CSS
    /******************************** */
		// Final CSS for the block
		let final_css;

		// Background
		final_css = blpge_background_cssGen(
			background,
			`.blpge_contact--id-${ id }`,
			final_css
		);

		// Spacing
		final_css = blpge_spacing_cssGen(
			spacing,
			`.blpge_contact--id-${ id }`,
			final_css
		);

		// Border
		final_css = blpge_border_cssGen(
			border,
			`.blpge_contact--id-${ id }`,
			final_css
		);

		// Label typography
		final_css = blpge_typography_cssGen(
			label_typography,
			`.blpge_contact--id-${ id } .blpge-form-label`,
			final_css
		);

		// Button align
		final_css = blpge_cssGen(
			`.blpge_contact--id-${ id } .blpge-btn-wrapper `,
			[ 'justify-content' ],
			[ button_align ],
			final_css
		);

		// Button Background
		final_css = blpge_background_cssGen(
			button_background,
			`.blpge_contact--id-${ id } .blpge-contact-button `,
			final_css
		);

		// Button spacing
		final_css = blpge_spacing_cssGen(
			button_spacing,
			`.blpge_contact--id-${ id } .blpge-contact-button `,
			final_css
		);

		// Button border
		final_css = blpge_border_cssGen(
			button_border,
			`.blpge_contact--id-${ id } .blpge-contact-button `,
			final_css
		);

		// Button typography
		final_css = blpge_typography_cssGen(
			button_typo,
			`.blpge_contact--id-${ id } .blpge-contact-button `,
			final_css
		);

		// Input border
		final_css = blpge_border_cssGen(
			input_border,
			`.blpge_contact--id-${ id } .blpge-form-input `,
			final_css
		);

		// Get The Stored CSS
		let storedCSS = select( 'blockypage-css' ).getCSS();

		// Set the post-meta for form contact
		dispatch( 'core/editor' ).editPost( {
			meta: { blpge_use_contact: true },
		} );

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
							className={ contactClassName }
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
							<form method="post" id="blpge_contact_us">
								<div className="blpge_row blpge_row--block blpge-form-row">
									<input
										type="hidden"
										name="secret_key"
										value={ secret_key }
									/>
									<input
										type="hidden"
										name="recaptcha_enable"
										value={ recaptcha ? 'true' : 'false' }
									/>
									<div className="blpge_row__col--6 blpge-form-group">
										<label className="blpge-form-label">
											{ ' ' }
											Full Name *{ ' ' }
										</label>
										<input
											type="text"
											name="full-name"
											className="blpge-form-input"
										/>
									</div>
									<div className="blpge_row__col--6 blpge-form-group">
										<label className="blpge-form-label">
											{ ' ' }
											Email *{ ' ' }
										</label>
										<input
											type="text"
											name="email"
											className="blpge-form-input"
										/>
									</div>
									<div className="blpge_row__col--12 blpge-form-group">
										<label className="blpge-form-label">
											{ ' ' }
											Subject *{ ' ' }
										</label>
										<input
											type="text"
											name="subject"
											className="blpge-form-input"
										/>
									</div>
									<div className="blpge_row__col--12 blpge-form-group">
										<label className="blpge-form-label">
											{ ' ' }
											Message *{ ' ' }
										</label>
										<textarea
											rows="5"
											name="message"
											className="blpge-form-input"
										></textarea>
									</div>
									{ recaptcha ? (
										<div className="blpge_row__col--12 blpge-form-group">
											<div
												class="g-recaptcha"
												data-sitekey={ site_key }
											></div>
										</div>
									) : null }
									<div className="blpge-alert blpge-success">
										{ ' ' }
										{ success_message }{ ' ' }
									</div>
									<div className="blpge-alert blpge-error">
										{ ' ' }
										{ error_message }{ ' ' }
									</div>
									<div className="blpge-form-group blpge-full-width">
										<div className="blpge-btn-wrapper">
											<button
												type={
													this.props.editor
														? null
														: 'submit'
												}
												className="blpge_btn blpge_btn--medium blpge-contact-button"
											>
												{ this.props.editor ? (
													<RichText
														className="blpge_editor_richText"
														format="string"
														value={ button_text }
														onChange={ (
															value
														) => {
															setAttributes( {
																button_text: value,
															} );
														} }
													/>
												) : (
													<RichText.Content
														value={ button_text }
													/>
												) }
											</button>
										</div>
									</div>
								</div>
							</form>
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
