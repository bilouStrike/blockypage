export default function blpge_showDsValue( object, deviceState ) {
	if ( Array.isArray( object ) ) {
		return object[ deviceState ];
	} else {
		return null;
	}
}
