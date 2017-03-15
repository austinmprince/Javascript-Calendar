<?php
  // Destroy the session
  session_start();
  session_destroy();
  echo json_encode(array("success" => true));
  exit;
?>
