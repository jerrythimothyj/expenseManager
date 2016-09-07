<?php
	session_destroy();
	$returnObj = new stdClass();
	$returnObj->message = "Logged out successfully";
?>