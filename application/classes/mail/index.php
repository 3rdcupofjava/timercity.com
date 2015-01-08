<?php
/* this script use config for mailcatcher ( http://mailcatcher.me/ ) with it you can test sending mail in development env. */
require_once './PHPMailer/PHPMailerAutoload.php'; // lib_url: https://github.com/PHPMailer/PHPMailer
require_once '../db/db.php';

$current_datetime = date('m/d/Y h:i', time());
$alarms = get_data();

if(gettype($alarms) == 'Array' && $alarms['time'] <= $current_datetime)
{
//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
    date_default_timezone_set('Etc/UTC');

//Create a new PHPMailer instance
    $mail = new PHPMailer;
//Tell PHPMailer to use SMTP
    $mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
    $mail->SMTPDebug = 0;
// $mail->Debugoutput = 'html';
    $mail->Host = "localhost";
    $mail->Port = 1025;
    $mail->SMTPAuth = false;
//Set who the message is to be sent from
    $mail->setFrom('no-reply@timercity.com', 'timercity.com');
//Set who the message is to be sent to
    $mail->addAddress($alarms['email'], 'John Doe');
//Set the subject line
    $mail->Subject = $alarms['title'];
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
    $mail->msgHTML(file_get_contents('./contents.html'), dirname(__FILE__));
//Replace the plain text body with one created manually
    $mail->AltBody = 'This is a plain-text message body';
//Attach an image file
    $mail->addAttachment('./PHPMailer/examples/images/phpmailer_mini.png');

//send the message, check for errors
    if (!$mail->send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message sent!";
    }
}
