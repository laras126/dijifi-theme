<?php 

	$locations = array(
		'main_nav' => __( 'Primary Menu', 'dfi_theme' ),
		'footer_nav' => __( 'Footer Links', 'dfi_theme' ),
		'header_nav' => __( 'Header Menu', 'dfi_theme' ),
	);
	register_nav_menus( $locations );

?>