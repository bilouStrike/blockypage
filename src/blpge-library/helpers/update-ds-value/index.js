export default function blpge_updateDeviceStateValue(
	rootObject,
	nestingList = [],
	deviceState,
	value
) {
	var my_value = value;
	if ( value == 0 ) {
		my_value = 0;
	}

	if ( ! Array.isArray( nestingList ) ) {
		console.error(
			'updateValueWithDeviceState: nestingList should be an Array'
		);
		return;
	}

	let newObject = rootObject;
	let nesting = 'newObject';
	for ( let i = 0; i < nestingList.length; i++ ) {
		nesting += `["${ nestingList[ i ] }"]`;
		if ( i == nestingList.length - 1 ) {
			if ( ! eval( nesting ) ) {
				eval(
					`${ nesting } = [];
             ${ nesting }[${ deviceState }] = my_value;
             `
				);
			} else {
				eval( `
          ${ nesting }[${ deviceState }] = my_value` );
			}
		}
	}
	return newObject;
}
