<?php
	session_destroy();
	$logoutObj = new stdClass();
	$logoutObj->message = "Logged out successfully";

	$returnObj  = $logoutObj;
?>