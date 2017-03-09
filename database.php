<?php
// This file is required on all files on the website provides access to the database
$mysqli = new mysqli('localhost', 'wustl_inst', 'wustl_pass', 'mod5');

if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
?>
