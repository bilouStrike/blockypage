// Import CSS Generator Module
import blpge_cssGen from '../../helpers/css-generator/index';

export default function blpge_transform_cssGen(
	attribute,
	css_selector,
	css_string = ''
) {
	if ( ! attribute ) {
		return css_string;
	}

	const transform = attribute;
	const properties = [ 'background' ];
	let final_css = css_string;
	const values = [ overlay.color ];
	let final_filter = '';

	// check filters by their default values
	overlay.opacity != 1
		? ( final_filter += `opacity(${ overlay.opacity }) ` )
		: '';

	final_css = blpge_cssGen(
		`${ css_selector }`,
		[ 'filter' ],
		[ final_filter ],
		final_css
	);

	final_css = blpge_cssGen( css_selector, properties, values, final_css );
	return final_css;
}
