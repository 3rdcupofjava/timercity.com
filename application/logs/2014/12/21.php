<?php defined('SYSPATH') OR die('No direct script access.'); ?>

2014-12-21 18:23:03 --- EMERGENCY: ErrorException [ 2 ]: include(/home/vagrant/Code/timercity.com/timercity.com/application/templates/timer_box.mustache): failed to open stream: No such file or directory ~ APPPATH/views/template.php [ 44 ] in /home/vagrant/Code/timercity.com/application/views/template.php:44
2014-12-21 18:23:03 --- DEBUG: #0 /home/vagrant/Code/timercity.com/application/views/template.php(44): Kohana_Core::error_handler(2, 'include(/home/v...', '/home/vagrant/C...', 44, Array)
#1 /home/vagrant/Code/timercity.com/application/views/template.php(44): include()
#2 /home/vagrant/Code/timercity.com/system/classes/Kohana/View.php(61): include('/home/vagrant/C...')
#3 /home/vagrant/Code/timercity.com/system/classes/Kohana/View.php(348): Kohana_View::capture('/home/vagrant/C...', Array)
#4 /home/vagrant/Code/timercity.com/system/classes/Kohana/Controller/Template.php(44): Kohana_View->render()
#5 /home/vagrant/Code/timercity.com/application/classes/Controller/Base.php(52): Kohana_Controller_Template->after()
#6 /home/vagrant/Code/timercity.com/system/classes/Kohana/Controller.php(87): Controller_Base->after()
#7 [internal function]: Kohana_Controller->execute()
#8 /home/vagrant/Code/timercity.com/system/classes/Kohana/Request/Client/Internal.php(97): ReflectionMethod->invoke(Object(Controller_Main))
#9 /home/vagrant/Code/timercity.com/system/classes/Kohana/Request/Client.php(114): Kohana_Request_Client_Internal->execute_request(Object(Request), Object(Response))
#10 /home/vagrant/Code/timercity.com/system/classes/Kohana/Request.php(986): Kohana_Request_Client->execute(Object(Request))
#11 /home/vagrant/Code/timercity.com/index.php(118): Kohana_Request->execute()
#12 {main} in /home/vagrant/Code/timercity.com/application/views/template.php:44