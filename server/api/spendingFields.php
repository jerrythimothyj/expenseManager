<?php	
	$dbConfig = new dbConfig();
	$dbConfig->dbConnect();

	$spendFieldsSql = "SELECT * FROM spending_types";
	$dbResult = $dbConfig->dbQuery($spendFieldsSql);
	if ($dbResult->num_rows > 0) {
	    while($dbRow = $dbResult->fetch_assoc()) {
	        $spendFieldsRows[] = $dbRow;
	    }
	}

	$returnObj  = $spendFieldsRows;
?>