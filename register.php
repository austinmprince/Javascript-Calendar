<?php
require 'database.php';
header("Content-Type: application/json");

  $userName = (String)$_POST['username'];
  $password = (String)$_POST['pass'];
  $addPassword = password_hash($password, PASSWORD_DEFAULT);
  $stmt = $mysqli->prepare("insert into users (username, password) values (?, ?)");
  if(!$stmt){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
  }
  // Check the userid that was entered to make sure that it is not a duplicate
  $checkUserID = $mysqli->prepare("SELECT username from users WHERE username=?");
  $checkUserID->bind_param('s', $userName);
  $checkUserID->execute();
  $checkUserIDResult=$checkUserID->fetch();
  if ($checkUserIDResult != '') {
    echo json_encode(array(
      "success" => false,
      "message" => "Username already exists"
    ));
    exit;
  }
  else {
    $stmt->bind_param('ss', $userName, $addPassword);
    $stmt->execute();
    $stmt->close();
    echo json_encode(array("success" => true));
    exit;

}
?>
