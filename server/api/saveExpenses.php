<?php
	$dbConfig = new dbConfig();
    $dbConfig->dbConnect();

    $saveExpObj = new stdClass();

 //    $jsonData = {
	// 	date: 'Wed Sep 07 2016 22:15:53 GMT+0530 (India Standard Time)',
	// 	expenses: [
	// 		{
	// 			expenseType: 1,
	// 			spendingType: 2,
	// 			amount: 10.00
	// 		},
	// 		{
	// 			expenseType: 3,
	// 			spendingType: 1,
	// 			amount: 30.00
	// 		},
	// 		{
	// 			expenseType: 2,
	// 			spendingType: 2,
	// 			amount: 37.00
	// 		},
	// 		{
	// 			expenseType: 1,
	// 			spendingType: 2,
	// 			amount: 89.00
	// 		},
	// 		{
	// 			expenseType: 15,
	// 			spendingType: 2,
	// 			amount: 2.00
	// 		},
	// 		{
	// 			expenseType: 20,
	// 			spendingType: 2,
	// 			amount: 99.00
	// 		}
	// 	]
	// };

    $saveExpObj = 'Expenses Saved';

    $returnObj  = $saveExpObj;
?>