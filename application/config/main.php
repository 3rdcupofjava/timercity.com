<?php

defined('SYSPATH') OR die('No direct access allowed.');

return array(
    'title' => 'TimerCity',
    'subtitle' => __('For all your timing needs. We have lap timers, countdown timers, count-up timers, big timers, little timers, and plenty of clocks for any part of the world.'),
    'navigation' => array(
        array(
            'title' => __('Save'),
            'path'  => 'albums',
            'mini_icon'  => 'picture',
            'icon'  => 'photo_folder_256.png',
            'admin' => false,
            'in_nav' => true
        ),
        array(
            'title' => __('Another menu'),
            'path'  => 'albums',
            'mini_icon'  => 'picture',
            'icon'  => 'photo_folder_256.png',
            'admin' => false,
            'in_nav' => true
        ),
        array(
            'title' => __('Another one'),
            'path'  => 'albums',
            'mini_icon'  => 'star',
            'icon'  => 'clip_board_tasks_512.png',
            'admin' => false,
            'in_nav' => true
        ),
        array(
            'title' => __('About'),
            'path'  => 'albums',
            'mini_icon'  => 'picture',
            'icon'  => 'domain_512.png',
            'admin' => false,
            'in_nav' => true
        ),
    ),
    'admin' => array(
        'home' => array(
            'title' => 'Admin Home',
            'url' => 'yaam',
            'route' => true,
        ),
        'settings' => array(
            'title' => __('Settings'),
            'url' => 'yaam/settings',
            'route' => true,
        ),
        'users' => array(
            'title' => __('Users'),
            'url' => 'yaam/user',
            'route' => true,
        ),
        'roles' => array(
            'title' => __('Roles'),
            'url' => 'yaam/role',
            'route' => true,
        ),
//        'settings' => array(
//            'title' => 'Settings',
//            'url' => 'admin/settings',
//            'route' => true,
//        ),
//        'help' => array(
//            'title' => 'Help',
//            'url' => 'admin/help',
//            'route' => true,
//        ),

    )
);