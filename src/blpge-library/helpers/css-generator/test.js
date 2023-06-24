// Import Test Dependencies
import blpge_cssGen from './index';

//****************************************************************** */
// Simple Values Test
//****************************************************************** */

test( 'Simple Values Test 01', () => {
	expect(
		blpge_cssGen( '.my-class', [ 'margin' ], [ [ 5, 'px' ] ] ).replace(
			/[\r\n\s]/g,
			''
		)
	).toEqual(
		`.my-class{
      margin:5px;}`.replace( /[\r\n\s]/g, '' )
	);
} );

test( 'Simple Values Test 02', () => {
	expect(
		blpge_cssGen( '.my-class:hover', [ 'color' ], [ 'blue' ] ).replace(
			/[\r\n\s]/g,
			''
		)
	).toEqual(
		`.my-class:hover {
        color:blue;}`.replace( /[\r\n\s]/g, '' )
	);
} );

test( 'Simple Values Test 03', () => {
	expect(
		blpge_cssGen(
			'.my-class',
			[ 'margin', 'color' ],
			[ [ 5, 'px' ], 'red' ]
		).replace( /[\r\n\s]/g, '' )
	).toEqual( `.my-class{margin:5px;color:red;}`.replace( /[\r\n\s]/g, '' ) );
} );

test( 'Simple Values Test 04', () => {
	expect(
		blpge_cssGen(
			'.my-class',
			[ 'background-color', 'background-image' ],
			[ 'red', null ]
		).replace( /[\r\n\s]/g, '' )
	).toEqual(
		`.my-class{
      background-color: red;
    }`.replace( /[\r\n\s]/g, '' )
	);
} );

//****************************************************************** */
// Media Queries Test
//****************************************************************** */

// Test 01
test( 'Media Queries Test 01', () => {
	expect(
		blpge_cssGen(
			'.my-class',
			[ 'margin', 'color', 'padding' ],
			[
				[ 5, 'px' ],
				'red',
				[
					[ 1, 'px' ],
					[ 2, '%' ],
					[ 3, 'em' ],
					[ 4, 'px' ],
				],
			]
		).replace( /[\r\n\s]/g, '' )
	).toEqual(
		`.my-class {
        margin: 5px;
        color: red;
        padding: 1px;
    }
  
    @media (min-width: 768px) and (max-width: 991.98px) {
        .my-class {
          padding: 2%;
        }
    }
    
    @media (min-width: 576px) and (max-width: 767.98px) {
        .my-class {
          padding: 3em;
        }
    }
    
    
    @media (max-width: 575.98px) {
        .my-class {
          padding: 4px;
        }
    }
    `.replace( /[\r\n\s]/g, '' )
	);
} );

// Test 02
test( 'Media Queries Test 02', () => {
	expect(
		blpge_cssGen(
			'.my-class',
			[ 'margin-top', 'margin-bottom', 'background-image' ],
			[
				[
					[ 5, '%' ],
					[ null, 'px' ],
					[ null, 'px' ],
					[ null, 'px' ],
				],
				[
					[ null, 'px' ],
					[ 2, 'px' ],
					[ null, '%' ],
					[ 1, 'px' ],
				],
				'url(images/profile.jpg)',
			]
		).replace( /[\r\n\s]/g, '' )
	).toEqual(
		`.my-class {
          margin-top: 5%;
          background-image: url(images/profile.jpg);
      }
      
      @media (min-width: 768px) and (max-width: 991.98px) {
          .my-class {
            margin-bottom: 2px;
          }
      }
      
      @media (max-width: 575.98px) {
          .my-class {
            margin-bottom: 1px;
          }
      }
      `.replace( /[\r\n\s]/g, '' )
	);
} );

// Test 03
test( 'Media Queries Test 03', () => {
	expect(
		blpge_cssGen(
			'.my-class',
			[ 'margin-top', 'margin-bottom' ],
			[
				[
					[ null, '%' ],
					[ null, 'px' ],
					[ null, 'px' ],
					[ null, 'px' ],
				],
				[
					[ null, 'px' ],
					[ 2, 'px' ],
					[ null, '%' ],
					[ 1, 'px' ],
				],
			]
		).replace( /[\r\n\s]/g, '' )
	).toEqual(
		`
      
      @media (min-width: 768px) and (max-width: 991.98px) {
          .my-class {
            margin-bottom: 2px;
          }
      }
      
      @media (max-width: 575.98px) {
          .my-class {
            margin-bottom: 1px;
          }
      }
      `.replace( /[\r\n\s]/g, '' )
	);
} );

// Test 04
test( 'Media Queries Test 04', () => {
	expect(
		blpge_cssGen(
			'.my-class',
			[ 'margin', 'color', 'padding' ],
			[ [ 5, 'px' ], 'red', [ [ 1 ], [ 2 ], [ 3 ], [ 4 ] ] ]
		).replace( /[\r\n\s]/g, '' )
	).toEqual(
		`.my-class {
        margin: 5px;
        color: red;
        padding: 1;
    }
    
    
    @media (min-width: 768px) and (max-width: 991.98px) {
        .my-class {
          padding: 2;
        }
    }
    
    @media (min-width: 576px) and (max-width: 767.98px) {
        .my-class {
          padding: 3;
        }
    }
    
    
    @media (max-width: 575.98px) {
        .my-class {
          padding: 4;
        }
    }
    `.replace( /[\r\n\s]/g, '' )
	);
} );

//****************************************************************** */
// Re-assignment tests
//****************************************************************** */

// Test 01
let blpge_ele_1 = blpge_cssGen( '.first-class', [ 'margin' ], [ [ 5, 'px' ] ] );
blpge_ele_1 = blpge_cssGen(
	'.second-class',
	[ 'padding' ],
	[ [ 5, '%' ] ],
	blpge_ele_1
);

test( 'Re-assignment test 01 ', () => {
	expect( blpge_ele_1.replace( /[\r\n\s]/g, '' ) ).toEqual(
		`.first-class{
      margin: 5px;
    }
    .second-class{
      padding: 5%;
    }`.replace( /[\r\n\s]/g, '' )
	);
} );

// Test 02
let blpge_ele_2 = blpge_cssGen(
	'.first-class',
	[ 'color', 'margin' ],
	[
		'red',
		[
			[ 3, 'px' ],
			[ 2, 'px' ],
			[ 1, 'px' ],
			[ 0, 'px' ],
		],
	]
);
blpge_ele_2 = blpge_cssGen(
	'.second-class:hover',
	[ 'color', 'padding' ],
	[ 'blue', [ 5, 'px' ] ],
	blpge_ele_2
);

test( 'Re-assignment test 02 ', () => {
	expect( blpge_ele_2.replace( /[\r\n\s]/g, '' ) ).toEqual(
		`.first-class{
      color: red;
      margin: 3px;
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      .first-class {
        margin: 2px;
      }
    }
  
    @media (min-width: 576px) and (max-width: 767.98px) {
      .first-class {
        margin: 1px;
      }
    }
  
    @media (max-width: 575.98px) {
      .first-class {
        margin:0px;
      }
    }
    .second-class:hover {
      color: blue;
      padding: 5px;
    }
    
    `.replace( /[\r\n\s]/g, '' )
	);
} );

// Test 03
let blpge_ele_3 = blpge_cssGen(
	'.first-class',
	[ 'color', 'margin' ],
	[
		'red',
		[
			[ 3, 'px' ],
			[ 2, 'px' ],
			[ 1, 'px' ],
			[ 0, 'px' ],
		],
	]
);
blpge_ele_3 = blpge_cssGen(
	'.second-class:hover',
	[ 'color', 'background', 'padding' ],
	[
		'blue',
		'green',
		[
			[ 1, 'px' ],
			[ 2, 'px' ],
			[ 3, 'px' ],
			[ 4, 'px' ],
		],
	],
	blpge_ele_3
);

test( 'Re-assignment test 02 ', () => {
	expect( blpge_ele_3.replace( /[\r\n\s]/g, '' ) ).toEqual(
		`.first-class{
      color: red;
      margin: 3px;
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      .first-class {
        margin: 2px;
      }
    }
  
    @media (min-width: 576px) and (max-width: 767.98px) {
      .first-class {
        margin: 1px;
      }
    }
  
    @media (max-width: 575.98px) {
      .first-class {
        margin:0px;
      }
    }
    .second-class:hover {
      color: blue;
      background: green;
      padding: 1px;
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      .second-class:hover {
        padding: 2px;
      }
    }
  
    @media (min-width: 576px) and (max-width: 767.98px) {
      .second-class:hover {
        padding: 3px;
      }
    }
  
    @media (max-width: 575.98px) {
      .second-class:hover {
        padding: 4px;
      }
    }
    
    `.replace( /[\r\n\s]/g, '' )
	);
} );
