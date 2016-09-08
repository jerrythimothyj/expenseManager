<?php
    class moneyManager {
        function newUserRegistration($newUserObj) {
            require('./api/newUserRegistration.php');
            return $returnObj;
        }
        
        function expenseFields() {
            require('./api/expenseFields.php');
            return $returnObj;
        }
        
        function spendingFields() {
            require('./api/spendingFields.php');
            return $returnObj;
        }

         function saveExpenses() {
            require('./api/saveExpenses.php');
            return $returnObj;
        }

        function logout() {
            require('./api/logout.php');
            return $returnObj;
        }
    }
?>