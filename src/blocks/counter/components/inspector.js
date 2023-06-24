import { sign } from 'crypto';

/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, TextControl, RangeControl } = wp.components;

// Import blockypage dependencies
const { BlpgeSubPanel, SubBlockInspector } = blpgelib.components;
const { Typography, Border, Background, Spacing } = blpgelib.collections;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				min_width,
				duration,
				number,
				sign,
				signEnable,
				textEnable,
				count_start,
			},
			setAttributes,
			className,
		} = this.props;

		return (
			<InspectorControls>
				<SubBlockInspector { ...this.props } name="counter">
					<PanelBody>
						<span className="blpge_inspector_property-title">
							{ __( 'Min Width:' ) }
						</span>
						<RangeControl
							value={ min_width }
							onChange={ ( value ) => {
								setAttributes( { min_width: value } );
							} }
							min={ 10 }
							max={ 450 }
						/>

						<span className="blpge_inspector_property-title">
							{ __( 'The max number:' ) }
						</span>
						<TextControl
							type="text"
							value={ number }
							onChange={ ( value ) =>
								setAttributes( { number: Number( value ) } )
							}
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'Duration:' ) }
						</span>
						<TextControl
							type="text"
							value={ duration }
							onChange={ ( value ) =>
								setAttributes( { duration: Number( value ) } )
							}
						/>
						<span className="blpge_inspector_property-title">
							{ __( 'Start' ) }
						</span>
						<TextControl
							type="text"
							value={ count_start }
							onChange={ ( value ) =>
								setAttributes( {
									count_start: Number( value ),
								} )
							}
						/>
					</PanelBody>

					<PanelBody title="Typography" initialOpen={ false }>
						<Typography
							attributeName="number_typo"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Background" initialOpen={ false }>
						<Background
							attributeName="number_background"
							excluded={ [ 'video' ] }
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Spacing" initialOpen={ false }>
						<Spacing
							attributeName="number_spacing"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Border" initialOpen={ false }>
						<Border
							attributeName="number_border"
							{ ...this.props }
						/>
					</PanelBody>

					<PanelBody title="Sign" initialOpen={ false }>
						<span className="blpge_inspector_property-title">
							{ __( 'Sign' ) }
						</span>
						<ToggleControl
							label="Enable"
							checked={ signEnable }
							onChange={ ( value ) =>
								setAttributes( {
									signEnable: value,
								} )
							}
						/>
						{ signEnable ? (
							<BlpgeSubPanel
								activeCollections={ {
									Spacing: {
										attrb: 'sign_spacing',
										excluded: [],
									},
									Typography: {
										attrb: 'sign_typo',
										excluded: [],
									},
								} }
								{ ...this.props }
							/>
						) : null }
					</PanelBody>
				</SubBlockInspector>
				<SubBlockInspector { ...this.props } name="description">
					<PanelBody title="Text" initialOpen={ false }>
						<span className="blpge_inspector_property-title">
							{ __( 'Text:' ) }
						</span>
						<ToggleControl
							label="Enable"
							checked={ textEnable }
							onChange={ ( value ) =>
								setAttributes( {
									textEnable: value,
								} )
							}
						/>
						{ textEnable ? (
							<BlpgeSubPanel
								activeCollections={ {
									Spacing: {
										attrb: 'text_spacing',
										excluded: [],
									},
									Typography: {
										attrb: 'text_typo',
										excluded: [],
									},
								} }
								{ ...this.props }
							/>
						) : null }
					</PanelBody>
				</SubBlockInspector>
			</InspectorControls>
		);
	}
}
