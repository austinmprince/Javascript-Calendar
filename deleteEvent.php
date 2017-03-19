<?php
  require 'database.php';
  session_start();
  // if(!hash_equals($_SESSION['token'], $_POST['token'])){
	//    die("Request forgery detected");
  // }
  // Get the name of the file
  $id_num = (int)$_POST['event_id'];
  // First we delete all the comments that are associated with our given story
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
