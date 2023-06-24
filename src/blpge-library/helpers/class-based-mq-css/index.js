// Define Breakpoints
let blpge_breakpoints = {
	xs: '@media (max-width: 575.98px)',
	sm: '@media (min-width: 576px) and (max-width: 767.98px)',
	md: '@media (min-width: 768px) and (max-width: 991.98px)',
};

// RegexEscape function
function blpge_regExpEscape( literal_string ) {
	return literal_string.replace( /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&' );
}

// index tracking function
function blpge_index_tracker( i ) {
	i += 1;
}

/**
 * class based mediaqueries css
 */
export default function class_based_mq_css( css_string ) {
	// Final CSS
	let final_css = css_string;

	// Index tracker
	let i = 0;

	// Escape Strings to replace
	let mobile_portrait_string = blpge_regExpEscape(
		`${ blpge_breakpoints.xs }\{`
	);
	let mobile_landscape_string = blpge_regExpEscape(
		`${ blpge_breakpoints.sm }\{`
	);
	let tablet_string = blpge_regExpEscape( `${ blpge_breakpoints.md }\{` );

	// Regex variables
	let mobile_portrait_regex = new RegExp( mobile_portrait_string, 'g' );

	const mobile_landscape_regex = new RegExp( mobile_landscape_string, 'g' );

	const tablet_regex = new RegExp( tablet_string, 'g' );

	final_css = final_css.replace( mobile_portrait_regex, function () {
		i = i + 1;
		return '.blpge_is-mobile-portrait ';
	} );

	final_css = final_css.replace( mobile_landscape_regex, function () {
		i = i + 1;
		return '.blpge_is-mobile-landscape ';
	} );
	final_css = final_css.replace(
		tablet_regex,
		function () {
			i = i + 1;
			return '.blpge_is-tablet ';
		},
		blpge_index_tracker( i )
	);

	// Remove the extra closing brackets
	final_css = final_css.replace( /}}/g, '}' );

	return final_css;
}
