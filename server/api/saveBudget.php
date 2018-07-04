<?php
    $validations = new validations();
    $validObj = new stdClass();

    $validObj->validDate = $validations->validateDate($budgetObj->date);

    $validObj->validAll = 1;
    if($validObj->validDate == false)
       $validObj->validAll = 0;

  	$ictr = 1;

  	foreach ($budgetObj->budget as $budget) {
  		if(!$validations->validateNumber($budget->expenseType) || $budget->expenseType <= 0) {
  			$validObj->invalidExpenseType[] = $ictr;
  			$validObj->validAll = 0;
  		}

      if(!$validations->validateFreeText($budget->comments)) {
        $validObj->invalidComments[] = $ictr;
        $validObj->validAll = 0;
      }

  		if(!$validations->validateNumber($budget->amount) || $budget->amount <= 0) {
  			$validObj->invalidAmount[] = $ictr;
  			$validObj->validAll = 0;
  		}

		$ictr++;
  	}

  	if($validObj->validAll == 1) {
  		$saveBudObj = new stdClass();

  		$dbConfig = new dbConfig();
        $dbConfig->dbConnect();
        
        $miscMethods = new miscMethods();

        $dateArr = explode('/', $budgetObj->date);

        $budgetSql = "DELETE FROM budget ";
        $budgetSql .= "WHERE users_sl='".$_SESSION['users_sl']."'";
        $budgetSql .= " and date_yyyy='".$dateArr[0]."'";
        $budgetSql .= " and date_mm='".$dateArr[1]."'";

        $dbResult = $dbConfig->dbQuery($budgetSql);

  		foreach ($budgetObj->budget as $budget) {
	        
	        $budgetSql = "INSERT INTO budget (users_sl,";
          $budgetSql .= "date_yyyy,";
          $budgetSql .= "date_mm,";
          $budgetSql .= "expense_types_sl,";
          $budgetSql .= "comments,";
	        $budgetSql .= "amount,";
	        $budgetSql .= "ip,"; 
	        $budgetSql .= "time)";
	        $budgetSql .= "VALUES ('".$_SESSION['users_sl']."',";
          $budgetSql .= "'".$dateArr[0]."',";
          $budgetSql .= "'".$dateArr[1]."',";
          $budgetSql .= "'".$budget->expenseType."',";
          $budgetSql .= "'".htmlspecialchars($budget->comments)."',";
	        $budgetSql .= "'".$budget->amount."',";
	        $budgetSql .= "'".$miscMethods->getIP()."',";
	        $budgetSql .= "'".$miscMethods->getDTTM()."')";
	        
	        $dbConfig->dbQuery($budgetSql);
  		}

  		$saveBudObj->saveInd = 1;
    	$saveBudObj->saveText = 'Budget Saved';

    	$returnObj  = $saveBudObj;
  	}
  	else {
  		$returnObj = $validObj;
  	}
?>