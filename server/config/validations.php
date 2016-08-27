<?php
    class validations {
        function validateEmail($email) {
            if (!filter_var($email, FILTER_VALIDATE_EMAIL))
              return 0;
            return 1;
        }
        
        function validatePwd($pwd) {
            return (strlen($pwd) < 8)? 0 : 1;
        }
        
        function validateConfPwd($pwd, $confPwd) {
            return (strcmp($pwd,$confPwd) != 0)? 0 : 1; 
        }
    }
?>