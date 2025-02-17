<?php
$config = include('/home/secure/achtung/pass.php'); 

$password = $config['db_password'];
$servername = "localhost";
$username = "wat3873d_achtung_user";
$db = "wat3873d_achtung";

try {
    global $conn;
    $conn = new mysqli($servername, $username, $password, $db, "3306");
}
catch (Exception $e){
    die("Connection failed: " . $conn->connect_error);
}
return $conn;

