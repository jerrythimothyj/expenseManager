<?php
	$dbConfig = new dbConfig();
    $dbConfig->dbConnect();
    
    $expFieldsSql = "SELECT * FROM expense_types";
    $dbResult = $dbConfig->dbQuery($expFieldsSql);
    if ($dbResult->num_rows > 0) {
        while($dbRow = $dbResult->fetch_assoc()) {
            $expFieldsRows[] = $dbRow;
        }
    }

    $returnObj  = $expFieldsRows;
?>