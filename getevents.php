<?php
require 'database.php';
header("Content-Type: application/json");
// session cookie http only
ini_set("session.cookie_httponly", 1);
session_start();
$user_id = $_SESSION['user_id'];
$date = $_POST['date'];
$category = $_POST['category'];
// If category that was passed is * get all events and igonre category
if ($category == "*"){
  $stmt = $mysqli->prepare("select title, description, date, time, event_id, category from events where events.user_id=? and date=?");
  if(!$stmt){
    echo json_encode(array(
      "success" => false,
      "message" => $mysqli->error,
    ));
    exit;
  }
  $stmt->bind_param('is', $user_id, $date);
// If category was selected then only get results of certain category
else {
  $stmt = $mysqli->prepare("select title, description, date, time, event_id, category from events where events.user_id=? and date=? and category=?");
  if(!$stmt){
    echo json_encode(array(
      "success" => false,
      "message" => $mysqli->error,
    ));
    exit;
  }
  $stmt->bind_param('iss', $user_id, $date, $category);

}

$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
  $data = array();
// Make an array of all the resulting events that will be included in the jsonData
// that is passed back
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
