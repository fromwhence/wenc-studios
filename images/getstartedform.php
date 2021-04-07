<?php

if (isset($_POST['submit'])) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $media = $_POST['media'];
  $quantity = $_POST['quantity'];

  $mailTo = "wencphoto@gmail.com";
  $headers = "From: ".$email;
  $txt = "You have received an email from Wenc Photo, from ".$name.".\n\n".

  mail($mailTo, $txt, $headers);
  header("Location: index.php?mailsend");
}
