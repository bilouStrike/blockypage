// Define Breakpoints
let blpge_breakpoints = {
	xs: '@media (max-width: 575.98px)',
	sm: '@media (min-width: 576px) and (max-width: 767.98px)',
	md: '@media (min-width: 768px) and (max-width: 991.98px)',
};

// Check if array of arrays
function checkArrayOfArrays( a ) {
	return a.every( function ( x ) {
		return Array.isArray( x );
	} );
}

// One Line CSS Rule Function
function one_line_css_rule( prop, values ) {
	let result;
	if ( prop ) {
		result = `${ prop }:`;
		if ( values != null && values != undefined ) {
			if ( Array.isArray( values ) ) {
				for ( let value of values ) {
					if ( value != null && value != undefined ) {
						result += value;
					} else {
						return '';
					}
				}
			} else {
				result += values;
			}
		} else {
			return '';
		}
	} else {
		return '';
	}
	return `${ result };`;
}

// CSS Generator Function
export default function blpge_cssGen(
	css_selector,
	properties,
	values,
	style_string = ''
) {
	// Final CSS string to return
	let final_style_rules = style_string;

	// Validating function arguments
	if ( typeof css_selector !== 'string' ) {
		console.error( 'css_gen: css_selector Should Be a String' );
		return;
	}

	if ( ! Array.isArray( properties ) || ! Array.isArray( values ) ) {
		console.error( 'css_gen: Properties And Values Should Be Arrays!' );
		return;
	}

	if ( properties.length != values.length ) {
		console.error(
			'css_gen: Properties And Values Should Have The Same Length'
		);
		return;
	}
	css_selector = `.blpge_block-first-wrapper .blpge_block-second-wrapper ${ css_selector }`;
	// CSS rules starting for diff. breakpoints
	let default_style_rules = `${ css_selector }{`;
	let medium_style_rules = `${ blpge_breakpoints.md }{${ css_selector }{`;
	let small_style_rules = `${ blpge_breakpoints.sm }{${ css_selector }{`;
	let xsmall_style_rules = `${ blpge_breakpoints.xs }{${ css_selector }{`;

	// Breakpoint helper variables
	let thereIs_default = 0;
	let thereIs_mdBp = 0;
	let thereIs_smBp = 0;
	let thereIs_xsBp = 0;

	// Start Loop
	for ( let i = 0; i < values.length; i++ ) {
		if ( properties[ i ] ) {
			if ( Array.isArray( values[ i ] ) ) {
				if ( checkArrayOfArrays( values[ i ] ) ) {
					if ( values[ i ].length != 4 ) {
						console.error(
							"css_gen: One Of The Values doesn't have 4 values for 4 breakpoints exactly! "
						);
						return;
					} else {
						for ( let j = 0; j < 4; j++ ) {
							switch ( j ) {
								case 0:
									if (
										one_line_css_rule(
											properties[ i ],
											values[ i ][ j ]
										)
									) {
										default_style_rules += one_line_css_rule(
											properties[ i ],
											values[ i ][ j ]
										);
										thereIs_default += 1;
									}
									break;
								case 1:
									if (
										one_line_css_rule(
											properties[ i ],
											values[ i ][ j ]
										)
									) {
										medium_style_rules += one_line_css_rule(
											properties[ i ],
											values[ i ][ j ]
										);
										thereIs_mdBp += 1;
									}
									break;
								case 2:
									if (
										one_line_css_rule(
											properties[ i ],
											values[ i ][ j ]
										)
									) {
										small_style_rules += one_line_css_rule(
											properties[ i ],
											values[ i ][ j ]
										);

										thereIs_smBp += 1;
									}
									break;
								case 3:
									if (
										one_line_css_rule(
											properties[ i ],
											values[ i ][ j ]
										)
									) {
										xsmall_style_rules += one_line_css_rule(
											properties[ i ],
											values[ i ][ j ]
										);

										thereIs_xsBp += 1;
									}
									break;
								default:
									break;
							}
						}
					}
				} else {
					if ( one_line_css_rule( properties[ i ], values[ i ] ) ) {
						default_style_rules += one_line_css_rule(
							properties[ i ],
							values[ i ]
						);
						thereIs_default += 1;
					}
				}
			} else {
				if ( one_line_css_rule( properties[ i ], values[ i ] ) ) {
					default_style_rules += one_line_css_rule(
						properties[ i ],
						values[ i ]
					);
					thereIs_default += 1;
				}
			}
		} else {
			return final_style_rules;
		}
	} // End loop

	if ( thereIs_default > 0 ) {
		final_style_rules += `${ default_style_rules }}`;
	}

	if ( thereIs_mdBp > 0 ) {
		final_style_rules += `${ medium_style_rules }}}`;
	}

	if ( thereIs_smBp > 0 ) {
		final_style_rules += `${ small_style_rules }}}`;
	}

	if ( thereIs_xsBp > 0 ) {
		final_style_rules += `${ xsmall_style_rules }}}`;
	}

	// Get All the import statements to the top
	let imports_statements = [];
	let fonts = '';

	// Array of all the import statemnet on the css
	imports_statements = final_style_rules.match(
		/(\@import\ url\(\"https:\/\/fonts.googleapis.com.*?\;)/g
	);

	if ( Array.isArray( imports_statements ) ) {
		if ( imports_statements.length > 0 ) {
			// Remove All import Statement
			final_style_rules = final_style_rules.replace(
				/(\@import\ url\(\"https:\/\/fonts.googleapis.com.*?\;)/g,
				''
			);

			// push the fonts to the arrays
			for ( let ele of imports_statements ) {
				final_style_rules =
					`@import url("https://fonts.googleapis.com/css?family=${ ele.slice(
						53,
						-3
					) }");` + final_style_rules;
			}
		}
	}

	return final_style_rules;
}
