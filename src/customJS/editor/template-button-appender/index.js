// Import wp dependencies
const { render } = wp.element;

const { BlpgeLibrary } = blpgelib.editor;

window.onload = () => {
	// blpge mode switch btn append
	jQuery( '.edit-post-header-toolbar' ).append(
		`<div class="blpge_main_buttons"><span id='blpge_layout_button'> </span></div>`
	);

	// Insert Buttons
	render(
		<BlpgeLibrary></BlpgeLibrary>,
		document.getElementById( 'blpge_layout_button' )
	);
};
