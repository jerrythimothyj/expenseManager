(function(angular) {
  'use strict';
angular.module('moneyManager', ['ui.router'])
    .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
        // $locationProvider.html5Mode(true);
    
        $urlRouterProvider.otherwise("/login");
    
        $stateProvider
        .state('login', {
          url: "/login",
          templateUrl: "./client/views/pages/login.html"
        })
        .state('register', {
          url: "/register",
          templateUrl: "./client/views/pages/register.html"
        })
        .state('forgotPassword', {
          url: "/forgotPassword",
          templateUrl: "./client/views/pages/forgotPassword.html"
        })
        .state('dashboard', {
          url: "/dashboard",
          templateUrl: "./client/views/pages/dashboard.html"
        })
        .state('expenses', {
          url: "/expenses",
          templateUrl: "./client/views/pages/expenses.html",
          controller: 'expensesController',
          controllerAs: 'ec',
          resolve: {
              expenseFields: (expensesService) => {
                  return expensesService.expenseFields();
              },
              spendingFields: (expensesService) => {
                  return expensesService.spendingFields();
              }
          }
        })
        .state('calendar', {
          url: "/calendar",
          templateUrl: "./client/views/pages/calendar.html"
        })
    });
})(window.angular);