(function(angular) {
  'use strict';
angular.module('moneyManager', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        // $locationProvider.html5Mode(true);
    
        $urlRouterProvider.otherwise("/login");
    
        $stateProvider
        .state('login', {
          url: "/login",
          templateUrl: "./client/views/pages/login.html",
          controller: 'loginController'
        })
        .state('register', {
          url: "/register",
          templateUrl: "./client/views/pages/register.html",
          controller: 'registerController'
        })
        .state('forgotPassword', {
          url: "/forgotPassword",
          templateUrl: "./client/views/pages/forgotPassword.html",
          controller: 'forgotPasswordController'
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
          templateUrl: "./client/views/pages/calendar.html"
        })
    });
})(window.angular);