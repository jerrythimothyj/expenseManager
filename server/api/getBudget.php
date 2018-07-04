<?php
    $validations = new validations();
    $validObj = new stdClass();

    $validObj->validDate = $validations->validateDate($budgetObj->date);

    $validObj->validAll = 1;
    if($validObj->validDate == false)
       $validObj->validAll = 0;

  	if($validObj->validAll == 1) {

  		$dbConfig = new dbConfig();
      $dbConfig->dbConnect();

      $dateArr = explode('/', $budgetObj->date);

      $budgetSql = "SELECT expense_types_sl, comments, amount  FROM budget ";
      $budgetSql .= "WHERE users_sl='".$_SESSION['users_sl']."'";
      $budgetSql .= " and date_yyyy='".$dateArr[0]."'";
      $budgetSql .= " and date_mm='".$dateArr[1]."'";
      $budgetSql .= " ORDER BY sl ASC";

      $dbResult = $dbConfig->dbQuery($budgetSql);

      $bugArr = [];

      $ictr=0;
      if ($dbResult->num_rows > 0) {
          while($dbRow = $dbResult->fetch_assoc()) {
              $bugArr[$ictr]['expenseType'] = $dbRow['expense_types_sl'];
              $bugArr[$ictr]['comments'] = $dbRow['comments'];
              $bugArr[$ictr]['amount'] = (float)$dbRow['amount'];  

              $ictr++;
          }
      }

    	$returnObj  = $bugArr;
  	}
  	else {
  		$returnObj = $validObj;
  	}
?>