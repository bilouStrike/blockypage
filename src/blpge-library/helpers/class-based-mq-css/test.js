// Import Test Dependencies
import blpge_class_based_mq_css from './index';

//****************************************************************** */
// Simple Values Test
//****************************************************************** */

test( 'Simple Test 03', () => {
	expect(
		blpge_class_based_mq_css(
			`.class_01 {
      color: red;
    }
    @media (max-width: 575.98px){
      .class_01 {
        color: red;
      }}

    @media (min-width: 576px) and (max-width: 767.98px){
      .class_02 {
        color: red;
      }}

    @media (min-width: 576px) and (max-width: 767.98px){
      .class_03 {
        color: red;
      }}

    @media (min-width: 768px) and (max-width: 991.98px){
      .class_03 {
        color: red;
      }}`
		)
	).toEqual(
		`.class_01 {
      color: red;
    }
    .blpge_is-mobile-portrait 
      .class_01 {
        color: red;
      }

    .blpge_is-mobile-landscape 
      .class_02 {
        color: red;
      }

    .blpge_is-mobile-landscape 
      .class_03 {
        color: red;
      }

    .blpge_is-tablet 
      .class_03 {
        color: red;
      }`
	);
} );
