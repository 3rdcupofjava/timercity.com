<?php defined('SYSPATH') or die('No direct script access.');
//require_once(dirname(__FILE__).'/../db/db.php');

class Controller_Storage extends Controller {

	public $api_key = '2a6e9953aed68276954081992e90d452c3b2c9eb27a12a1d565db8e2800c2fe5';

	public function action_index()
	{
            $this->response->body('this page does nothing');
	}

	public function create_pad($padID)
	{
		$url = 'http://e.znotez.com/api/1/createPad';
		$data = array('apikey' => $this->api_key,
					  'padID' => 'my_timers_' . $padID);

		$options = array(
			'http' => array(
				'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
				'method'  => 'POST',
				'content' => http_build_query($data),
			),
		);
		$context  = stream_context_create($options);
		$result = file_get_contents($url, false, $context);
	}
        
	public function action_save()
	{
			if($_SERVER['REQUEST_METHOD'] == 'POST')
			{
				if(isset($_POST['padID']))
				{

					$url = 'http://e.znotez.com/api/1/setText';  // createPad | padID
					if (isset($_POST['padID']) && isset($_POST['text']))
					{
						$this->create_pad($_POST['padID']);

						$data = array('apikey' => $this->api_key,
									  'padID'  => 'my_timers_' . $_POST['padID'],
									  'text'   => $_POST['text']);
					}

					$options = array(
						'http' => array(
							'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
							'method'  => 'POST',
							'content' => http_build_query($data),
						),
					);
					$context = stream_context_create($options);
					$result = file_get_contents($url, false, $context);
					var_dump($result);
				}

				$this->saveTabs();

				if(isset($_POST['time']))
				{
					try {
						set_data('test', $_POST['time'], 'my_mail@example.org');
					} catch (Exception $e) {
						echo $e->getMessage();
					}
				}
			}
	}
        
	public function action_load()
	{
		if(isset($_POST['padID'])) {
			$url = 'http://e.znotez.com/api/1/getText';
			$data = array('apikey' => $this->api_key,
						  'padID' => 'my_timers_' . $_POST['padID']);
			$options = array(
				'http' => array(
					'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
					'method'  => 'POST',
					'content' => http_build_query($data),
				),
			);
			$context  = stream_context_create($options);
			$result = file_get_contents($url, false, $context);

			$data = json_decode($result, true);

			$res = $data['data']['text'];
			$this->response->body($res);
		}
	}

	private function saveTabs(){
		if(isset($_POST['tabID']))
		{

			$url = 'http://e.znotez.com/api/1/setText';  // createPad | padID
			if (isset($_POST['tabID']) && isset($_POST['tabs']))
			{
				$this->create_pad($_POST['tabID']);

				$data = array('apikey' => $this->api_key,
							  'padID'  => 'my_timers_' . $_POST['tabID'],
							  'text'   => $_POST['tabs']);
			}

			$options = array(
				'http' => array(
					'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
					'method'  => 'POST',
					'content' => http_build_query($data),
				),
			);
			$context = stream_context_create($options);
			$result = file_get_contents($url, false, $context);
			var_dump($result);
		}
	}

	public function action_loadTabs(){
		if(isset($_POST['tabID'])) {
			$url = 'http://e.znotez.com/api/1/getText';
			$data = array('apikey' => $this->api_key,
						  'padID' => 'my_timers_' . $_POST['tabID'].'tabs');
			$options = array(
				'http' => array(
					'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
					'method'  => 'POST',
					'content' => http_build_query($data),
				),
			);
			$context  = stream_context_create($options);
			$result = file_get_contents($url, false, $context);

			$data = json_decode($result, true);

			$res = $data['data']['text'];
			$this->response->body($res);
		}
	}

} // End Storage