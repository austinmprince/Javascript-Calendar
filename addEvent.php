<?php
require 'database.php';
header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
session_start();
date_default_timezone_set('America/Chicago');

// makes sure right user
//   if(!hash_equals($_SESSION['token'], $_POST['token'])){
//    die("Request forgery detected");
// }
$token = (int)$_POST['token'];
if(!hash_equals($_SESSION['token'], $_POST['token'])){
	 die("Request forgery detected");
 }

$title = (String)$_POST['title'];
$undate = $_POST['date'];
$untime = $_POST['time'];
if(isset($title) && isset($undate) && isset($untime) && !empty($title) && !empty($undate) && !empty($untime)){
	//MAKE SURE YOU PASS USER_ID

	$date = date('Y-m-d', strtotime($undate));

	$time = date('H:i:s', strtotime($untime));
	$description = (String)$_POST['description'];
	$user_id = $_SESSION['user_id'];


	$stmt = $mysqli->prepare("insert into events (user_id, title, description, date, time) values (?, ?, ?, ?, ?)");
	if(!$stmt){
		printf("Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}
	$stmt->bind_param('sssss', $user_id, $title, $description, $date, $time);
	$stmt->execute();
	$stmt->close();

	echo json_encode(array(
		"success" => true,
		"date" => $undate
	));
}
else{
	echo json_encode(array(
		"success" => false,
		"message" => "Missing information"
	));
}
?>
