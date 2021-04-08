<?php


if (isset($_POST['submit'])) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $media = $_POST['media'];
  $quantity = $_POST['quantity'];
  $location = $_POST['location'];
  $message = $_POST['message'];

  $to = "wencphoto@gmail.com";
  $subject = "Wenc Photo Get Started Submission";
  $body = "";

  $body .= "From: ".$name. "\r\n";
  $body .= "Email: ".$email. "\r\n";
  $body .= "Phone: ".$phone. "\r\n";
  $body .= "Media: ".$media. "\r\n";
  $body .= "Quantity: ".$quantity. "\r\n";
  $body .= "Location: ".$location."\r\n";
  $body .= "Message: ".$message."\r\n";


  mail($to,$subject,$body);
  header("Location: index.php?mailsend");
}

?>