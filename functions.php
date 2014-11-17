<?php

	if (!class_exists('Timber')){
		add_action( 'admin_notices', function(){
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . admin_url('plugins.php#timber') . '">' . admin_url('plugins.php') . '</a></p></div>';
		});
		return;
	}

	class StarterSite extends TimberSite {

		function __construct(){
			add_theme_support('post-formats');
			add_theme_support('post-thumbnails');

			// update_option('thumbnail_size_w', 150);
			// update_option('thumbnail_size_h', 150);
			// update_option('large_size_w', 500);
			
			add_theme_support('menus');
			add_filter('timber_context', array($this, 'add_to_context'));
			add_filter('get_twig', array($this, 'add_to_twig'));
			add_action('init', array($this, 'dfi_register_post_types'));
			add_action('init', array($this, 'dfi_register_taxonomies'));
			add_action('init', array($this, 'dfi_register_menus'));
			parent::__construct();
		}

		function dfi_register_post_types(){
			require('lib/custom-types.php');
		}

		function dfi_register_taxonomies(){
			require('lib/taxonomies.php');
		}

		function dfi_register_menus() {
			require('lib/menus.php');
		}

		function add_to_context($context){
			// $context['foo'] = 'bar';
			// $context['stuff'] = 'I am a value set in your functions.php file';
			// $context['notes'] = 'These values are available everytime you call Timber::get_context();';
			$context['main_nav'] = new TimberMenu();
			$context['footer_nav'] = new TimberMenu();
			$context['site'] = $this;
			return $context;
		}

		function add_to_twig($twig){
			/* this is where you can add your own fuctions to twig */
			$twig->addExtension(new Twig_Extension_StringLoader());
			$twig->addFilter('myfoo', new Twig_Filter_Function('myfoo'));
			return $twig;
		}

	}

	new StarterSite();




	/**
	 ****************************
	 * DiJiFi Utility Functions *
	 ****************************
	 */

	// add_image_size( 'fixed-small', 400, 300 );
	// add_image_size( 'fixed-med', 600, 400 );
	// add_image_size( 'fixed-large', 1200, 800 );
	

	// Enqueue scripts
	function dfi_scripts() {

		// Use jQuery from CDN
		if (!is_admin()) {
			wp_deregister_script('jquery');
			wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js', array(), null, true);
			wp_enqueue_script('jquery');
		}

		// Add our JS
		wp_enqueue_script( 'js', get_template_directory_uri() . '/assets/js/build/scripts.js', array('jquery'), '1.0.0', true );
	}
	add_action( 'wp_enqueue_scripts', 'dfi_scripts' );



	// Remove unused items from the Dashboard menu
	function dfi_remove_menu_items(){
    	remove_menu_page( 'edit.php' ); // Posts
    	remove_menu_page( 'edit-comments.php' ); // Posts
    	remove_menu_page( 'users.php' ); // Users
	}
	add_action( 'admin_menu', 'dfi_remove_menu_items' );



	// Customize the editor style, from Roots.io 
	// https://github.com/roots/roots-sass/blob/master/assets/css/editor-style.css
	function dfi_editor_styles() {
		add_editor_style( 'assets/css/editor-style.css' );
	}
	add_action( 'after_setup_theme', 'dfi_editor_styles' );

	


	// Change Title field placeholders
	function dfi_title_placeholder_text ( $title ) {
		if ( get_post_type() == 'dfi_service' ) {
			$title = __( 'Service Name' );
		} else if ( get_post_type() == 'dfi_case_study' ) {
	        $title = __( 'Case Study Name' );
		} else if ( get_post_type() == 'dfi_testimonial' ) {
	        $title = __( 'Testimonial Nickname' );
		}
		return $title;
	} 
	add_filter( 'enter_title_here', 'dfi_title_placeholder_text' );


	

	// Customize the elements dropdown in TinyMCE
	// http://support.advancedcustomfields.com/forums/topic/wysiwyg-formatselect/
	add_filter( 'tiny_mce_before_init', function( $settings ){
		$settings['block_formats'] = 'Paragraph=p;Heading=h3;Subheading=h4';
		return $settings;
	} );



	// Add a 'Very Simple' toolbar style for the WYSIWYG editor in ACF
	// http://www.advancedcustomfields.com/resources/customize-the-wysiwyg-toolbars/
	function dfi_acf_wysiwyg_toolbar( $toolbars ) {

		$toolbars['Text Based'] = array();

		// Only one row of buttons
		$toolbars['Text Based'][1] = array('formatselect' , 'bold' , 'link' , 'italic' , 'unlink' );

		return $toolbars;
	}
	add_filter( 'acf/fields/wysiwyg/toolbars' , 'dfi_acf_wysiwyg_toolbar'  );


?>