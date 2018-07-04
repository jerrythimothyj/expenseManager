<?php

    require('./config/config.php');

    if($_GET['api'] != 'newUserRegistration' && 
       $_GET['api'] != 'login' &&
       $_GET['api'] != 'forgotPassword' ) {

        if(!isset($_SESSION['users_sl'])) {
            header('HTTP/1.0 403 Forbidden');
            return 'You are forbidden!';
        };
    }

    $json = file_get_contents('php://input');
    $obj = json_decode($json);


    $moneyManager = new moneyManager();

    switch($_GET['api']) {
        case 'newUserRegistration':
            print_r(json_encode($moneyManager->newUserRegistration($obj)));
            break;

        case 'login':
            print_r(json_encode($moneyManager->login($obj)));
            break;

        case 'forgotPassword':
            print_r(json_encode($moneyManager->forgotPassword($obj)));
            break;

        case 'logout':
            print_r(json_encode($moneyManager->logout($obj)));
            break;
            
        case 'expenseFields':
            print_r(json_encode($moneyManager->expenseFields()));
            break;
            
        case 'spendingFields':
            print_r(json_encode($moneyManager->spendingFields()));
            break;

        case 'saveExpenses':
            print_r(json_encode($moneyManager->saveExpenses($obj)));
            break;

        case 'saveBudget':
            print_r(json_encode($moneyManager->saveBudget($obj)));
            break;

        case 'getExpenses':
            print_r(json_encode($moneyManager->getExpenses($obj)));
            break;

        case 'getBudget':
            print_r(json_encode($moneyManager->getBudget($obj)));
            break;

        case 'getDashboard':
            print_r(json_encode($moneyManager->getDashboard($obj)));
            break;
    }
?>