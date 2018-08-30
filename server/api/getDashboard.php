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

    $expenseTypesSql = "SELECT sl, type, color FROM expense_types ";
    $expenseTypesSql .= "WHERE status=1";
    $dbResult = $dbConfig->dbQuery($expenseTypesSql);
    if ($dbResult->num_rows > 0) {
      while($dbRow = $dbResult->fetch_assoc()) {
        $expenseTypesArr[$dbRow['sl']] = $dbRow['type'];
        $expenseColorsArr[$dbRow['type']] = $dbRow['color'];
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
    $expenseSql .= " ORDER BY sl DESC";

    $dbResult = $dbConfig->dbQuery($expenseSql);

    $dashboardObj->yearly = new stdClass();
    $dashboardObj->yearly->total = 0;
    $dashboardObj->yearlyEarnings = new stdClass();
    $dashboardObj->yearlyEarnings->total = 0;
    $dashboardObj->monthly = new stdClass();
    $dashboardObj->monthly->total = 0;
    $dashboardObj->monthlyEarnings = new stdClass();
    $dashboardObj->monthlyEarnings->total = 0;
    // $dashboardObj->weekly = new stdClass();
    // $dashboardObj->weekly->total = 0;
    $dashboardObj->daily = new stdClass();
    $dashboardObj->daily->total = 0;
    $dashboardObj->dailyEarnings = new stdClass();
    $dashboardObj->dailyEarnings->total = 0;
    $dashboardObj->calendarExpenses = array();
    $calendarCtr = 0;

    if ($dbResult->num_rows > 0) {

      $yearlyExpenses = array();

      while($dbRow = $dbResult->fetch_assoc()) {
        if(isset($yearlyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
          $yearlyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['spendings_types_sl'] == 2 ? $dbRow['amount'] : (-1 * $dbRow['amount']);
        else
          $yearlyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['spendings_types_sl'] == 2 ? $dbRow['amount'] : (-1 * $dbRow['amount']);

        if($dbRow['date_mm'] == $dateArr[1]) {
          if(isset($monthlyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
            $monthlyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['spendings_types_sl'] == 2 ? $dbRow['amount'] : (-1 * $dbRow['amount']);
          else
            $monthlyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['spendings_types_sl'] == 2 ? $dbRow['amount'] : (-1 * $dbRow['amount']);

          if($dbRow['date_dd'] == $dateArr[2]) {
            if(isset($dailyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
              $dailyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['spendings_types_sl'] == 2 ? $dbRow['amount'] : (-1 * $dbRow['amount']);
            else
              $dailyExpenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['spendings_types_sl'] == 2 ? $dbRow['amount'] : (-1 * $dbRow['amount']);
          }
        }

        if($dbRow['spendings_types_sl'] == 2) {
          $dashboardObj->yearly->total += $dbRow['amount'];
          
          if($dbRow['date_mm'] == $dateArr[1]) {
            $dashboardObj->monthly->total += $dbRow['amount'];
            
            if($dbRow['date_dd'] == $dateArr[2]) {
              $dashboardObj->daily->total += $dbRow['amount'];
            }
          }
        }
        else if($dbRow['spendings_types_sl'] == 1) {
          $dashboardObj->yearlyEarnings->total += $dbRow['amount'];

          if($dbRow['date_mm'] == $dateArr[1]) {
            $dashboardObj->monthlyEarnings->total += $dbRow['amount'];

            if($dbRow['date_dd'] == $dateArr[2]) {
              $dashboardObj->dailyEarnings->total += $dbRow['amount'];
            }
          }

        }

        $dashboardObj->calendarExpenses[$calendarCtr] = new stdClass();
        // $time = strtotime($dateArr[0].'/'.$dbRow['date_mm'].'/'.$dbRow['date_dd']);
        // $dashboardObj->calendarExpenses[$calendarCtr]->start = date('Y-m-d',$time);
        $dbldigitMonth = $dbRow['date_mm'];
        if($dbRow['date_mm'] < 10)
          $dbldigitMonth = "0".$dbRow['date_mm'];
        $dbldigitDay = $dbRow['date_dd'];
          if($dbRow['date_dd'] < 10)
            $dbldigitDay = "0".$dbRow['date_dd'];
        $dashboardObj->calendarExpenses[$calendarCtr]->start = $dateArr[0]."-".$dbldigitMonth."-".$dbldigitDay."T00:00:00";
        $dashboardObj->calendarExpenses[$calendarCtr]->backgroundColor = $dbRow['spendings_types_sl'] == 1 ? '#2384E8' : '#009444';
        $dashboardObj->calendarExpenses[$calendarCtr]->borderColor = $dbRow['spendings_types_sl'] == 1 ? '#2384E8' : '#009444';
        $dashboardObj->calendarExpenses[$calendarCtr]->title = $expenseTypesArr[$dbRow['expense_types_sl']].": ".$dbRow['amount'];
        $dashboardObj->calendarExpenses[$calendarCtr]->description = $expenseTypesArr[$dbRow['expense_types_sl']];
        if(isset($dbRow['comments']) && $dbRow['comments'] != "")
          $dashboardObj->calendarExpenses[$calendarCtr]->description .= ": ".$dbRow['comments'];
        $dashboardObj->calendarExpenses[$calendarCtr]->spendingType = $spendingTypesArr[$dbRow['spendings_types_sl']];
        $calendarCtr++;
      }

      foreach ($yearlyExpenses as $key => $value) {
        if($value <= 0)
          unset($yearlyExpenses[$key]);
      }

      foreach ($monthlyExpenses as $key => $value) {
        if($value <= 0)
          unset($monthlyExpenses[$key]);
      }

      foreach ($dailyExpenses as $key => $value) {
        if($value <= 0)
          unset($dailyExpenses[$key]);
      }
    }

    $expenseSql = "SELECT date_yyyy, amount, spendings_types_sl FROM expenses ";
    $expenseSql .= "WHERE users_sl='".$_SESSION['users_sl']."'";
    $expenseSql .= " and spendings_types_sl='2' ";
    $expenseSql .= " and date_yyyy<='".$dateArr[0]."' ";
    $expenseSql .= " and date_yyyy>='".($dateArr[0] - 9)."'";
    $expenseSql .= " ORDER BY sl DESC";

    $dbResult = $dbConfig->dbQuery($expenseSql);


    if ($dbResult->num_rows > 0) {
      while($dbRow = $dbResult->fetch_assoc()) {
        if(!isset($yearBars[$dbRow['date_yyyy']]))
          $yearBars[$dbRow['date_yyyy']] = 0;
        $yearBars[$dbRow['date_yyyy']] += $dbRow['amount'];
      }
    }

    for($ictr = ($dateArr[0] - 9); $ictr <= $dateArr[0]; $ictr++) {
      if(!isset($yearBars[$ictr]))
        $yearBars[$ictr] = 0;
    }

    $expenseSql = "SELECT date_mm, amount, spendings_types_sl FROM expenses ";
    $expenseSql .= "WHERE users_sl='".$_SESSION['users_sl']."'";
    $expenseSql .= " and spendings_types_sl='2' ";
    $expenseSql .= " and date_yyyy='".$dateArr[0]."' ";
    $expenseSql .= " and date_mm<='".$dateArr[1]."'";
    $expenseSql .= " ORDER BY sl DESC";

    $dbResult = $dbConfig->dbQuery($expenseSql);

    if ($dbResult->num_rows > 0) {
      while($dbRow = $dbResult->fetch_assoc()) {
        if(!isset($monthBars[$dbRow['date_mm']]))
          $monthBars[$dbRow['date_mm']] = 0;
        $monthBars[$dbRow['date_mm']] += $dbRow['amount'];
      }
    }

    for($ictr = 1; $ictr <= $dateArr[1]; $ictr++) {
      if(!isset($monthBars[$ictr]))
        $monthBars[$ictr] = 0;
    }

    $expenseSql = "SELECT date_dd, amount, spendings_types_sl FROM expenses ";
    $expenseSql .= "WHERE users_sl='".$_SESSION['users_sl']."'";
    $expenseSql .= " and spendings_types_sl='2' ";
    $expenseSql .= " and date_yyyy='".$dateArr[0]."' ";
    $expenseSql .= " and date_mm='".$dateArr[1]."'";
    $expenseSql .= " and date_dd<='".$dateArr[2]."'";
    $expenseSql .= " ORDER BY sl DESC";

    $dbResult = $dbConfig->dbQuery($expenseSql);


    if ($dbResult->num_rows > 0) {
      while($dbRow = $dbResult->fetch_assoc()) {
        if(!isset($dailyBars[$dbRow['date_dd']]))
          $dailyBars[$dbRow['date_dd']] = 0;
        $dailyBars[$dbRow['date_dd']] += $dbRow['amount'];
      }
    }

    for($ictr = $dateArr[2]; $ictr >= 1; $ictr--) {
      if(!isset($dailyBars[$ictr]))
        $dailyBars[$ictr] = 0;
    }

    // $expenseSql = "SELECT date_yyyy, date_mm, date_dd, expense_types_sl, spendings_types_sl, amount FROM expenses ";
    // $expenseSql .= "WHERE users_sl='".$_SESSION['users_sl']."'";
    // $expenseSql .= " ORDER BY date_yyyy DESC, date_mm DESC, date_dd DESC";
    // $expenseSql .= " LIMIT 0,10";
    //
    // $dbResult = $dbConfig->dbQuery($expenseSql);
    //
    // if ($dbResult->num_rows > 0) {
    //   $ictr=0;
    //
    //   while($dbRow = $dbResult->fetch_assoc()) {
    //     $dashboardObj->invoices[$ictr] = new stdClass();
    //     $dashboardObj->invoices[$ictr]->date = $dbRow['date_yyyy']."/".$dbRow['date_mm']."/".$dbRow['date_dd'];
    //     $dashboardObj->invoices[$ictr]->expenseType = $expenseTypesArr[$dbRow['expense_types_sl']];
    //     $dashboardObj->invoices[$ictr]->spendingType = $spendingTypesArr[$dbRow['spendings_types_sl']];
    //     $dashboardObj->invoices[$ictr]->amount = $dbRow['amount'];
    //
    //     $ictr++;
    //   }
    // }

    if(isset($expenseColorsArr))
      $dashboardObj->bubbleColors = $expenseColorsArr;

    if(isset($yearlyExpenses))
      $dashboardObj->yearly->expenses = $yearlyExpenses;

    if(isset($yearBars))
      $dashboardObj->yearly->comparisons = $yearBars;

    if(isset($monthlyExpenses))
      $dashboardObj->monthly->expenses = $monthlyExpenses;

    if(isset($monthBars))
      $dashboardObj->monthly->comparisons = $monthBars;

    if(isset($dailyExpenses))
      $dashboardObj->daily->expenses = $dailyExpenses;

    if(isset($dailyBars))
      $dashboardObj->daily->comparisons = $dailyBars;

    $budgetSql = "SELECT expense_types_sl, amount  FROM budget ";
    $budgetSql .= "WHERE users_sl='".$_SESSION['users_sl']."'";
    $budgetSql .= " and date_yyyy='".$dateArr[0]."'";
    $budgetSql .= " and date_mm='".$dateArr[1]."'";
    $budgetSql .= " ORDER BY sl ASC";

    $dbResult = $dbConfig->dbQuery($budgetSql);

    $bugArr = [];

    $ictr=0;
    if ($dbResult->num_rows > 0) {
        while($dbRow = $dbResult->fetch_assoc()) {
          if(isset($bugArr[$expenseTypesArr[$dbRow['expense_types_sl']]]))
            $bugArr[$expenseTypesArr[$dbRow['expense_types_sl']]] += (float)$dbRow['amount'];
          else
            $bugArr[$expenseTypesArr[$dbRow['expense_types_sl']]] = (float)$dbRow['amount'];

            $ictr++;
        }
    }

    $exceedBudgetArr = [];
    $exceedBudCtr = 0;
    foreach ($bugArr as $key => $value) {
      if(array_key_exists($key, $dashboardObj->monthly->expenses) && (float)$dashboardObj->monthly->expenses[$key] > (float)$value) {
        $exceedBudgetArr[$exceedBudCtr]['expenseType'] = $key;
        $exceedBudgetArr[$exceedBudCtr]['amount'] = $dashboardObj->monthly->expenses[$key] - $value;
        $exceedBudCtr++;
      }
    }

    if(isset($exceedBudgetArr))
      $dashboardObj->budgetExceed = $exceedBudgetArr;

    $returnObj  = $dashboardObj;
  }
  else {
    $returnObj = $validObj;
  }
?>
