<?php
  $validations = new validations();
  $validObj = new stdClass();

  $validObj->validKind = $validations->validateKind($comparisonObj->kind);

  $validObj->validDate = $validations->validateDate($comparisonObj->date3);
  if($validObj->validDate == true) {
    $validObj->validDate = $validations->validateDate($comparisonObj->date2);

    if($validObj->validDate == true)
        $validObj->validDate = $validations->validateDate($comparisonObj->date1);
  }

  $validObj->validAll = 1;
  if($validObj->validKind == false || $validObj->validDate == false)
     $validObj->validAll = 0;

  if($validObj->validAll == 1) {

    $compareObj = new stdClass();

    $dbConfig = new dbConfig();
    $dbConfig->dbConnect();

    $kind = $comparisonObj->kind;
    $dateArr3 = explode('/', $comparisonObj->date3);
    $dateArr2 = explode('/', $comparisonObj->date2);
    $dateArr1 = explode('/', $comparisonObj->date1);

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
    if($kind == 'yearly') {
        $expenseSql .= " and (date_yyyy='".$dateArr3[0]."'";
        $expenseSql .= " or date_yyyy='".$dateArr2[0]."'";
        $expenseSql .= " or date_yyyy='".$dateArr1[0]."')";
    }
    elseif($kind == 'monthly') {
        $expenseSql .= " and ((date_yyyy='".$dateArr3[0]."' and date_mm='".$dateArr3[1]."')";
        $expenseSql .= " or (date_yyyy='".$dateArr2[0]."' and date_mm='".$dateArr2[1]."')";
        $expenseSql .= " or (date_yyyy='".$dateArr1[0]."' and date_mm='".$dateArr1[1]."'))";
    }
    elseif($kind == 'daily') {
        $expenseSql .= " and ((date_yyyy='".$dateArr3[0]."' and date_mm='".$dateArr3[1]."' and date_dd='".$dateArr3[2]."')";
        $expenseSql .= " or (date_yyyy='".$dateArr2[0]."' and date_mm='".$dateArr2[1]."' and date_dd='".$dateArr2[2]."')";
        $expenseSql .= " or (date_yyyy='".$dateArr1[0]."' and date_mm='".$dateArr1[1]."' and date_dd='".$dateArr1[2]."'))";
    }
    $expenseSql .= " ORDER BY sl DESC";

    $dbResult = $dbConfig->dbQuery($expenseSql);

    if ($dbResult->num_rows > 0) {
        $compareObj->date3 = new stdClass();
        $compareObj->date3->earnings = new stdClass();
        $compareObj->date3->earnings->total = 0;
        $compareObj->date3->earnings->spendings = array();
        $compareObj->date3->spendings = new stdClass();
        $compareObj->date3->spendings->total = 0;
        $compareObj->date3->spendings->expenses = array();

        $compareObj->date2 = new stdClass();
        $compareObj->date2->earnings = new stdClass();
        $compareObj->date2->earnings->total = 0;
        $compareObj->date2->earnings->spendings = array();
        $compareObj->date2->spendings = new stdClass();
        $compareObj->date2->spendings->total = 0;
        $compareObj->date2->spendings->expenses = array();

        $compareObj->date1 = new stdClass();
        $compareObj->date1->earnings = new stdClass();
        $compareObj->date1->earnings->total = 0;
        $compareObj->date1->earnings->spendings = array();
        $compareObj->date1->spendings = new stdClass();
        $compareObj->date1->spendings->total = 0;
        $compareObj->date1->spendings->expenses = array();

        $samplectr = 1;
        while($dbRow = $dbResult->fetch_assoc()) {

            if($dbRow['spendings_types_sl'] == 2) {
                if($kind == 'yearly' && $dbRow['date_yyyy'] == $dateArr3[0]) {
                    $compareObj->date3->spendings->total += $dbRow['amount'];
                    if(isset($compareObj->date3->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date3->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date3->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'monthly' && $dbRow['date_yyyy'] == $dateArr3[0] && $dbRow['date_mm'] == $dateArr3[1]) {
                    $compareObj->date3->spendings->total += $dbRow['amount'];
                    if(isset($compareObj->date3->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date3->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date3->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'daily' && $dbRow['date_yyyy'] == $dateArr3[0] && $dbRow['date_mm'] == $dateArr3[1] && $dbRow['date_dd'] == $dateArr3[2]) {
                    $compareObj->date3->spendings->total += $dbRow['amount'];
                        if(isset($compareObj->date3->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date3->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date3->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'yearly' && $dbRow['date_yyyy'] == $dateArr2[0]) {
                    $compareObj->date2->spendings->total += $dbRow['amount'];
                    if(isset($compareObj->date2->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date2->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date2->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'monthly' && $dbRow['date_yyyy'] == $dateArr2[0] && $dbRow['date_mm'] == $dateArr2[1]) {
                    $compareObj->date2->spendings->total += $dbRow['amount'];
                    if(isset($compareObj->date2->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date2->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date2->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'daily' && $dbRow['date_yyyy'] == $dateArr2[0] && $dbRow['date_mm'] == $dateArr2[1] && $dbRow['date_dd'] == $dateArr2[2]) {
                    $compareObj->date2->spendings->total += $dbRow['amount'];
                        if(isset($compareObj->date2->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date2->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date2->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'yearly' && $dbRow['date_yyyy'] == $dateArr1[0]) {
                    $compareObj->date1->spendings->total += $dbRow['amount'];
                    if(isset($compareObj->date1->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date1->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date1->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'monthly' && $dbRow['date_yyyy'] == $dateArr1[0] && $dbRow['date_mm'] == $dateArr1[1]) {
                    $compareObj->date1->spendings->total += $dbRow['amount'];
                    if(isset($compareObj->date1->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date1->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date1->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'daily' && $dbRow['date_yyyy'] == $dateArr1[0] && $dbRow['date_mm'] == $dateArr1[1] && $dbRow['date_dd'] == $dateArr1[2]) {
                    $compareObj->date1->spendings->total += $dbRow['amount'];
                        if(isset($compareObj->date1->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date1->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date1->spendings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
            }
            elseif($dbRow['spendings_types_sl'] == 1) {
                if($kind == 'yearly' && $dbRow['date_yyyy'] == $dateArr3[0]) {
                    $compareObj->date3->earnings->total += $dbRow['amount'];
                    if(isset($compareObj->date3->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date3->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date3->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'monthly' && $dbRow['date_yyyy'] == $dateArr3[0] && $dbRow['date_mm'] == $dateArr3[1]) {
                    $compareObj->date3->earnings->total += $dbRow['amount'];
                    if(isset($compareObj->date3->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date3->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date3->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'daily' && $dbRow['date_yyyy'] == $dateArr3[0] && $dbRow['date_mm'] == $dateArr3[1] && $dbRow['date_dd'] == $dateArr3[2]) {
                    $compareObj->date3->earnings->total += $dbRow['amount'];
                        if(isset($compareObj->date3->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date3->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date3->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'yearly' && $dbRow['date_yyyy'] == $dateArr2[0]) {
                    $compareObj->date2->earnings->total += $dbRow['amount'];
                    if(isset($compareObj->date2->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date2->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date2->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'monthly' && $dbRow['date_yyyy'] == $dateArr2[0] && $dbRow['date_mm'] == $dateArr2[1]) {
                    $compareObj->date2->earnings->total += $dbRow['amount'];
                    if(isset($compareObj->date2->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date2->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date2->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'daily' && $dbRow['date_yyyy'] == $dateArr2[0] && $dbRow['date_mm'] == $dateArr2[1] && $dbRow['date_dd'] == $dateArr2[2]) {
                    $compareObj->date2->earnings->total += $dbRow['amount'];
                        if(isset($compareObj->date2->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date2->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date2->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'yearly' && $dbRow['date_yyyy'] == $dateArr1[0]) {
                    $compareObj->date1->earnings->total += $dbRow['amount'];
                    if(isset($compareObj->date1->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date1->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date1->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'monthly' && $dbRow['date_yyyy'] == $dateArr1[0] && $dbRow['date_mm'] == $dateArr1[1]) {
                    $compareObj->date1->earnings->total += $dbRow['amount'];
                    if(isset($compareObj->date1->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date1->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date1->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
                elseif($kind == 'daily' && $dbRow['date_yyyy'] == $dateArr1[0] && $dbRow['date_mm'] == $dateArr1[1] && $dbRow['date_dd'] == $dateArr1[2]) {
                    $compareObj->date1->earnings->total += $dbRow['amount'];
                        if(isset($compareObj->date1->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]]))
                        $compareObj->date1->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] += $dbRow['amount'];
                    else
                        $compareObj->date1->earnings->expenses[$expenseTypesArr[$dbRow['expense_types_sl']]] = $dbRow['amount'];
                }
            }
        }
    }

    $expenseSql = "SELECT expense_types.type, SUM(expenses.amount) as amount, expenses.date_yyyy";
    if($kind == 'monthly' || $kind == 'daily')
        $expenseSql .= ", expenses.date_mm";
    if($kind == 'daily')
        $expenseSql .= ", expenses.date_dd";
    $expenseSql .= " FROM expense_types ";
    $expenseSql .= " LEFT JOIN expenses ";
    $expenseSql .= " ON expense_types.sl=expenses.expense_types_sl ";
    $expenseSql .= " AND expense_types.status='1' ";
    $expenseSql .= " AND expenses.users_sl='".$_SESSION['users_sl']."' ";
    $expenseSql .= " AND expenses.spendings_types_sl='2' ";
    $expenseSql .= " AND (expenses.date_yyyy='".$dateArr3[0]."' OR expenses.date_yyyy='".$dateArr2[0]."' OR expenses.date_yyyy='".$dateArr1[0]."') ";
    if($kind == 'monthly' || $kind == 'daily')
        $expenseSql .= " AND (expenses.date_mm='".$dateArr3[1]."' OR expenses.date_mm='".$dateArr2[1]."' OR expenses.date_mm='".$dateArr1[1]."') ";
    if($kind == 'daily')
        $expenseSql .= " AND (expenses.date_dd='".$dateArr3[2]."' OR expenses.date_dd='".$dateArr2[2]."' OR expenses.date_dd='".$dateArr1[2]."') ";
    $expenseSql .= " GROUP BY expense_types.sl,expenses.date_yyyy";
    if($kind == 'monthly' || $kind == 'daily')
        $expenseSql .= ",expenses.date_mm";
    if($kind == 'daily')
        $expenseSql .= ",expenses.date_dd";
    $expenseSql .= " ORDER BY amount DESC,expenses.date_yyyy DESC";
    if($kind == 'monthly' || $kind == 'daily')
        $expenseSql .= ",expenses.date_mm DESC";
    if($kind == 'daily')
        $expenseSql .= ",expenses.date_dd DESC";
    
    $dbResult = $dbConfig->dbQuery($expenseSql);

    if ($dbResult->num_rows > 0) {
        $compareObj->groupChartData = array();
        while($dbRow = $dbResult->fetch_assoc()) {
            $compareObj->groupChartData[] = $dbRow;
        }
    }

    if(isset($expenseColorsArr))
    $compareObj->bubbleColors = $expenseColorsArr;

    $returnObj  = $compareObj;
  }
  else {
    $returnObj = $validObj;
  }
?>
