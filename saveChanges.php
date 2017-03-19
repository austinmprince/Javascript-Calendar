<?php
	require 'database.php';
	header("Content-Type: application/json");
	session_start();
	date_default_timezone_set('America/Chicago');

	$title = (String)$_POST['title'];
	$undate = $_POST['date'];
	$untime = $_POST['time'];
	$e_id = $_POST['event_id'];

	if(isset($title) && isset($undate) && isset($untime) && !empty($title) && !empty($undate) && !empty($untime)){

		$date = date('Y-m-d', strtotime($undate));

		$time = date('H:i:s', strtotime($untime));
		$description = (String)$_POST['description'];
		$user_id = $_SESSION['user_id'];

		$stmt=$mysqli->prepare('update events set title=?, date=?, time=?, description=? where event_id=?');
		if(!$stmt){
			printf("Query Prep Failed: %s\n", $mysqli->error);
			exit;
		}
		$stmt->bind_param('ssssi', $title, $date, $time, $description, $e_id);
		$stmt->execute();
		$stmt->close();

		echo json_encode(array(
			"success" => true
		));
	}else{
		echo json_encode(array(
			"success" => false
		));
	}
?>