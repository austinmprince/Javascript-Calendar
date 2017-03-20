<?php
	require 'database.php';
	header("Content-Type: application/json");
	ini_set("session.cookie_httponly", 1);
	session_start();
	date_default_timezone_set('America/Chicago');

	$friend_name = (String)$_POST['friend_name'];
	$user_id = $_SESSION["user_id"];

	//check if user exists
	$stmt=$mysqli->prepare("SELECT COUNT(*),user_id FROM users WHERE username=?");

	if(!$stmt){
		echo json_encode(array(
			"success" => false
		));
		printf("1 Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}

	$stmt->bind_param('s', $friend_name);
	$stmt->execute();
	$stmt->bind_result($count, $friend_id);
	$stmt->fetch();
	$stmt->close();

	if($count){
		//user exists
		//insert friendship into db
		$stmt=$mysqli->prepare("insert into shares (user_id, friend_id) values (?, ?)");

		if(!$stmt){
			printf("2 Query Prep Failed: %s\n", $mysqli->error);
			exit;
		}

		$stmt->bind_param("ii", $user_id, $friend_id);
		$stmt->execute();
		$stmt->close();

		echo json_encode(array(
			"success" => true,
		));

	}else{
		echo json_encode(array(
			"success" => false,
			"message" => "User does not exist"
		));
		exit;
	}
?>