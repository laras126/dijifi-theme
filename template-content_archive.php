<?php

/*
 * Template Name: Content Archive
 * Description: A Page Template with a darker design.
 */

// Get Case Studies
$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['studies'] = Timber::get_terms('dfi_study_type');
Timber::render(array('page-' . $post->post_name . '.twig', 'page-content_archive.twig'), $context);