const { Component } = wp.element;

export default class BlpgeSideNav extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		let categories = this.props.categories;
		let categories_list = [];
		let itemsCount = 0;
		if ( categories != null ) {
			jQuery.each( categories, function ( key, value ) {
				itemsCount += value.count;
				categories_list.push(
					<li
						className="blpge_library__menuNav__item"
						onClick={ () => blpge_navigate( event ) }
						data-attr={ value.name }
					>
						{ value.name }
						<span> { value.count } </span>
					</li>
				);
			} );
		}

		function blpge_navigate( e ) {
			let current_category = jQuery( e.target )
				.attr( 'data-attr' )
				.replace( /\s/g, '' );
			jQuery( '.blpge_library__body__item' ).hide();
			jQuery( `*[id=${ current_category }]` ).show();
		}

		function blpge_display_all_items() {
			jQuery( '.blpge_library__body__item' ).show();
		}

		return (
			<ul>
				<li
					className="blpge_library__menuNav__item"
					onClick={ () => blpge_display_all_items() }
				>
					All <span> { itemsCount } </span>
				</li>
				{ categories_list }
			</ul>
		);
	}
}
