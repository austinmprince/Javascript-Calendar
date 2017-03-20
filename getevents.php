<?php
require 'database.php';
header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
session_start();
$user_id = $_SESSION['user_id'];
$date = $_POST['date'];
$stmt = $mysqli->prepare("select title, description, date, time, event_id, category from events where events.user_id=? and date=?");
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => $mysqli->error,
  ));
  exit;
}
$stmt->bind_param('is', $user_id, $date);
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
     "event_id" => $row['event_id'],
     "category" => $row['category']
   ));
}
echo json_encode(array(
  "success" => true,
  "exists" => true,
  "events" => $data
  // "title" => $row['title'],
  // "description" => $row['description'],
  // "date" => $row['date'],
  // "time" => $row['time']
));
exit;
}
else {
  echo json_encode(array(
    "success" => true,
    "exists" => false
  ));
}



$stmt->close();


?>
