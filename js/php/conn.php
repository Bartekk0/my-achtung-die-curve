<?php
$config = include('/home/secure/achtung/pass.php'); 

$password = $config['db_password'];
$servername = $config['db_servername'];
$username = $config['db_username'];
$db = $config['db_name'];

try {
    global $conn;
    $conn = new mysqli($servername, $username, $password, $db, "3306");
}
catch (Exception $e){
    die("Connection failed: " . $conn->connect_error);
}
return $conn;

