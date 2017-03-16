<?php
require 'database.php';
header("Content-Type: application/json");
session_start();
$user_id = $_SESSION['user_id'];
$date = $_POST['date'];
$stmt = $mysqli->prepare("select title, description, date, time from
events where events.user_id=? and date=?");
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => $mysqli->error;
  ));
  exit;
}
$stmt->bind_param('is', $user_id, $date);
$stmt->execute();

$result = $stmt->get_result();
while($row = $result->fetch_assoc()){
  echo json_encode(array(
    "success" => true,
    //"title" => $row['title'],
    // "description" => $row['description'],
    // "date" => $row['date'],
    // "time" => $row['time']
  ));
  // printf("%s <input type='radio' value=%s name=name>", $row['title'], $row['story_id']);
  // printf("<input type='submit' value='Delete'><br>");
  // printf("<input type='hidden' name='token' value='%s' /> ", $_SESSION['token']);

}
$stmt->close();

?>
