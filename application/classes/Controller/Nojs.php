<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Nojs extends Controller_Base {

	public function action_index()
	{
            $view = new View('nojs');
            $view->action = 'start';
            
            if ($this->request->query()) {
                $view->action = 'stop';
            }
            
            $this->template->content = $view;
	}

} // End Main