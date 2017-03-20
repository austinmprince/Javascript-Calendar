<?php
	require 'database.php';
	ini_set("session.cookie_httponly", 1);
	if(!isset($_SESSION)){
		session_start();
	}

	// makes sure right user
	// if(!hash_equals($_SESSION['token'], $_POST['token'])){
 //   		die("Request forgery detected");
	// }

	// get event id
	$event_id = (int) $_POST['event_id'];
	$token = (int)$_POST['token'];
  if(!hash_equals($_SESSION['token'], $_POST['token'])){
	   die("Request forgery detected");
   }

	//get specified info from event
	$stmt=$mysqli->prepare('select title, description, date, time from events where event_id=?');

	if(!$stmt){
		echo json_encode(array(
			"success" => false
		));
		printf("Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}

	$stmt->bind_param('i', $event_id);
	$stmt->execute();
	$stmt->bind_result($title, $description, $date, $time);
	$stmt->fetch();
	$stmt->close();

	echo json_encode(array(
		"success" => true,
		"title" => $title,
		"description" => $description,
		"date" => $date,
		"time" => $time
	));
?>
