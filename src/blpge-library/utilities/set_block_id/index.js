/**
 * set a unique ID for a block using id attribute
 * @param {*} attributeName
 * @param {*} props
 */

export default function blpge_setBlockId( props ) {
	if ( props.clientId != undefined ) {
		if (
			! props.attributes.id ||
			props.attributes.id != props.clientId.slice( 0, 13 )
		) {
			props.setAttributes( { id: props.clientId.slice( 0, 13 ) } );
			return;
		}
	} else {
		console.error(
			"blpge_setBlockId: Can't get the clientID of the block"
		);
		return;
	}
}
