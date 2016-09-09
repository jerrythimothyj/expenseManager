<?php
	$dbConfig = new dbConfig();
    $dbConfig->dbConnect();

    $validations = new validations();
    $validObj = new stdClass();

    $validObj->validDate = $validations->validateDate($expenseObj->date);

    $validObj->validAll = 1;
  	if($validObj->validDate == false)
  		 $validObj->validAll = 0;

  	if($validObj->validAll == 1) {

  		$dbConfig = new dbConfig();
      $dbConfig->dbConnect();

      $expenseSql = "SELECT expense_types_sl, spendings_types_sl, amount  FROM expenses ";
      $expenseSql .= "WHERE users_sl='".$_SESSION['users_sl']."' and date='".$expenseObj->date."' ";
      echo $expenseSql .= "ORDER BY sl DESC";

      $dbResult = $dbConfig->dbQuery($expenseSql);

      $ictr=0;
      if ($dbResult->num_rows > 0) {
          while($dbRow = $dbResult->fetch_assoc()) {
              $expArr[$ictr]['expenseType'] = $dbRow['expense_types_sl'];
              $expArr[$ictr]['spendingsType'] = $dbRow['spendings_types_sl'];
              $expArr[$ictr]['amount'] = $dbRow['amount'];  

              $ictr++;
          }
      }

    	$returnObj  = $expArr;
  	}
  	else {
  		$returnObj = $validObj;
  	}
?>