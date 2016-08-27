(function(angular) {
  'use strict';
angular.module('expenseManager', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
    
        $stateProvider
        .state('login', {
          url: "/login",
          templateUrl: "./client/views/pages/login.php"
        })
        .state('register', {
          url: "/register",
          templateUrl: "./client/views/pages/register.php"
        })
        .state('forgotPassword', {
          url: "/forgotPassword",
          templateUrl: "./client/views/pages/forgotPassword.php"
        })
        .state('dashboard', {
          url: "/dashboard",
          templateUrl: "./client/views/pages/dashboard.php"
        })
        .state('expenses', {
          url: "/expenses",
          templateUrl: "./client/views/pages/expenses.php",
          controller: 'expensesController',
          controllerAs: 'ec',
          resolve: {
              expenseFields: function(expensesService) {
                  return expensesService.expenseFields();
              },
              spendingFields: function(expensesService) {
                  return expensesService.spendingFields();
              }
          }
        })
        .state('calendar', {
          url: "/calendar",
          templateUrl: "./client/views/pages/calendar.php"
        })
    });
})(window.angular);