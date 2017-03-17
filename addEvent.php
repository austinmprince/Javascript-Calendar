<?php 
	require 'database.php';
	header("Content-Type: application/json");
	// session_start();

	// makes sure right user
  //   if(!hash_equals($_SESSION['token'], $_POST['token'])){
  //    die("Request forgery detected");
  // }

  if(isset($_POST['title']) && isset($_POST['date'])){
  	//MAKE SURE YOU PASS USER_ID
	$title = (String)$_POST['title'];
	$date = $_POST['date'];
	$time = $_POST['time'];
	$description = (String)$_POST['description'];

	$stmt = $mysqli->prepare("insert into events (title, description, date, time) values (?, ?, ?, ?)");
	if(!$stmt){
		printf("Query Prep Failed: %s\n", $mysqli->error);
  	  	exit;
	}
	$stmt->bind_param('ssss', $title, $description, $date, $time);
	$stmt->execute();
	$stmt->close();
	echo json_encode(array("success" => true));
  }else{
  	echo json_encode(array(
  		"success" => false, 
  		"message" => "Missing information"
  	));
  }
?>