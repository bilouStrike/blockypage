/**
 *
 * Border Component
 *
 * Border options for a block
 *
 */

// Import Style
import './editor.scss';

// Import wp components
const { Component } = wp.element;
const { __ } = wp.i18n;
const { RangeControl, SelectControl } = wp.components;

// Import collection dependencies
import LogoPreview from './icons/logo';

export default class Shadow extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		// Define Constants
		const self = this;

		// Define Constants
		const { setAttributes } = this.props;

		// Get the animation attribute name
		const attribute = this.props.attributeName;

		// Get the animation object
		let animation = JSON.parse(
			JSON.stringify( this.props.attributes[ attribute ] )
		);

		// On change Animation
		function animationChange( value ) {
			animation.type = value;

			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = animation;

			setAttributes( newAttributeObject );

			self._divPreview.setAttribute( 'data-aos-duration', '0' );
			self._divPreview.setAttribute( 'data-aos-delay', '0' );
			self._divPreview.setAttribute( 'style', 'display:none;' );
			self._divPreview.className =
				'blpge_inspector_animation-preview-box__tweak';

			setTimeout( function () {
				self._divPreview.setAttribute( 'style', 'display:block;' );
				self._divPreview.setAttribute(
					'data-aos-duration',
					animation.duration
				);
				self._divPreview.setAttribute(
					'data-aos-delay',
					animation.delay
				);
			}, 50 );

			setTimeout( function () {
				self._divPreview.className += ` aos-animate ${ value }`;
			}, 100 );
		}

		// On change Duration
		function duarationChange( value ) {
			animation.duration = value;

			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = animation;

			setAttributes( newAttributeObject );

			self._divPreview.setAttribute( 'data-aos-duration', '0' );
			self._divPreview.setAttribute( 'data-aos-delay', '0' );
			self._divPreview.setAttribute( 'style', 'display:none;' );
			self._divPreview.className =
				'blpge_inspector_animation-preview-box__tweak';

			setTimeout( function () {
				self._divPreview.setAttribute( 'style', 'display:block;' );
				self._divPreview.setAttribute( 'data-aos-duration', value );
				self._divPreview.setAttribute(
					'data-aos-delay',
					animation.delay
				);
			}, 50 );

			setTimeout( function () {
				self._divPreview.className += ` aos-animate ${ animation.type }`;
			}, 100 );
		}

		// On change Delay
		function delayChange( value ) {
			animation.delay = value;

			// Object to pass to setAttributes
			let newAttributeObject = {};
			newAttributeObject[ attribute ] = animation;

			setAttributes( newAttributeObject );

			self._divPreview.setAttribute( 'data-aos-duration', '0' );
			self._divPreview.setAttribute( 'data-aos-delay', '0' );
			self._divPreview.setAttribute( 'style', 'display:none;' );
			self._divPreview.className =
				'blpge_inspector_animation-preview-box__tweak';

			setTimeout( function () {
				self._divPreview.setAttribute( 'style', 'display:block;' );
				self._divPreview.setAttribute(
					'data-aos-duration',
					animation.duration
				);
				self._divPreview.setAttribute( 'data-aos-delay', value );
			}, 50 );

			setTimeout( function () {
				self._divPreview.className += ` aos-animate ${ animation.type }`;
			}, 100 );
		}

		return (
			<div>
				<div className="blpge_inspector_options-set">
					<span className="blpge_inspector_property-title">
						{ __( 'Animation' ) }
					</span>
					<SelectControl
						help="Choose an animation"
						value={ animation.type }
						options={ [
							{
								label: __( 'Select an animation' ),
								value: 'none',
							},

							{ label: __( 'Fade Up' ), value: 'fade-up' },
							{ label: __( 'Fade Down' ), value: 'fade-down' },
							{ label: __( 'Fade Left' ), value: 'fade-left' },
							{ label: __( 'Fade Right' ), value: 'fade-right' },
							{
								label: __( 'Fade Up Right' ),
								value: 'fade-up-right',
							},
							{
								label: __( 'Fade Up Left' ),
								value: 'fade-up-left',
							},
							{
								label: __( 'Fade Down Right' ),
								value: 'fade-down-right',
							},
							{
								label: __( 'Fade Down Left' ),
								value: 'fade-down-left',
							},

							{ label: __( 'Flip Up' ), value: 'flip-up' },
							{ label: __( 'Flip Down' ), value: 'flip-down' },
							{ label: __( 'Flip Left' ), value: 'flip-left' },
							{ label: __( 'Flip Right' ), value: 'flip-right' },

							{ label: __( 'Slide Up' ), value: 'slide-up' },
							{ label: __( 'Slide Down' ), value: 'slide-down' },
							{ label: __( 'Slide Left' ), value: 'slide-left' },
							{
								label: __( 'Slide Right' ),
								value: 'slide-right',
							},

							{ label: __( 'Zoom In' ), value: 'zoom-in' },
							{ label: __( 'Zoom In Up' ), value: 'zoom-in-up' },
							{
								label: __( 'Zoom In Down' ),
								value: 'zoom-in-down',
							},
							{
								label: __( 'Zoom in Left' ),
								value: 'zoom-in-left',
							},
							{
								label: __( 'Zoom in Right' ),
								value: 'zoom-in-right',
							},

							{ label: __( 'Zoom out' ), value: 'zoom-out' },
							{
								label: __( 'Zoom Out Up' ),
								value: 'zoom-out-up',
							},
							{
								label: __( 'Zoom Out Down' ),
								value: 'zoom-out-down',
							},
							{
								label: __( 'Zoom Out Left' ),
								value: 'zoom-out-left',
							},
							{
								label: __( 'Zoom Out Right' ),
								value: 'zoom-out-right',
							},
						] }
						onChange={ animationChange }
					/>

					<div className="blpge_row">
						<div className="blpge_row_col--4 blpge_inspector_animation-options-column">
							<div>
								<div className="blpge_inspector_animation-options">
									<span className="blpge_inspector_property-title">
										{ __( 'Duration(ms)' ) }{ ' ' }
									</span>
									<RangeControl
										help="3000. Max"
										value={ animation.duration }
										onChange={ duarationChange }
										min={ 50 }
										max={ 3000 }
									/>
								</div>
								<div className="blpge_inspector_animation-options">
									<span className="blpge_inspector_property-title">
										{ __( 'Delay(ms)' ) }{ ' ' }
									</span>
									<RangeControl
										help="3000. Max"
										value={ animation.delay }
										onChange={ delayChange }
										min={ 0 }
										max={ 3000 }
									/>
								</div>
							</div>
						</div>

						<div
							className="blpge_row_col--8"
							style={ { textAlign: 'center' } }
						>
							<span className="blpge_inspector_property-title">
								{ __( 'Preview' ) }
							</span>
							<div className="blpge_inspector_animation-preview-box">
								<div
									ref={ ( el ) => {
										self._divPreview = el;
									} }
									data-aos={ animation.type }
									data-aos-duration={ animation.duration }
									data-aos-delay={ animation.delay }
								>
									<LogoPreview />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
