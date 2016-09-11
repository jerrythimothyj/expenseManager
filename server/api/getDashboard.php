<?php
  $validations = new validations();
  $validObj = new stdClass();

  $validObj->validDate = $validations->validateDate($expenseObj->date);

  $validObj->validAll = 1;
  if($validObj->validDate == false)
     $validObj->validAll = 0;

  if($validObj->validAll == 1) {

    $dashboardObj = new stdClass();

    $dbConfig = new dbConfig();
    $dbConfig->dbConnect();

    $dateArr = explode('/', $expenseObj->date);

    $expenseTypesSql = "SELECT sl, type FROM expense_types ";
    $expenseTypesSql .= "WHERE status=1";
    $dbResult = $dbConfig->dbQuery($expenseTypesSql);
    if ($dbResult->num_rows > 0) {
      while($dbRow = $dbResult->fetch_assoc()) {
        $expenseTypesArr[$dbRow['sl']] = $dbRow['type'];
      }
    }

    $spendingTypesSql = "SELECT sl, type FROM spending_types ";
    $spendingTypesSql .= "WHERE status=1";
    $dbResult = $dbConfig->dbQuery($spendingTypesSql);
    if ($dbResult->num_rows > 0) {
      while($dbRow = $dbResult->fetch_assoc()) {
        $spendingTypesArr[$dbRow['sl']] = $dbRow['type'];
      }
    }

    $expenseSql = "SELECT date_yyyy, date_mm, date_dd, expense_types_sl, spendings_types_sl, amount FROM expenses ";
    $expenseSql .= "WHERE users_sl='".$_SESSION['users_sl']."'";
    $expenseSql .= " and date_yyyy='".$dateArr[0]."'";
    $expenseSql .= "ORDER BY sl DESC";

    $dbResult = $dbConfig->dbQuery($expenseSql);

    $ictr=0;

    if ($dbResult->num_rows > 0) {
      $dashboardObj->yearly = new stdClass();
      $dashboardObj->yearly->total = 0;
      $dashboardObj->monthly = new stdClass();
      $dashboardObj->monthly->total = 0;
      // $dashboardObj->weekly = new stdClass();
      // $dashboardObj->weekly->total = 0;
      $dashboardObj->daily = new stdClass();
      $dashboardObj->daily->total = 0;

      $yearlyExpenses = array();

        while($dbRow = $dbResult->fetch_assoc()) {

          if($ictr < 10) {
            $dashboardObj->invoices[$ictr] = new stdClass();
            $dashboardObj->invoices[$ictr]->date = $dbRow['date_yyyy']."/".$dbRow['date_mm']."/".$dbRow['date_dd'];
            $dashboardObj->invoices[$ictr]->expenseType = $expenseTypesArr[$dbRow['expense_types_sl']];
            $dashboardObj->invoices[$ictr]->spendingType = $spendingTypesArr[$dbRow['spendings_types_sl']];
            $dashboardObj->invoices[$ictr]->amount = $dbRow['amount'];
          }

          if($dbRow['spendings_types_sl'] == 2) {
            $dashboardObj->yearly->total += $dbRow['amount'];
            if(isset($yearlyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
              $yearlyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
            else
              $yearlyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];

            if($dbRow['date_mm'] == $dateArr[1]) {
              $dashboardObj->monthly->total += $dbRow['amount'];
              if(isset($monthlyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                $monthlyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
              else
                $monthlyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];

              if($dbRow['date_dd'] == $dateArr[2]) {
                $dashboardObj->daily->total += $dbRow['amount'];
                if(isset($dailyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                  $dailyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                else
                  $dailyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
              }
            }
          }

            $ictr++;
        }
    }

    if(isset($yearlyExpenses))
      $dashboardObj->yearly->expenses = $yearlyExpenses;

    if(isset($monthlyExpenses))
      $dashboardObj->monthly->expenses = $monthlyExpenses;

    if(isset($dailyExpenses))
      $dashboardObj->daily->expenses = $dailyExpenses;

    $returnObj  = $dashboardObj;
  }
  else {
    $returnObj = $validObj;
  }
?>