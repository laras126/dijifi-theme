<?php
	
/**
 *
 * Case Study Type Taxonomy
 *
 */


	$stype_labels = array(
		'name'                       => _x( 'Study Type', 'Taxonomy General Name', 'dfi_theme' ),
		'singular_name'              => _x( 'Study Type', 'Taxonomy Singular Name', 'dfi_theme' ),
		'menu_name'                  => __( 'Study Types', 'dfi_theme' ),
		'all_items'                  => __( 'All Types', 'dfi_theme' ),
		'parent_item'                => __( 'Parent Type', 'dfi_theme' ),
		'parent_item_colon'          => __( 'Parent Type:', 'dfi_theme' ),
		'new_item_name'              => __( 'New Study Type', 'dfi_theme' ),
		'add_new_item'               => __( 'Add New Type', 'dfi_theme' ),
		'edit_item'                  => __( 'Edit Type', 'dfi_theme' ),
		'update_item'                => __( 'Update Type', 'dfi_theme' ),
		'separate_items_with_commas' => __( 'Separate items with commas', 'dfi_theme' ),
		'search_items'               => __( 'Search Study Types', 'dfi_theme' ),
		'add_or_remove_items'        => __( 'Add or remove Types', 'dfi_theme' ),
		'choose_from_most_used'      => __( 'Choose from the most used Types', 'dfi_theme' ),
		'not_found'                  => __( 'Not Found', 'dfi_theme' ),
	);
	$stype_rewrite = array(
		'slug'                       => 'case-studies',
		'with_front'                 => true,
		'hierarchical'               => true,
	);
	$stype_args = array(
		'labels'                     => $stype_labels,
		'hierarchical'               => true,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => true,
		'rewrite'                    => $stype_rewrite,
	);
	register_taxonomy( 'dfi_study_type', array( 'dfi_case_study' ), $stype_args );

?>