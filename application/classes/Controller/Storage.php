<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Storage extends Controller {

	public function action_index()
	{
            $this->response->body('this page does nothing');
	}
        
	public function action_save()
	{
            $data = $this->request->post();
	}
        
	public function action_load()
	{
            $this->response->body('output');
	}

} // End Storage