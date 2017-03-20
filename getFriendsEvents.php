<?php
	require 'database.php';
	header("Content-Type: application/json");
	ini_set("session.cookie_httponly", 1);
	session_start();
	$friend_id = $_POST['friend_id'];
	$user_id=$_SESSION['user_id'];
	//get events associated to this user
	$stmt = $mysqli->prepare("select title, description, date, time, event_id from events where events.user_id=?");

	if(!$stmt){
  		echo json_encode(array(
    		"success" => false,
    		"message" => $mysqli->error,
  		));
  		exit;
  	}

  	$stmt->bind_param('i', $friend_id);
	$stmt->execute();

	$result = $stmt->get_result();
	if ($result->num_rows > 0) {
  		$data = array();
		while($row = $result->fetch_assoc()){
   			array_push($data, array(
     		"title" => $row['title'],
     		"description" => $row['description'],
     		"date" => $row['date'],
    		"time" => $row['time'],
     		"event_id" => $row['event_id']
   			));
		}
		echo json_encode(array(
			"success" => true,
			"exists" => true,
			"events" => $data
		));
		exit();
	}else{
		echo json_encode(array(
    		"success" => true,
    		"exists" => false,
    		'message' => $result->num_rows
  		));
	}
	$stmt->close();
?>