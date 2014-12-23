<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Storage extends Controller {

	public function action_index()
	{
            $this->response->body('this page does nothing');
	}
        
	public function action_save()
	{
            // $data = $this->request->post();
			if($_SERVER['REQUEST_METHOD'] == 'POST')
			{
				$url = 'http://e.znotez.com/api/1/setText';
				if(isset($_POST['name']) && isset($_POST['location'])) {
					$str = 'Username is: ' . $_POST['name'] . ' Location is: ' . $_POST['location'];
					$data = array('apikey' => '2a6e9953aed68276954081992e90d452c3b2c9eb27a12a1d565db8e2800c2fe5',
								  'padID' => 'timercity.dev',
								  'text' => $str);
				}
	// use key 'http' even if you send the request to https://...
				$options = array(
					'http' => array(
						'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
						'method'  => 'POST',
						'content' => http_build_query($data),
					),
				);
				$context  = stream_context_create($options);
				$result = file_get_contents($url, false, $context);
				var_dump($result);
			}
	}
        
	public function action_load()
	{
            $this->response->body('output');
	}

} // End Storage