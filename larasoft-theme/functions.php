<?php
/**
 * LaraSoft Headless Theme Functions (v3 - Bulletproof)
 * Uses official hooks to prevent plugin race conditions.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers theme features like menus and widgets.
 * This runs on the standard 'init' hook.
 */
function larasoft_theme_setup() {
	// Register a classic menu location for the REST API plugin.
	register_nav_menus(
		array(
			'primary-menu' => __( 'Primary Menu', 'larasoft-theme' ),
		)
	);

	// Add support for classic widgets.
	add_theme_support( 'widgets' );
}
add_action( 'init', 'larasoft_theme_setup' );


function larasoft_acf_init() {
    if ( function_exists( 'acf_add_options_page' ) ) {
        acf_add_options_page(
            array(
                'page_title'  => 'LaraSoft Site Settings',
                'menu_title'  => 'LaraSoft Settings',
                'parent_slug' => 'options-general.php', // This makes it a sub-page of Settings
                'capability'  => 'manage_options',
            )
        );
    }
}
add_action( 'acf/init', 'larasoft_acf_init' );
error_log('ACF Options Page available');
add_action( 'init', 'larasoft_acf_init' );
