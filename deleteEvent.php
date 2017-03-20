<?php

  require 'database.php';
  ini_set("session.cookie_httponly", 1);
  session_start();
  $id_num = (int)$_POST['event_id'];
  $token = (int)$_POST['token'];
  if(!hash_equals($_SESSION['token'], $_POST['token'])){
	   die("Request forgery detected");
   }

  // Delete event where event_id matches that passed to it by JavaScript function call
  $stmt = $mysqli->prepare("delete from events where event_id=?");
  if(!$stmt){
    echo json_encode(array(
      "success" => false,
      "message" => "Incorrect Username or Password"
    ));
    exit;
  }
  $stmt->bind_param('s', $id_num);
  $stmt->execute();
  $stmt->close();
  // Then we delete the actual event itself
  $stmt = $mysqli->prepare("delete from events where event_id=?");
  if(!$stmt){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
  }
  $stmt->bind_param('s', $file_name);
  $stmt->execute();
  $stmt->close();
  echo json_encode(array(
    "success" => true,


  ));
  exit;

?>
