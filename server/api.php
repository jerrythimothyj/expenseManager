<?php
    require('./config/config.php');

    $json = file_get_contents('php://input');
    $obj = json_decode($json);


    $expenseManager = new expenseManager();

    switch($_GET['api']) {
        case 'expenseFields':
            print_r(json_encode($expenseManager->expenseFields()));
            break;
            
        case 'spendingFields':
            print_r(json_encode($expenseManager->spendingFields()));
            break;
        
        case 'newUserRegistration':
            print_r(json_encode($expenseManager->newUserRegistration($obj)));
            break;
    }
?>