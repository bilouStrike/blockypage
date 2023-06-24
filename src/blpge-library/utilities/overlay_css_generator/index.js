// Import CSS Generator Module
import blpge_cssGen from '../../helpers/css-generator/index';

export default function blpge_overlay_cssGen(
	attribute,
	css_selector,
	css_string = ''
) {
	if ( ! attribute ) {
		return css_string;
	}

	const overlay = attribute;
	const properties = [ 'background' ];
	let final_css = css_string;
	const values = [ overlay.color ];
	let final_filter = '';

	// check filters by their default values
	overlay.opacity != 1 && overlay.opacity != undefined
		? ( final_filter += `opacity(${ overlay.opacity }) ` )
		: '';
	overlay.brightness != 1 && overlay.brightness != undefined
		? ( final_filter += `brightness(${ overlay.brightness }) ` )
		: '';
	overlay.contrast != 1 && overlay.contrast != undefined
		? ( final_filter += `contrast(${ overlay.contrast }) ` )
		: '';
	overlay.grayscale != 1 && overlay.grayscale != undefined
		? ( final_filter += `grayscale(${ overlay.grayscale }) ` )
		: '';
	overlay.hue_rotate != 0 && overlay.hue_rotate != undefined
		? ( final_filter += `hue-rotate(${ overlay.hue_rotate }deg) ` )
		: '';
	overlay.invert != 0 && overlay.invert != undefined
		? ( final_filter += `invert(${ overlay.invert }) ` )
		: '';
	overlay.saturate != 1 && overlay.sturate != undefined
		? ( final_filter += `saturate(${ overlay.saturate }) ` )
		: '';
	overlay.sepia != 0 && overlay.spia != undefined
		? ( final_filter += `sepia(${ overlay.sepia }) ` )
		: '';
	if ( final_filter != '' ) {
		final_css = blpge_cssGen(
			`${ css_selector }`,
			[ 'filter' ],
			[ final_filter ],
			final_css
		);
	}

	final_css = blpge_cssGen( css_selector, properties, values, final_css );
	return final_css;
}
