<!DOCTYPE html>
<head>
	<meta charset="utf-8"/>
	<title>My Web Page</title>
	<style type="text/css">
	body{
		text-align: center;
		width: 760px; /* how wide to make your web page */
		background-color: teal; /* what color to make the background */
		margin: 0 auto;
		padding: 0;
		font:14px/16px Verdana, sans-serif; /* default font */
	}
	div#main{
		background-color: #FFF;
		margin: 0;
		padding: 10px;
	}
	</style>
</head>
<body><div id="main">
	<h3>Register a new user for the Calendar of the Future</h3>
	<form action="userAdd.php" method="post" autocomplete="off">
		Enter username: <input type="text" name="userName">
		Enter password: <input type="password" name="password">
		<input type="submit" name="login">
	</form>
	<form action='CalendarLogin.html'>
		<br><input type='submit' value='Back to Login Screen' name='Submit'></form>

	<?php
	require 'database.php';
	if (isset($_POST['userName']) && isset($_POST['password'])){
		$userName = (String)$_POST['userName'];
		$password = (String)$_POST['password'];
		// Hash the password
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
			echo "User ID already exists";
		}
		else {
			$stmt->bind_param('ss', $userName, $addPassword);
			$stmt->execute();
			$stmt->close();
			header("Location: CalendarLogin.html");
			exit;

		}
	}
	?>


</div></body>
</html>
