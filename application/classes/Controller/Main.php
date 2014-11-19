<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Main extends Controller_Base {

	public function action_index()
	{
            $main = new View('home');
            $this->template->content = $main;
	}

} // End Main