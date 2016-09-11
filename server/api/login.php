<?php
	$validations = new validations();
            
    $validObj = new stdClass();
    
    // Email Validation
    $validObj->validEmail = $validations->validateEmail($userObj->user->email);
    
    // Password Validation
    $validObj->validPwd = $validations->validatePwd($userObj->user->pwd);
    
    $validObj->validAll = 1;
    if(!$validObj->validEmail || 
      !$validObj->validPwd)
        $validObj->validAll = 0;
    
    if($validObj->validAll == 1) {
        
        $validObj->validAll = 0;
        $_SESSION['users_email'] = $userObj->user->email;
        
        $dbConfig = new dbConfig();
        $dbConfig->dbConnect();
        
        $miscMethods = new miscMethods();

        $validObj->existingUser = 0;
        $userSql = "SELECT sl FROM users ";
        $userSql .= "WHERE email='".$_SESSION['users_email']."'";
        $userSql .= " and password='".$userObj->user->pwd."'";

        
        $dbResult = $dbConfig->dbQuery($userSql);
        if ($dbResult->num_rows > 0) {
            while($dbRow = $dbResult->fetch_assoc()) {
                $_SESSION['users_sl'] = $dbRow['sl'];
                $validObj->existingUser = 1;
            }
        }

        if($validObj->existingUser == 1)
        	$validObj->validAll = 1;

        if($validObj->validAll == 1) {
	        $userSql = "INSERT INTO users_log (users_sl,";
	        $userSql .= "ip,"; 
	        $userSql .= "time)";
	        $userSql .= "VALUES ('".$_SESSION['users_sl']."',";
	        $userSql .= "'".$miscMethods->getIP()."',";
	        $userSql .= "'".$miscMethods->getDTTM()."')";
	        
	        $dbConfig->dbQuery($userSql);
	    }
    }

    $returnObj = $validObj;
?>