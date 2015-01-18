<?php defined('SYSPATH') OR die('No direct script access.'); ?>

2014-12-05 20:11:23 --- EMERGENCY: ErrorException [ 2 ]: include(/var/www/application/templates/timer_box.mustache): failed to open stream: No such file or directory ~ APPPATH/views/template.php [ 44 ] in /var/www/timercity.com/application/views/template.php:44
2014-12-05 20:11:23 --- DEBUG: #0 /var/www/timercity.com/application/views/template.php(44): Kohana_Core::error_handler(2, 'include(/var/ww...', '/var/www/timerc...', 44, Array)
#1 /var/www/timercity.com/application/views/template.php(44): include()
#2 /var/www/timercity.com/system/classes/Kohana/View.php(61): include('/var/www/timerc...')
#3 /var/www/timercity.com/system/classes/Kohana/View.php(348): Kohana_View::capture('/var/www/timerc...', Array)
#4 /var/www/timercity.com/system/classes/Kohana/Controller/Template.php(44): Kohana_View->render()
#5 /var/www/timercity.com/application/classes/Controller/Base.php(52): Kohana_Controller_Template->after()
#6 /var/www/timercity.com/system/classes/Kohana/Controller.php(87): Controller_Base->after()
#7 [internal function]: Kohana_Controller->execute()
#8 /var/www/timercity.com/system/classes/Kohana/Request/Client/Internal.php(97): ReflectionMethod->invoke(Object(Controller_Main))
#9 /var/www/timercity.com/system/classes/Kohana/Request/Client.php(114): Kohana_Request_Client_Internal->execute_request(Object(Request), Object(Response))
#10 /var/www/timercity.com/system/classes/Kohana/Request.php(986): Kohana_Request_Client->execute(Object(Request))
#11 /var/www/timercity.com/index.php(118): Kohana_Request->execute()
#12 {main} in /var/www/timercity.com/application/views/template.php:44
2014-12-05 20:12:01 --- EMERGENCY: ErrorException [ 2 ]: include(/var/wwwtimercity.com/application/templates/timer_box.mustache): failed to open stream: No such file or directory ~ APPPATH/views/template.php [ 44 ] in /var/www/timercity.com/application/views/template.php:44
2014-12-05 20:12:01 --- DEBUG: #0 /var/www/timercity.com/application/views/template.php(44): Kohana_Core::error_handler(2, 'include(/var/ww...', '/var/www/timerc...', 44, Array)
#1 /var/www/timercity.com/application/views/template.php(44): include()
#2 /var/www/timercity.com/system/classes/Kohana/View.php(61): include('/var/www/timerc...')
#3 /var/www/timercity.com/system/classes/Kohana/View.php(348): Kohana_View::capture('/var/www/timerc...', Array)
#4 /var/www/timercity.com/system/classes/Kohana/Controller/Template.php(44): Kohana_View->render()
#5 /var/www/timercity.com/application/classes/Controller/Base.php(52): Kohana_Controller_Template->after()
#6 /var/www/timercity.com/system/classes/Kohana/Controller.php(87): Controller_Base->after()
#7 [internal function]: Kohana_Controller->execute()
#8 /var/www/timercity.com/system/classes/Kohana/Request/Client/Internal.php(97): ReflectionMethod->invoke(Object(Controller_Main))
#9 /var/www/timercity.com/system/classes/Kohana/Request/Client.php(114): Kohana_Request_Client_Internal->execute_request(Object(Request), Object(Response))
#10 /var/www/timercity.com/system/classes/Kohana/Request.php(986): Kohana_Request_Client->execute(Object(Request))
#11 /var/www/timercity.com/index.php(118): Kohana_Request->execute()
#12 {main} in /var/www/timercity.com/application/views/template.php:44
2014-12-05 20:12:57 --- EMERGENCY: ErrorException [ 1 ]: Call to undefined function base_url() ~ APPPATH/views/template.php [ 22 ] in file:line
2014-12-05 20:12:57 --- DEBUG: #0 [internal function]: Kohana_Core::shutdown_handler()
#1 {main} in file:line
2014-12-05 20:13:13 --- EMERGENCY: ErrorException [ 8 ]: Undefined variable: base_url ~ APPPATH/views/template.php [ 22 ] in /var/www/timercity.com/application/views/template.php:22
2014-12-05 20:13:13 --- DEBUG: #0 /var/www/timercity.com/application/views/template.php(22): Kohana_Core::error_handler(8, 'Undefined varia...', '/var/www/timerc...', 22, Array)
#1 /var/www/timercity.com/system/classes/Kohana/View.php(61): include('/var/www/timerc...')
#2 /var/www/timercity.com/system/classes/Kohana/View.php(348): Kohana_View::capture('/var/www/timerc...', Array)
#3 /var/www/timercity.com/system/classes/Kohana/Controller/Template.php(44): Kohana_View->render()
#4 /var/www/timercity.com/application/classes/Controller/Base.php(52): Kohana_Controller_Template->after()
#5 /var/www/timercity.com/system/classes/Kohana/Controller.php(87): Controller_Base->after()
#6 [internal function]: Kohana_Controller->execute()
#7 /var/www/timercity.com/system/classes/Kohana/Request/Client/Internal.php(97): ReflectionMethod->invoke(Object(Controller_Main))
#8 /var/www/timercity.com/system/classes/Kohana/Request/Client.php(114): Kohana_Request_Client_Internal->execute_request(Object(Request), Object(Response))
#9 /var/www/timercity.com/system/classes/Kohana/Request.php(986): Kohana_Request_Client->execute(Object(Request))
#10 /var/www/timercity.com/index.php(118): Kohana_Request->execute()
#11 {main} in /var/www/timercity.com/application/views/template.php:22