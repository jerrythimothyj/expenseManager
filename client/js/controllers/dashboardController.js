(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('dashboardController', function($scope, dashboardData, dashboardService) {
        let d = new Date();
        $scope.expenseDate = {
            year: d.getFullYear(),
            month: (d.getMonth() + 1),
            day: d.getDate()
        }

        let resetDashboard = (dashboardData) => {
            $scope.budgetExceed = dashboardData.data.budgetExceed;
            
            $scope.bubbleColors = dashboardData.data.bubbleColors;

            $scope.dailyBubble = dashboardData.data.daily;
            $scope.dailyBubbleEarnings = dashboardData.data.dailyEarnings;
            $scope.dailyBar = [];
            if ($scope.dailyBubble) {
                _.map($scope.dailyBubble.comparisons, (num, key) => {
                    $scope.dailyBar.push({
                        time: key,
                        amount: num
                    });
                });
            }
            $scope.dailyBar.reverse();

            $scope.monthlyBubble = dashboardData.data.monthly;
            $scope.monthlyBubbleEarnings = dashboardData.data.monthlyEarnings;
            $scope.monthlyBar = [];
            $scope.monthsName = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            if ($scope.monthlyBubble) {
                _.map($scope.monthlyBubble.comparisons, (num, key) => {
                    $scope.monthlyBar.push({
                        time: $scope.monthsName[key],
                        amount: num
                    });
                });
            }
            $scope.monthlyBar.reverse();

            $scope.yearlyBubble = dashboardData.data.yearly;
            $scope.yearlyBubbleEarnings = dashboardData.data.yearlyEarnings;
            $scope.yearlyBar = [];
            if ($scope.yearlyBubble) {
                _.map($scope.yearlyBubble.comparisons, (num, key) => {
                    $scope.yearlyBar.push({
                        time: key,
                        amount: num
                    });
                });
            }
            $scope.yearlyBar.reverse();

            $scope.barData = {
                daily: $scope.dailyBar,
                monthly: $scope.monthlyBar,
                yearly: $scope.yearlyBar            
            }

            $scope.barColorClass = {
                daily: 'bar-danger',
                monthly: 'bar-success',
                yearly: 'bar-info'            
            }

            // $scope.invoices = dashboardData.data.invoices;
            // _.map($scope.invoices, (num, key) => {
            //     num.date = new Date(num.date);
            // });

            $scope.calendarExpenses = dashboardData.data.calendarExpenses;

            if(dashboardData.data.validAll === 0) {
                $scope.getExpenseValidation = dashboardData.data;
            }
        }

        resetDashboard(dashboardData);

        $scope.getExpenseRecords = (expenseDate) => {
            dashboardService.getDashboard(expenseDate).then((response) => {
                resetDashboard(response);
            });
        };
    });
})(window.angular);