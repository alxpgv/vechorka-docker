<?php

function theme_setup()
{
  // add_theme_support('automatic-feed-links');
  // add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  register_nav_menus(
    array(
      'menu' => 'Primary',
    )
  );

//		add_image_size( '80x160', 80, 160, true );
//		add_image_size( '150x210', 150, 210, true );
//		add_image_size( '400x230', 400, 230, true );
//		add_image_size( '300x425', 300, 425, true );
//		add_image_size( '615x315', 615, 315, true );
//
//		register_nav_menus(
//			array(
//				'menu'   => 'Header',
//			)
//		);

}
add_action('after_setup_theme', 'theme_setup');

// disable image sizes
function delete_intermediate_image_sizes($sizes)
{
  // sizes to delete
  return array_diff($sizes, [
    'medium_large',
    'large',
    '1536x1536',
    '2048x2048',
  ]);
}
add_filter('intermediate_image_sizes', 'delete_intermediate_image_sizes');