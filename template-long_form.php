<?php

/*
 * Template Name: Long Form
 * Description: A Page Template with a darker design.
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
Timber::render(array('page-' . $post->post_name . '.twig', 'page-long_form.twig'), $context);