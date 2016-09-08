<?php
	$validations = new validations();
            
    $validObj = new stdClass();
    
    // Email Validation
    $validObj->validEmail = $validations->validateEmail($newUserObj->user->email);
    
    // Password Validation
    $validObj->validPwd = $validations->validatePwd($newUserObj->user->pwd);
    
    // Confirm Password Validation
    $validObj->validConfPwd = $validations->validateConfPwd($newUserObj->user->pwd, $newUserObj->user->confPwd);
    
    $validObj->validAll = 1;
    if(!$validObj->validEmail || 
      !$validObj->validPwd || 
      !$validObj->validConfPwd)
        $validObj->validAll = 0;
    
    if($validObj->validAll == 1) {
        
        $_SESSION['users_email'] = $newUserObj->user->email;
        
        $dbConfig = new dbConfig();
        $dbConfig->dbConnect();
        
        $miscMethods = new miscMethods();

        $validObj->existingUser = 0;
        $newUserSql = "SELECT sl FROM users ";
        $newUserSql .= "WHERE email='".$_SESSION['users_email']."'";
        
        $dbResult = $dbConfig->dbQuery($newUserSql);
        if ($dbResult->num_rows > 0) {
            while($dbRow = $dbResult->fetch_assoc()) {
                $_SESSION['users_sl'] = $dbRow['sl'];
                $validObj->existingUser = 1;
            }
        }

        if($validObj->existingUser == 1)
        	$validObj->validAll = 0;

        if($validObj->validAll == 1) {
	        $newUserSql = "INSERT INTO users (email,";
	        $newUserSql .= "password,";
	        $newUserSql .= "ip,"; 
	        $newUserSql .= "time)";
	        $newUserSql .= "VALUES ('".$newUserObj->user->email."',";
	        $newUserSql .= "'".$newUserObj->user->pwd."',";
	        $newUserSql .= "'".$miscMethods->getIP()."',";
	        $newUserSql .= "'".$miscMethods->getDTTM()."')";
	        
	        $dbConfig->dbQuery($newUserSql);
	        
	        $newUserSql = "SELECT sl FROM users ";
	        $newUserSql .= "WHERE email='".$_SESSION['users_email']."'";
	        
	        $dbResult = $dbConfig->dbQuery($newUserSql);
	        if ($dbResult->num_rows > 0) {
	            while($dbRow = $dbResult->fetch_assoc()) {
	                $_SESSION['users_sl'] = $dbRow['sl'];
	                $validObj->validUser = 1;
	            }
	        }
	    }
    }

    $returnObj = $validObj;
?>