(function(angular) {
  "use strict";
  angular
    .module("moneyManager", ["ui.router", "ui.calendar"])

    .config(function($httpProvider) {
      $httpProvider.interceptors.push("loaderInterceptorFactory");
    })

    .config(function($httpProvider) {
      $httpProvider.interceptors.push("apiInterceptorFactory");
    })

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
      // $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise("/login");

      $stateProvider
        .state("login", {
          url: "/login",
          templateUrl: "./client/views/pages/login.html",
          controller: "loginController",
          controllerAs: "lc"
        })
        .state("register", {
          url: "/register",
          templateUrl: "./client/views/pages/register.html",
          controller: "registerController",
          controllerAs: "rc"
        })
        .state("forgotPassword", {
          url: "/forgotPassword",
          templateUrl: "./client/views/pages/forgotPassword.html",
          controller: "forgotPasswordController",
          controllerAs: "fc"
        })
        .state("dashboard", {
          url: "/dashboard",
          templateUrl: "./client/views/pages/dashboard.html",
          controller: "dashboardController",
          controllerAs: "dc",
          resolve: {
            dashboardData: function(dashboardService) {
              let d = new Date();
              let dateObj =
                d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
              return dashboardService.getDashboard(dateObj);
            }
          }
        })
        .state("expenses", {
          url: "/expenses",
          templateUrl: "./client/views/pages/expenses.html",
          controller: "expensesController",
          controllerAs: "ec",
          resolve: {
            expenseFields: function(expensesService) {
              return expensesService.expenseFields();
            },
            spendingFields: function(expensesService) {
              return expensesService.spendingFields();
            },
            expensesData: function(expensesService) {
              let d = new Date();
              let dateObj =
                d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
              return expensesService.getExpenses(dateObj);
            }
          }
        })
        .state("budget", {
          url: "/budget",
          templateUrl: "./client/views/pages/budget.html",
          controller: "budgetController",
          controllerAs: "bc",
          resolve: {
            expenseFields: function(expensesService) {
              return expensesService.expenseFields();
            },
            budgetData: function(budgetService) {
              let d = new Date();
              let dateObj =
                d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + 1;
              return budgetService.getBudget(dateObj);
            }
          }
        })
        .state("calendar", {
          url: "/calendar",
          templateUrl: "./client/views/pages/calendar.html"
        });
    })

    .run(function($state, $rootScope) {
      $rootScope.$state = $state;
    });
})(window.angular);
