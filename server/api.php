<?php
    require('./config/config.php');

    $json = file_get_contents('php://input');
    $obj = json_decode($json);


    $moneyManager = new moneyManager();

    switch($_GET['api']) {
        case 'expenseFields':
            print_r(json_encode($moneyManager->expenseFields()));
            break;
            
        case 'spendingFields':
            print_r(json_encode($moneyManager->spendingFields()));
            break;
        
        case 'newUserRegistration':
            print_r(json_encode($moneyManager->newUserRegistration($obj)));
            break;
    }
?>