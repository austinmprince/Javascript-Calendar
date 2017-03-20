<?php
	require 'database.php';
	header("Content-Type: application/json");
	ini_set("session.cookie_httponly", 1);
	session_start();
	date_default_timezone_set('America/Chicago');

	$my_id=$_SESSION['user_id'];
	$stmt=$mysqli->prepare("SELECT user_id FROM shares WHERE friend_id=?");
	if(!$stmt){
		echo json_encode(array(
			"success" => false
		));
		printf("Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}

	$stmt->bind_param('i', $my_id);
	$stmt->execute();

	$result = $stmt->get_result();
	if ($result->num_rows > 0) {
  		$list = array();
		while($row = $result->fetch_assoc()){
   			array_push($list, array(
		     "id" => $row['user_id']
   			));
		}
		echo json_encode(array(
		  "success" => true,
		  "exists" => true,
		  "friends" => $list
		));
		exit;
	}else{
		echo json_encode(array(
			"success" => false,
			"message" => "No friends"
		));
		exit;
	}

	$stmt->close();
?>