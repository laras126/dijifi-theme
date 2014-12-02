<?php 


/**
 *
 * Services Post Type
 *
 */


	$serv_labels = array(
		'name'                => _x( 'Services', 'Post Type General Name', 'dfi_theme' ),
		'singular_name'       => _x( 'Service', 'Post Type Singular Name', 'dfi_theme' ),
		'menu_name'           => __( 'Services', 'dfi_theme' ),
		'parent_item_colon'   => __( 'Parent Service:', 'dfi_theme' ),
		'all_items'           => __( 'All Services', 'dfi_theme' ),
		'view_item'           => __( 'View Service', 'dfi_theme' ),
		'add_new_item'        => __( 'Add New Service', 'dfi_theme' ),
		'add_new'             => __( 'Add New', 'dfi_theme' ),
		'edit_item'           => __( 'Edit Service', 'dfi_theme' ),
		'update_item'         => __( 'Update Service', 'dfi_theme' ),
		'search_items'        => __( 'Search Service', 'dfi_theme' ),
		'not_found'           => __( 'Not found', 'dfi_theme' ),
		'not_found_in_trash'  => __( 'Not found in Trash', 'dfi_theme' ),
	);
	$serv_args = array(
		'label'               => __( 'service', 'dfi_theme' ),
		'description'         => __( 'The main pages for DiJiFi\'s transfer services.', 'dfi_theme' ),
		'labels'              => $serv_labels,
		'supports'            => array( ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 5,
		'menu_icon'           => 'dashicons-images-alt2',
		'can_export'          => true,
		'has_archive'         => false,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'rewrite'             => array('slug' => 'service'),
		'capability_type'     => 'page',
	);
	register_post_type( 'dfi_service', $serv_args );



/**
 *
 * Case Study Post Type
 *
 */

	// Case Study Args

	$study_labels = array(
		'name'                => _x( 'Case Studies', 'Post Type General Name', 'dfi_theme' ),
		'singular_name'       => _x( 'Case Study', 'Post Type Singular Name', 'dfi_theme' ),
		'menu_name'           => __( 'Case Studies', 'dfi_theme' ),
		'parent_item_colon'   => __( 'Parent Study:', 'dfi_theme' ),
		'all_items'           => __( 'All Studies', 'dfi_theme' ),
		'view_item'           => __( 'View Study', 'dfi_theme' ),
		'add_new_item'        => __( 'Add Study', 'dfi_theme' ),
		'add_new'             => __( 'Add New', 'dfi_theme' ),
		'edit_item'           => __( 'Edit Study', 'dfi_theme' ),
		'update_item'         => __( 'Update Study', 'dfi_theme' ),
		'search_items'        => __( 'Search Study', 'dfi_theme' ),
		'not_found'           => __( 'Not found', 'dfi_theme' ),
		'not_found_in_trash'  => __( 'Not found in Trash', 'dfi_theme' ),
	);
	$study_rewrite = array(
		'slug'                => 'case-study',
		'with_front'          => true,
		'pages'               => true,
		'feeds'               => true,
	);
	$study_args = array(
		'label'               => __( 'dfi_case_study', 'dfi_theme' ),
		'description'         => __( 'Case Studies for individual and archival clients.', 'dfi_theme' ),
		'labels'              => $study_labels,
		'supports'            => array( 'title', ),
		'taxonomies'          => array( 'dfi_study_type' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => false,
		'show_in_admin_bar'   => true,
		'menu_position'       => 5,
		'menu_icon'           => 'dashicons-index-card',
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'rewrite'             => $study_rewrite,
		'capability_type'     => 'page',
	);
	register_post_type( 'dfi_case_study', $study_args );



/**
 *
 * Testimonials Post Type
 *
 */
	
	// Testimonial Args

	$test_labels = array(
		'name'                => _x( 'Testimonials', 'Post Type General Name', 'dfi_theme' ),
		'singular_name'       => _x( 'Testimonial', 'Post Type Singular Name', 'dfi_theme' ),
		'menu_name'           => __( 'Testimonials', 'dfi_theme' ),
		'parent_item_colon'   => __( 'Parent Testimonial:', 'dfi_theme' ),
		'all_items'           => __( 'All Testimonials', 'dfi_theme' ),
		'view_item'           => __( 'View Testimonial', 'dfi_theme' ),
		'add_new_item'        => __( 'Add New Testimonial', 'dfi_theme' ),
		'add_new'             => __( 'Add Testimonial', 'dfi_theme' ),
		'edit_item'           => __( 'Edit Testimonial', 'dfi_theme' ),
		'update_item'         => __( 'Update Testimonial', 'dfi_theme' ),
		'search_items'        => __( 'Search Testimonial', 'dfi_theme' ),
		'not_found'           => __( 'Not found', 'dfi_theme' ),
		'not_found_in_trash'  => __( 'Not found in Trash', 'dfi_theme' ),
	);
	$test_args = array(
		'label'               => __( 'dfi_testimonial', 'dfi_theme' ),
		'description'         => __( 'Customer testimonials.', 'dfi_theme' ),
		'labels'              => $test_labels,
		'supports'            => array( ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => false,
		'show_in_admin_bar'   => true,
		'menu_position'       => 5,
		'menu_icon'           => 'dashicons-editor-quote',
		'can_export'          => true,
		'has_archive'         => false,
		'exclude_from_search' => true,
		'publicly_queryable'  => true,
		'capability_type'     => 'post',
	);
	register_post_type( 'dfi_testimonial', $test_args );



/**
 *
 * Artifacts Post Type (equipment, formats, file types)
 *
 */

	// Case Study Args

	$labels = array(
		'name'                => _x( 'Artifacts', 'Post Type General Name', 'dfi_theme' ),
		'singular_name'       => _x( 'Artifact', 'Post Type Singular Name', 'dfi_theme' ),
		'menu_name'           => __( 'Artifacts', 'dfi_theme' ),
		'parent_item_colon'   => __( 'Parent Artifact:', 'dfi_theme' ),
		'all_items'           => __( 'All Artifacts', 'dfi_theme' ),
		'view_item'           => __( 'View Artifact', 'dfi_theme' ),
		'add_new_item'        => __( 'Add New Artifact', 'dfi_theme' ),
		'add_new'             => __( 'Add Artifact', 'dfi_theme' ),
		'edit_item'           => __( 'Edit Artifact', 'dfi_theme' ),
		'update_item'         => __( 'Update Artifact', 'dfi_theme' ),
		'search_items'        => __( 'Search Artifact', 'dfi_theme' ),
		'not_found'           => __( 'Not found', 'dfi_theme' ),
		'not_found_in_trash'  => __( 'Not found in Trash', 'dfi_theme' ),
	);
	$args = array(
		'label'               => __( 'dfi_artifact', 'dfi_theme' ),
		'description'         => __( 'Equipment, formats, and files.', 'dfi_theme' ),
		'labels'              => $labels,
		'supports'            => array( ),
		'taxonomies'          => array( 'dfi_artifact_type' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => false,
		'show_in_admin_bar'   => true,
		'menu_position'       => 5,
		'menu_icon'           => 'dashicons-video-alt',
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => true,
		'publicly_queryable'  => true,
		'rewrite'             => false,
		'capability_type'     => 'page',
	);
	register_post_type( 'dfi_artifact', $args );


 ?>