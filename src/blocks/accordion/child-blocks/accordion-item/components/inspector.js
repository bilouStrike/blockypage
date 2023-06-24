/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
const { Component } = wp.element;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody } = wp.components;

// Import blockypage dependencies
const { BlpgeSubPanel } = blpgelib.components;

export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<InspectorControls>
				{ /* Accordion titles Settings */ }
				<PanelBody
					{ ...this.props }
					title="Title"
					initialOpen={ false }
				>
					<BlpgeSubPanel
						activeCollections={ {
							Typography: {
								attrb: 'tabTypography',
								excluded: [],
							},
							Border: { attrb: 'tabBorder', excluded: [] },
							Background: {
								attrb: 'tabBackground',
								excluded: [ 'video', 'activeTab' ],
							},
							Spacing: { attrb: 'tabSpacing', excluded: [] },
						} }
						{ ...this.props }
					/>
				</PanelBody>
				<PanelBody
					{ ...this.props }
					title="Content"
					initialOpen={ false }
				>
					<BlpgeSubPanel
						activeCollections={ {
							Typography: { attrb: 'contentTypo', excluded: [] },
							Border: { attrb: 'contentBorder', excluded: [] },
							Background: {
								attrb: 'contentBackground',
								excluded: [ 'video', 'activeTab' ],
							},
							Spacing: { attrb: 'contentSpacing', excluded: [] },
						} }
						{ ...this.props }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
