<?php

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->isHTML(true);

  // $mail->SMTPDebug = 3;                      
  $mail->isSMTP();                                           
  $mail->Host       = 'smtp.ukr.net';                    
  $mail->SMTPAuth   = true;                                   
  $mail->Username   = 'andrii.kuz@ukr.net';                     
  $mail->Password   = 'Y0L3scgT0t8wGkF6';                               
  $mail->SMTPSecure = 'ssl';            
  $mail->Port       = 465; 
  
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $message = $_POST['message'];

  $email_template = "template_mail.html";
  $body = file_get_contents($email_template);
  
  $body = str_replace('%name%', $name, $body);
  $body = str_replace('%email%', $email, $body);
  $body = str_replace('%phone%', $phone, $body);
  $body = str_replace('%message%', $message, $body);

  $theme = '[Заявка з форми]';

  $mail->setLanguage('uk', 'PHPMailer/language/');
  $mail->setFrom("andrii.kuz@ukr.net", "Заявка з форми");
  $mail->addAddress("andrii.kuz@ukr.net");

  $mail->Subject = $theme;
  $mail->MsgHTML($body);

  if (!$mail->send()) {
    $message = 'Помилка, дані НЕ відправлені...!';
  } else {
    $message = 'Дані відправленні!';
  }

  $response = ["message" => $message];
  header("Content-type: application/json");

  echo json_encode($response);
  ?>