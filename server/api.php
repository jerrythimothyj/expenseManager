<?php
    require('./config/config.php');

    $json = file_get_contents('php://input');
    $obj = json_decode($json);


    $moneyManager = new moneyManager();

    switch($_GET['api']) {
        case 'newUserRegistration':
            print_r(json_encode($moneyManager->newUserRegistration($obj)));
            break;
            
        case 'expenseFields':
            print_r(json_encode($moneyManager->expenseFields()));
            break;
            
        case 'spendingFields':
            print_r(json_encode($moneyManager->spendingFields()));
            break;

        case 'saveExpenses':
            print_r(json_encode($moneyManager->saveExpenses()));
            break;

        case 'logout':
            print_r(json_encode($moneyManager->logout($obj)));
            break;
    }
?>