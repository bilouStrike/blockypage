import { emptyStatement } from '@babel/types';

/**
 *
 * Get Device State index from the store
 *
 */
const { select } = wp.data;

export default function blpge_getDeviceStateIndex() {
	let deviceState = 0;
	if ( select( 'blockypage-device-state' ).getDeviceState() ) {
		switch ( select( 'blockypage-device-state' ).getDeviceState() ) {
			case 'default':
				deviceState = 0;
				break;
			case 'tablet':
				deviceState = 1;
				break;
			case 'landscape-mobile':
				deviceState = 2;
				break;
			case 'portrait-mobile':
				deviceState = 3;
				break;
			default:
				deviceState = 0;
				break;
		}
	}
	return deviceState;
}
