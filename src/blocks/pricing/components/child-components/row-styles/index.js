/**
 *
 * blpge_row Styles Component.
 *
 */

// Import Styles
import './editor.scss';

// Import wp dependencies
const { Component, Fragment } = wp.element;
const { createBlock } = wp.blocks;
const { dispatch, select } = wp.data;

// Import blpge Dependencies
const { blpge_getDeviceStateIndex } = blpgelib.utilities;

export default class RowStyles extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	static defaultProps = {
		inspector: false,
	};

	render() {
		// Destructuring variables
		const {
			inspector,
			attributes: { rowLayout, brp_rowLayout, displayStyles },
			setAttributes,
			clientId,
		} = this.props;

		// Get Device state
		const deviceState = blpge_getDeviceStateIndex();

		/* Head Styles */
		let onToggle;
		if ( this.props.toggle ) {
			onToggle = this.props.toggle;
			() =>
				setAttributes( {
					displayStyles: false,
				} );
		} else {
			onToggle = () => {
				setAttributes( {
					displayStyles: false,
				} );
			};
		}

		// Used When removing a block
		let selectPrevious;

		/*
		 * Assign each style with the number of columns that it has
		 * {numberOfColumns : Styles}
		 */
		const layoutStyle = {
			1: [ '1' ], // 1 column cases
			2: [ '2', '5', '6', '7', '8', '13', '14', '30' ], // 2 columns cases
			3: [ '3', '9', '10', '11', '15', '16', '31', '32', '33' ], // 3 columns cases
			4: [ '4', '17', '18', '19', '20', '34', '35', '36', '37' ], // 4 columns cases
			5: [ '21', '22', '23', '24', '38', '39', '40', '41', '42', '43' ], // % columns cases
			6: [ '12', '44', '45', '46' ], // 6 columns cases
		};

		// Holds The Current Layout
		let columns;
		columns = select( 'core/editor' ).getBlock( clientId ).innerBlocks;
		columns = [ columns, columns.length.toString() ];

		/**
		 * returns the number of columns
		 * @param {string} layout
		 */
		function columnsNumber( layout ) {
			if ( layoutStyle[ '2' ].includes( layout ) ) {
				return '2';
			} else if ( layoutStyle[ '3' ].includes( layout ) ) {
				return '3';
			} else if ( layoutStyle[ '4' ].includes( layout ) ) {
				return '4';
			} else if ( layoutStyle[ '1' ].includes( layout ) ) {
				return '1';
			} else if ( layoutStyle[ '6' ].includes( layout ) ) {
				return '6';
			} else if ( layoutStyle[ '5' ].includes( layout ) ) {
				return '5';
			} else {
				return false;
			}
		}

		/* Compare the number of columns of the chosen style to 
         the existing columns in the editor */
		function compareColumnsNumber( layout ) {
			if ( columnsNumber( layout ) == columns[ 1 ] ) {
				return 'same';
			} else if (
				Number( columns[ 1 ] ) < Number( columnsNumber( layout ) )
			) {
				return 'smaller';
			} else if (
				Number( columns[ 1 ] ) > Number( columnsNumber( layout ) )
			) {
				return 'bigger';
			}
		}

		/**
		 *
		 * Update Layout in case we have The same number of columns on the editor
		 * with the  choosen style ( That includes Breakpoints layouts too )
		 *
		 * @param {Object[]} Array of new attributes
		 */
		function updateLayoutWithSameColumns( sizes_array ) {
			for ( let i = 0; i < sizes_array.length; i++ ) {
				switch ( deviceState ) {
					case 0:
						dispatch( 'core/block-editor' ).updateBlockAttributes(
							columns[ 0 ][ i ].clientId,
							{
								columnSize: sizes_array[ i ],
							}
						);
						break;
					case 1:
						let new_brp_columnSize_1 = select( 'core/block-editor' )
							.getBlockAttributes( columns[ 0 ][ i ].clientId )
							.brp_columnSize.slice();
						new_brp_columnSize_1[ 0 ] = sizes_array[ i ];
						let new_attribute_1 = {};
						new_attribute_1.brp_columnSize = new_brp_columnSize_1;
						dispatch( 'core/block-editor' ).updateBlockAttributes(
							columns[ 0 ][ i ].clientId,
							new_attribute_1
						);
						break;

					case 2:
						let new_brp_columnSize_2 = select( 'core/block-editor' )
							.getBlockAttributes( columns[ 0 ][ i ].clientId )
							.brp_columnSize.slice();
						new_brp_columnSize_2[ 1 ] = sizes_array[ i ];
						let new_attribute_2 = {};
						new_attribute_2.brp_columnSize = new_brp_columnSize_2;
						dispatch( 'core/block-editor' ).updateBlockAttributes(
							columns[ 0 ][ i ].clientId,
							new_attribute_2
						);
						break;

					case 3:
						let new_brp_columnSize_3 = select( 'core/block-editor' )
							.getBlockAttributes( columns[ 0 ][ i ].clientId )
							.brp_columnSize.slice();
						new_brp_columnSize_3[ 2 ] = sizes_array[ i ];
						let new_attribute_3 = {};
						new_attribute_3.brp_columnSize = new_brp_columnSize_3;
						dispatch( 'core/block-editor' ).updateBlockAttributes(
							columns[ 0 ][ i ].clientId,
							new_attribute_3
						);
						break;
					default:
						break;
				}
			}
		}

		/**
		 *
		 * Update Layout in case the number of columns in the editor
		 * is smaller than the number of columns in the choosen style
		 *
		 * @param {string} The Id of The Row
		 * @param {Object[]} Array of columns size
		 *
		 */
		function updateLayoutWithLessColumns( row_id, sizes_array ) {
			// Change Existing Columns Attributes
			let i; // Index Tracker
			for ( i = 0; i < Number( columns[ 1 ] ); i++ ) {
				dispatch( 'core/block-editor' ).updateBlockAttributes(
					columns[ 0 ][ i ].clientId,
					{
						columnSize: sizes_array[ i ],
					}
				);
			}
			// Add Missing Columns
			for ( i + 1; i < sizes_array.length; i++ ) {
				let blocks = [];
				let block = createBlock( 'blockypage-blocks/pricing', {
					columnSize: sizes_array[ i ],
				} );
				blocks.push( block );
				dispatch( 'core/block-editor' ).insertBlocks(
					blocks,
					i,
					row_id
				);
			}
		}

		/**
		 * Update Layout in case the number of columns in the editor
		 * is bigger than the number of columns in the choosen style
		 *
		 * @param {string} The Id of The Row
		 * @param {Object[]} Array of columns size
		 */
		function updateLayoutWithMoreColumns( row_id, sizes_array ) {
			// Change Existing Columns Sizes
			let i; // Index Tracker
			for ( i = 0; i < sizes_array.length; i++ ) {
				dispatch( 'core/block-editor' ).updateBlockAttributes(
					columns[ 0 ][ i ].clientId,
					{
						columnSize: sizes_array[ i ],
					}
				);
			}

			// Get content from the rest columns
			let content = [];
			const last_column_index = i - 1;
			for ( i + 1; i < Number( columns[ 1 ] ); i++ ) {
				for (
					let j = 0;
					j < columns[ 0 ][ i ].innerBlocks.length;
					j++
				) {
					if (
						columns[ 0 ][ i ].innerBlocks[ j ].name !=
						'blockypage-blocks/blank'
					) {
						content.push( columns[ 0 ][ i ].innerBlocks[ j ] );
					}
				}
				// Remove blocks
				dispatch( 'core/block-editor' ).removeBlock(
					columns[ 0 ][ i ].clientId,
					( selectPrevious = false )
				);
			}

			// Insert content to the last column
			for ( let k = 0; k < content.length; k++ ) {
				dispatch( 'core/block-editor' ).insertBlock(
					content[ k ],
					99 + k,
					columns[ 0 ][ last_column_index ].clientId
				);
			}
		}

		/**
		 * Update Layout In All Cases
		 * @param {string} The Id of The Row
		 * @param {Object[]} Array of new attributes
		 */
		function updateLayout( style, row_id, sizes_array ) {
			if ( compareColumnsNumber( style ) == 'same' ) {
				updateLayoutWithSameColumns( sizes_array );
				dispatch( 'core/block-editor' ).selectBlock( row_id );
			} else if ( compareColumnsNumber( style ) == 'smaller' ) {
				updateLayoutWithLessColumns( row_id, sizes_array );
				dispatch( 'core/block-editor' ).selectBlock( row_id );
			} else {
				updateLayoutWithMoreColumns( row_id, sizes_array );
				dispatch( 'core/block-editor' ).selectBlock( row_id );
			}
		}

		// Function To Execute When The User Changes The blpge_row Style
		function createLayout( value ) {
			// Update The Attributes
			const styleNumber = value.currentTarget.dataset.style;
			let new_rowLayout = rowLayout;
			new_rowLayout = styleNumber;
			if ( ! ( inspector & ( deviceState != 0 ) ) ) {
				setAttributes( {
					rowLayout: new_rowLayout,
				} );
			} else {
				let new_brp_deviceState = brp_rowLayout.slice();
				new_brp_deviceState[ deviceState - 1 ] = styleNumber;
				setAttributes( {
					brp_rowLayout: new_brp_deviceState,
				} );
			}

			switch ( styleNumber ) {
				/********************************************************************
				 *
				 * Default cases
				 * data-style 1 - 29
				 *
				 ********************************************************************/
				/**
				 * 1 column
				 */
				case '1':
					updateLayout( styleNumber, clientId, [ '12' ] );
					break;

				/**
				 * Two Columns Cases
				 */
				case '2':
					updateLayout( styleNumber, clientId, [ '6', '6' ] );
					break;

				case '5':
					updateLayout( styleNumber, clientId, [ '8', '4' ] );
					break;

				case '6':
					updateLayout( styleNumber, clientId, [ '4', '8' ] );
					break;

				case '7':
					updateLayout( styleNumber, clientId, [ '9', '3' ] );
					break;

				case '8':
					updateLayout( styleNumber, clientId, [ '3', '9' ] );
					break;

				case '13':
					updateLayout( styleNumber, clientId, [ '2', '10' ] );
					break;

				case '14':
					updateLayout( styleNumber, clientId, [ '10', '2' ] );
					break;

				/**
				 * Three Columns Cases
				 */
				case '3':
					updateLayout( styleNumber, clientId, [ '4', '4', '4' ] );
					break;

				case '9':
					updateLayout( styleNumber, clientId, [ '6', '3', '3' ] );
					break;

				case '10':
					updateLayout( styleNumber, clientId, [ '3', '3', '6' ] );
					break;

				case '11':
					updateLayout( styleNumber, clientId, [ '3', '6', '3' ] );
					break;

				case '15':
					updateLayout( styleNumber, clientId, [ '8', '2', '2' ] );
					break;

				case '16':
					updateLayout( styleNumber, clientId, [ '2', '2', '8' ] );
					break;

				/**
				 * Four Columns Cases
				 */
				case '4':
					updateLayout( styleNumber, clientId, [
						'3',
						'3',
						'3',
						'3',
					] );
					break;

				case '17':
					updateLayout( styleNumber, clientId, [
						'4',
						'4',
						'2',
						'2',
					] );
					break;

				case '18':
					updateLayout( styleNumber, clientId, [
						'2',
						'2',
						'4',
						'4',
					] );
					break;

				case '19':
					updateLayout( styleNumber, clientId, [
						'6',
						'2',
						'2',
						'2',
					] );
					break;

				case '20':
					updateLayout( styleNumber, clientId, [
						'2',
						'2',
						'2',
						'6',
					] );
					break;

				/**
				 * five Columns Cases
				 */
				case '21':
					updateLayout( styleNumber, clientId, [
						'24',
						'24',
						'24',
						'24',
						'24',
					] );
					break;

				case '22':
					updateLayout( styleNumber, clientId, [
						'2',
						'2',
						'2',
						'2',
						'4',
					] );
					break;
				case '23':
					updateLayout( styleNumber, clientId, [
						'4',
						'2',
						'2',
						'2',
						'2',
					] );
					break;

				case '24':
					updateLayout( styleNumber, clientId, [
						'2',
						'2',
						'4',
						'2',
						'2',
					] );
					break;

				/**
				 * Six Columns Cases
				 */
				case '12':
					updateLayout( styleNumber, clientId, [
						'2',
						'2',
						'2',
						'2',
						'2',
						'2',
					] );
					break;

				/********************************************************************
				 *
				 * Inspector Special cases
				 * data-style starts 30 and up
				 *
				 ********************************************************************/

				/**
				 * Two Columns Cases
				 */
				case '30':
					updateLayout( styleNumber, clientId, [ '12', '12' ] );
					break;

				/**
				 * Three Columns Cases
				 */
				case '31':
					updateLayout( styleNumber, clientId, [ '12', '6', '6' ] );
					break;

				case '32':
					updateLayout( styleNumber, clientId, [ '6', '6', '12' ] );
					break;

				case '33':
					updateLayout( styleNumber, clientId, [ '12', '12', '12' ] );
					break;

				/**
				 * 4 Columns Cases
				 */
				case '34':
					updateLayout( styleNumber, clientId, [
						'12',
						'4',
						'4',
						'4',
					] );
					break;

				case '35':
					updateLayout( styleNumber, clientId, [
						'4',
						'4',
						'4',
						'12',
					] );
					break;

				case '36':
					updateLayout( styleNumber, clientId, [
						'6',
						'6',
						'6',
						'6',
					] );
					break;

				case '37':
					updateLayout( styleNumber, clientId, [
						'12',
						'12',
						'12',
						'12',
					] );
					break;

				/**
				 * 5 Columns Cases
				 */
				case '38':
					updateLayout( styleNumber, clientId, [
						'4',
						'4',
						'4',
						'6',
						'6',
					] );
					break;

				case '39':
					updateLayout( styleNumber, clientId, [
						'6',
						'6',
						'4',
						'4',
						'4',
					] );
					break;

				case '40':
					updateLayout( styleNumber, clientId, [
						'6',
						'6',
						'12',
						'6',
						'6',
					] );
					break;

				case '41':
					updateLayout( styleNumber, clientId, [
						'6',
						'6',
						'6',
						'6',
						'12',
					] );
					break;

				case '42':
					updateLayout( styleNumber, clientId, [
						'12',
						'6',
						'6',
						'6',
						'6',
					] );
					break;

				case '43':
					updateLayout( styleNumber, clientId, [
						'12',
						'12',
						'12',
						'12',
						'12',
					] );
					break;

				/**
				 * 6 Columns Cases
				 */
				case '44':
					updateLayout( styleNumber, clientId, [
						'4',
						'4',
						'4',
						'4',
						'4',
						'4',
					] );
					break;

				case '45':
					updateLayout( styleNumber, clientId, [
						'6',
						'6',
						'6',
						'6',
						'6',
						'6',
					] );
					break;

				case '46':
					updateLayout( styleNumber, clientId, [
						'12',
						'12',
						'12',
						'12',
						'12',
						'12',
					] );
					break;
				default:
					break;
			}
		}

		// JSX Marckup For Different cases
		// 1 column
		const marckup_col_1 = (
			<Fragment>
				<div
					className="blpge_row blpge_row--select-style-container"
					data-style="1"
					onClick={ ( e ) => {
						createLayout( e );
						onToggle();
					} }
				>
					<div className="blpge_row__col--12 blpge_row__col--select-style">
						1
					</div>
				</div>
			</Fragment>
		);

		// 2 columns
		const marckup_col_2 = (
			<Fragment>
				<div
					class="blpge_row blpge_row--select-style-container"
					data-style="2"
					onClick={ ( e ) => {
						createLayout( e );
						onToggle();
					} }
				>
					<div class="blpge_row__col--6 blpge_row__col--select-style">
						1/2
					</div>

					<div class="blpge_row__col--6 blpge_row__col--select-style">
						1/2
					</div>
				</div>
				{ ! toolbar || inspector ? (
					<Fragment>
						<div
							class="blpge_row blpge_row--select-style-container"
							data-style="5"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div class="blpge_row__col--8 blpge_row__col--select-style">
								2/3
							</div>

							<div class="blpge_row__col--4 blpge_row__col--select-style">
								1/3
							</div>
						</div>

						<div
							class="blpge_row blpge_row--select-style-container"
							data-style="6"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div class="blpge_row__col--4 blpge_row__col--select-style">
								1/3
							</div>

							<div class="blpge_row__col--8 blpge_row__col--select-style">
								2/3
							</div>
						</div>

						<div
							className="blpge_row blpge_row--select-style-container"
							data-style="7"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div className="blpge_row__col--9 blpge_row__col--select-style">
								3/4
							</div>

							<div className="blpge_row__col--3 blpge_row__col--select-style">
								1/4
							</div>
						</div>

						<div
							class="blpge_row blpge_row--select-style-container"
							data-style="8"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div class="blpge_row__col--3 blpge_row__col--select-style">
								1/4
							</div>
							<div class="blpge_row__col--9 blpge_row__col--select-style">
								3/4
							</div>
						</div>

						<div
							class="blpge_row blpge_row--select-style-container"
							data-style="13"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/6
							</div>
							<div class="blpge_row__col--10 blpge_row__col--select-style">
								5/6
							</div>
						</div>

						<div
							class="blpge_row blpge_row--select-style-container"
							data-style="14"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div class="blpge_row__col--10 blpge_row__col--select-style">
								5/6
							</div>
							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/6
							</div>
						</div>
					</Fragment>
				) : null }
			</Fragment>
		);

		// 3 columns
		const marckup_col_3 = (
			<Fragment>
				<div
					class="blpge_row blpge_row--select-style-container"
					data-style="3"
					onClick={ ( e ) => {
						createLayout( e );
						onToggle();
					} }
				>
					<div class="blpge_row__col--4 blpge_row__col--select-style">
						1/3
					</div>

					<div class="blpge_row__col--4 blpge_row__col--select-style">
						1/3
					</div>

					<div class="blpge_row__col--4 blpge_row__col--select-style">
						1/3
					</div>
				</div>
				{ ! toolbar || inspector ? (
					<Fragment>
						<div
							class="blpge_row blpge_row--select-style-container"
							data-style="9"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div class="blpge_row__col--6 blpge_row__col--select-style">
								1/2
							</div>

							<div class="blpge_row__col--3 blpge_row__col--select-style">
								1/4
							</div>

							<div class="blpge_row__col--3 blpge_row__col--select-style">
								1/4
							</div>
						</div>
						<div
							className="blpge_row blpge_row--select-style-container"
							data-style="10"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div className="blpge_row__col--3 blpge_row__col--select-style">
								1/4
							</div>

							<div className="blpge_row__col--3 blpge_row__col--select-style">
								1/4
							</div>

							<div className="blpge_row__col--6 blpge_row__col--select-style">
								1/2
							</div>
						</div>

						<div
							class="blpge_row blpge_row--select-style-container"
							data-style="11"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div class="blpge_row__col--3 blpge_row__col--select-style">
								1/4
							</div>

							<div class="blpge_row__col--6 blpge_row__col--select-style">
								1/2
							</div>

							<div class="blpge_row__col--3 blpge_row__col--select-style">
								1/4
							</div>
						</div>

						<div
							class="blpge_row blpge_row--select-style-container"
							data-style="15"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div class="blpge_row__col--8 blpge_row__col--select-style">
								8/12
							</div>

							<div class="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>

							<div class="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>
						</div>

						<div
							class="blpge_row blpge_row--select-style-container"
							data-style="16"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div class="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>

							<div class="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>

							<div class="blpge_row__col--8 blpge_row__col--select-style">
								8/12
							</div>
						</div>
					</Fragment>
				) : null }
			</Fragment>
		);

		// 4 columns
		const marckup_col_4 = (
			<Fragment>
				<div
					className="blpge_row blpge_row--select-style-container"
					data-style="4"
					onClick={ ( e ) => {
						createLayout( e );
						onToggle();
					} }
				>
					<div className="blpge_row__col--3 blpge_row__col--select-style">
						1/4
					</div>

					<div className="blpge_row__col--3 blpge_row__col--select-style">
						1/4
					</div>

					<div className="blpge_row__col--3 blpge_row__col--select-style">
						1/4
					</div>

					<div class="blpge_row__col--3 blpge_row__col--select-style">
						1/4
					</div>
				</div>
				{ ! toolbar || inspector ? (
					<Fragment>
						<div
							className="blpge_row blpge_row--select-style-container"
							data-style="17"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div className="blpge_row__col--4 blpge_row__col--select-style">
								4/12
							</div>

							<div className="blpge_row__col--4 blpge_row__col--select-style">
								4/12
							</div>

							<div className="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>

							<div class="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>
						</div>

						<div
							className="blpge_row blpge_row--select-style-container"
							data-style="18"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div className="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>

							<div className="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>

							<div className="blpge_row__col--4 blpge_row__col--select-style">
								4/12
							</div>

							<div class="blpge_row__col--4 blpge_row__col--select-style">
								4/12
							</div>
						</div>

						<div
							className="blpge_row blpge_row--select-style-container"
							data-style="19"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div className="blpge_row__col--6 blpge_row__col--select-style">
								6/12
							</div>

							<div className="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>

							<div className="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>

							<div class="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>
						</div>

						<div
							className="blpge_row blpge_row--select-style-container"
							data-style="20"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div className="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>

							<div className="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>

							<div className="blpge_row__col--2 blpge_row__col--select-style">
								2/12
							</div>

							<div class="blpge_row__col--6 blpge_row__col--select-style">
								6/12
							</div>
						</div>
					</Fragment>
				) : null }
			</Fragment>
		);

		// 5 columns
		const marckup_col_5 = (
			<Fragment>
				<div
					class="blpge_row blpge_row--select-style-container"
					data-style="21"
					onClick={ ( e ) => {
						createLayout( e );
						onToggle();
					} }
				>
					<div class="blpge_row__col--24 blpge_row__col--select-style">
						1/5
					</div>

					<div class="blpge_row__col--24 blpge_row__col--select-style">
						1/5
					</div>

					<div class="blpge_row__col--24 blpge_row__col--select-style">
						1/5
					</div>
					<div class="blpge_row__col--24 blpge_row__col--select-style">
						1/5
					</div>

					<div class="blpge_row__col--24 blpge_row__col--select-style">
						1/5
					</div>
				</div>

				{ ! toolbar || inspector ? (
					<Fragment>
						<div
							class="blpge_row blpge_row--select-style-container"
							data-style="22"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/5
							</div>

							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/5
							</div>

							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/5
							</div>
							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/5
							</div>

							<div class="blpge_row__col--4 blpge_row__col--select-style">
								1/5
							</div>
						</div>

						<div
							class="blpge_row blpge_row--select-style-container"
							data-style="23"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div class="blpge_row__col--4 blpge_row__col--select-style">
								1/5
							</div>

							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/5
							</div>

							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/5
							</div>
							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/5
							</div>

							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/5
							</div>
						</div>

						<div
							class="blpge_row blpge_row--select-style-container"
							data-style="24"
							onClick={ ( e ) => {
								createLayout( e );
								onToggle();
							} }
						>
							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/5
							</div>

							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/5
							</div>

							<div class="blpge_row__col--4 blpge_row__col--select-style">
								1/5
							</div>
							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/5
							</div>

							<div class="blpge_row__col--2 blpge_row__col--select-style">
								1/5
							</div>
						</div>
					</Fragment>
				) : null }
			</Fragment>
		);
		// 6 columns
		const marckup_col_6 = (
			<Fragment>
				<div
					class="blpge_row blpge_row--select-style-container"
					data-style="12"
					onClick={ ( e ) => {
						createLayout( e );
						onToggle();
					} }
				>
					<div class="blpge_row__col--2 blpge_row__col--select-style">
						1/6
					</div>

					<div class="blpge_row__col--2 blpge_row__col--select-style">
						1/6
					</div>

					<div class="blpge_row__col--2 blpge_row__col--select-style">
						1/6
					</div>
					<div class="blpge_row__col--2 blpge_row__col--select-style">
						1/6
					</div>

					<div class="blpge_row__col--2 blpge_row__col--select-style">
						1/6
					</div>

					<div class="blpge_row__col--2 blpge_row__col--select-style">
						1/6
					</div>
				</div>
			</Fragment>
		);

		/********************************************************************
		 *
		 * Inspector Special Cases To The Markup
		 *
		 ********************************************************************/
		// 2 columns
		const marckup_col_inspector_2 =
			deviceState != 0 ? (
				<Fragment>
					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="30"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1
						</div>

						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1
						</div>
					</div>
				</Fragment>
			) : null;

		// 3 columns
		const marckup_col_inspector_3 =
			deviceState != 0 ? (
				<Fragment>
					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="31"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
					</div>

					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="32"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
					</div>

					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="33"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
					</div>
				</Fragment>
			) : null;

		// 4 columns
		const marckup_col_inspector_4 =
			deviceState != 0 ? (
				<Fragment>
					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="34"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
					</div>

					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="35"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
					</div>

					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="36"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
					</div>

					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="37"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '8.75px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '8.75px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '8.75px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '8.75px' } }
						>
							1/2
						</div>
					</div>
				</Fragment>
			) : null;

		// 5 columns
		const marckup_col_inspector_5 =
			deviceState != 0 ? (
				<Fragment>
					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="38"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
					</div>

					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="39"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
					</div>

					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="40"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
					</div>

					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="41"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
					</div>

					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="42"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
					</div>

					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="43"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '5.83px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '5.83px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '5.83px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '5.83px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '5.83px' } }
						>
							1/2
						</div>
					</div>
				</Fragment>
			) : null;

		// 6 columns
		const marckup_col_inspector_6 =
			deviceState != 0 ? (
				<Fragment>
					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="44"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--4 blpge_row__col--select-style"
							style={ { height: '17.5px' } }
						>
							1/2
						</div>
					</div>

					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="45"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--6 blpge_row__col--select-style"
							style={ { height: '11.66px' } }
						>
							1/2
						</div>
					</div>

					<div
						class="blpge_row blpge_row--select-style-container"
						data-style="46"
						onClick={ ( e ) => {
							createLayout( e );
							onToggle();
						} }
					>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '5.83px' } }
						>
							1
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '5.83px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '5.83px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '5.83px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '5.83px' } }
						>
							1/2
						</div>
						<div
							class="blpge_row__col--12 blpge_row__col--select-style"
							style={ { height: '5.83px' } }
						>
							1/2
						</div>
					</div>
				</Fragment>
			) : null;

		// On select style
		let blpge_selected_container_style = '';
		switch ( deviceState ) {
			case 0:
				if ( rowLayout != 1 ) {
					blpge_selected_container_style += `
          div[data-style="${ rowLayout }"] {
              border: 1px solid #333;
          }
          `;
				}

				break;

			case 1:
				if ( brp_rowLayout[ 0 ] != 1 ) {
					blpge_selected_container_style += `
            div[data-style="${ brp_rowLayout[ 0 ] }"] {
              border: 1px solid #333;
            }`;
				}
				break;

			case 2:
				if ( brp_rowLayout[ 1 ] != 1 ) {
					blpge_selected_container_style += `
              div[data-style="${ brp_rowLayout[ 1 ] }"] {
                border: 1px solid #333;
              }`;
				}
				break;

			case 3:
				if ( brp_rowLayout[ 0 ] != 2 ) {
					blpge_selected_container_style += `
                div[data-style="${ brp_rowLayout[ 2 ] }"] {
                  border: 1px solid #333;
                }`;
				}
				break;

			default:
				break;
		}

		return (
			<div
				className={ `blpge_container blpge_style-container ${
					this.props.toolbar ? 'blpge_style-container-displayed' : ''
				}` }
				style={ ! displayStyles ? { display: 'none' } : null }
			>
				<div
					className="blpge_row blpge_row--select-style-menu"
					style={ this.props.inspector ? { display: 'none' } : null }
				>
					{ [
						marckup_col_1,
						marckup_col_2,
						marckup_col_3,
						marckup_col_4,
						marckup_col_5,
						marckup_col_6,
					] }
				</div>

				{ /** What to display on the inspector  */ }
				<div
					className="blpge_row blpge_row--select-style-menu"
					style={
						! this.props.inspector ? { display: 'none' } : null
					}
				>
					{ columns[ 1 ] == '1' ? marckup_col_1 : null }
					{ columns[ 1 ] == '2'
						? [ marckup_col_2, marckup_col_inspector_2 ]
						: null }
					{ columns[ 1 ] == '3'
						? [ marckup_col_3, marckup_col_inspector_3 ]
						: null }
					{ columns[ 1 ] == '4'
						? [ marckup_col_4, marckup_col_inspector_4 ]
						: null }
					{ columns[ 1 ] == '5'
						? [ marckup_col_5, marckup_col_inspector_5 ]
						: null }
					{ columns[ 1 ] == '6'
						? [ marckup_col_6, marckup_col_inspector_6 ]
						: null }
				</div>

				{ inspector && blpge_selected_container_style ? (
					<style
						dangerouslySetInnerHTML={ {
							__html: blpge_selected_container_style,
						} }
					/>
				) : null }
			</div>
		);
	}
}
