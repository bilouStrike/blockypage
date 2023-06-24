// Import CSS Generator Module
import blpge_cssGen from '../../helpers/css-generator/index';

// Shadow CSS Code Generator
export default function blpge_shadow_cssGen(
	attribute,
	css_selector,
	css_string = ''
) {
	if ( ! attribute ) {
		return css_string;
	}

	const shadowObject = attribute;
	if (
		shadowObject.hoffset ||
		shadowObject.voffset ||
		shadowObject.blur ||
		shadowObject.spread
	) {
		return blpge_cssGen(
			css_selector,
			[ 'box-shadow' ],
			[
				`${ shadowObject.position } ${ shadowObject.hoffset }px ${ shadowObject.voffset }px ${ shadowObject.blur }px ${ shadowObject.spread }px ${ shadowObject.color }`,
			],
			css_string
		);
	} else {
		return css_string;
	}
}
