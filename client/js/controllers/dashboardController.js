(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('dashboardController', function($scope, dashboardData) {
        $scope.bubbleColors = dashboardData.data.bubbleColors;

        $scope.dailyBubble = dashboardData.data.daily;
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

        $scope.invoices = dashboardData.data.invoices;
        _.map($scope.invoices, (num, key) => {
            num.date = new Date(num.date);
        });
    });
})(window.angular);