<?php
// var    // variable value       // default value
$php_path = $_SERVER['PHP_SELF']  ?? "";
$name     = $_POST["name"]        ?? "name";
$message  = $_POST["message"]     ?? "message";
$email    = $_POST["email"]       ?? "email";

?>
<!DOCTYPE html>
<html lang="">
<head>
    <title>Contact Form Submitted</title>
</head>
<body>
<form action="<?= $php_path ?>" method="POST">
<p>
    Thank you, <?= $name ?> for your comments<br>
    You stated in your test Message:<br>
    <?= $message ?>
    <br><br>
    We will respond to you at <?= $email ?> when we make updates to the site.
</p>
</form>
</body>
</html>