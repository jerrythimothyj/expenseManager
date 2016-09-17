<?php
    $validations = new validations();
    $validObj = new stdClass();

    $validObj->validDate = $validations->validateDate($expenseObj->date);

    $validObj->validAll = 1;
  	if($validObj->validDate == false)
  		 $validObj->validAll = 0;

  	if($validObj->validAll == 1) {

  		$dbConfig = new dbConfig();
      $dbConfig->dbConnect();

      $dateArr = explode('/', $expenseObj->date);

      $expenseSql = "SELECT expense_types_sl, spendings_types_sl, amount  FROM expenses ";
      $expenseSql .= "WHERE users_sl='".$_SESSION['users_sl']."'";
      $expenseSql .= " and date_yyyy='".$dateArr[0]."'";
      $expenseSql .= " and date_mm='".$dateArr[1]."'";
      $expenseSql .= " and date_dd='".$dateArr[2]."'";
      $expenseSql .= " ORDER BY sl DESC";

      $dbResult = $dbConfig->dbQuery($expenseSql);

      $expArr = [];

      $ictr=0;
      if ($dbResult->num_rows > 0) {
          while($dbRow = $dbResult->fetch_assoc()) {
              $expArr[$ictr]['expenseType'] = $dbRow['expense_types_sl'];
              $expArr[$ictr]['spendingsType'] = $dbRow['spendings_types_sl'];
              $expArr[$ictr]['amount'] = (float)$dbRow['amount'];  

              $ictr++;
          }
      }

    	$returnObj  = $expArr;
  	}
  	else {
  		$returnObj = $validObj;
  	}
?>