<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Base extends Controller_Template {

    public $template = 'template';

    public function after() {
        //I18n::lang('es-es');
        $this->template->title = Kohana::$config->load('main.title');
        $this->template->subtitle = Kohana::$config->load('main.subtitle');
        $this->template->scripts = '<script type="text/javascript">$("#photo").css("max-height", $(window).height() + "px");</script>';

        if (Auth::instance()->logged_in())
        {
            $this->template->show_login = false;
        }
        else
        {
            $this->template->show_login = true;
        }

        $nav_list = '';
        
        foreach (Kohana::$config->load('main.navigation') as $nav)
        {
            # If requires auth AND logged in OR no need for auth
            if (($nav['admin'] && Auth::instance()->logged_in()) || !$nav['admin'])
            {
                $nav_list .= '<li';
                $pos = strpos($this->request->url(), '/index.php/'.$nav['path']);
                if($pos !== false)
                {
                    $nav_list .= ' class="active"';
                }
                $nav_list .= '><a href="/'.$nav['path'].'">';
                if(isset($nav['mini_icon']))
                {
                    $nav_list .= '<i class="glyphicon glyphicon-'.$nav['mini_icon'].'"></i> ';
                }
                $nav_list .= $nav['title'].'</a></li>';
            }
        }
        $this->template->nav_list = $nav_list;

        $nav_list = '';
        foreach (Kohana::$config->load('main.admin') as $admin_nav) {
            $nav_list .= '<li><a href="/'.$admin_nav['url'].'">'.$admin_nav['title'].'</a></li>';
        }
        $this->template->admin_nav = $nav_list;
        # >>> NAVIGATION >>>

        return parent::after();

    } // End After

} // End Base
