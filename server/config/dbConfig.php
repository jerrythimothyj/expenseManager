<?php

    class dbConfig {
        
        private $dbHost     = "sql205.my-webs.org";
        private $dbUsername = "mw_6427044";
        private $dbPassword = "qwertyui";
        private $dbName     = "mw_6427044_bigjapps_mm";
        private $dbCon;
        
        function dbConnect() {
            $this->dbCon = mysqli_connect($this->dbHost,$this->dbUsername,$this->dbPassword,$this->dbName);

            // Check connection
            if (mysqli_connect_errno()) {
                echo "Failed to connect to MySQL: " . mysqli_connect_error();
            }
        }
        
        function dbQuery($sql) {
              return $this->dbCon->query($sql);
//            $queryResult = $this->dbCon->query($sql);
//            if ($queryResult === TRUE) {
//                return $queryResult;
//            } else {
//                $this->dbError($sql, mysqli_error($this->dbCon));
//                return 0;
//            }
        }
        
        function dbError($sql, $error) {
            $sql = urlencode($sql);
            $error = urlencode($error);
            $miscMethods = new miscMethods();
            
            $errorSql = "INSERT INTO db_errors(users_sl,";
            $errorSql .= "file_name,";
            $errorSql .= "query,";
            $errorSql .= "error,";
            $errorSql .= "ip,";
            $errorSql .= "time)"; 
            $errorSql .= "VALUES('',";
            $errorSql .= "'',";
            $errorSql .= "'".$sql."',";
            $errorSql .= "'".$error."',";
            $errorSql .= "'".$miscMethods->getIP()."',";
            $errorSql .= "'".$miscMethods->getDTTM()."');";
            
            $this->dbQuery($errorSql);
        }
    }
?>