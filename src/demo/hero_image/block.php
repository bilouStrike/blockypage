<?php 

function render_block_posts( $attributes, $content ) {
    $recent_posts = wp_get_recent_posts( array(
        'numberposts' => -1,
        'post_status' => 'publish',
    ) );
    if ( count( $recent_posts ) === 0 ) {
        return 'No posts';
    } else {
    $posts = '';
    foreach ($recent_posts as $post) {
        $posts .= sprintf(
            '<div class="row gtnw_postInQuery">
            <div class="col-3 text-center">
               <img class="gtnw_thumbnail" 
                    src="%1$s" alt="baby">
            </div>
            <div class="col-9">
               <h2>  %2$s </h2>
               <p> %3$s </p>
                <a href="%4$s"><button>Read More</button> </a>
               
            </div>
        </div>',
        get_the_post_thumbnail_url($post["ID"]),
        $post["post_title"],
        $post["post_excerpt"],
        $post["guid"]
        ); 
        }
        return $posts;
    }

}

register_block_type( 'gutenword-blocks/posts', array(
    'render_callback' => 'render_block_posts'
) );

