<?php 

function dfi_register_widgets() {

	$footer_args = array(
		'id'            => 'dfi_footer_widgets',
		'name'          => __( 'Footer Widgets', 'dfi_theme' ),
		'description'   => __( 'Content for the global site footer. Should consist primarily for menus and contact info.', 'dfi_theme' ),
		'class'         => 'footer-widgets',
		'before_title'  => '<h5 class="widget-title">',
		'after_title'   => '</h5>',
		'before_widget' => '<li class="widget">',
		'after_widget'  => '</li>',
	);
	register_sidebar( $footer_args );
}

add_action( 'widgets_init', 'dfi_register_widgets' );

?>