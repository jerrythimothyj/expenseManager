(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('dashboardController', function($scope, dashboardData) {
        $scope.bubbleColors = dashboardData.data.bubbleColors;

        $scope.dailyBubble = dashboardData.data.daily;
        $scope.dailyBar = [];
        for(let ictr = 1; ictr <= 30; ictr++) {
            $scope.dailyBar.push({
                time: ictr,
                amount: Math.floor((Math.random() * 100) + 1)
            });
        }

        $scope.monthlyBubble = dashboardData.data.monthly;
        $scope.monthlyBar = [];
        for(let ictr = 1; ictr <= 12; ictr++) {
            $scope.monthlyBar.push({
                time: ictr,
                amount: Math.floor((Math.random() * 100) + 1)
            });
        }

        $scope.yearlyBubble = dashboardData.data.yearly;
        $scope.yearlyBar = [];
        for(let ictr = 2016; ictr >= 2012; ictr--) {
            $scope.yearlyBar.push({
                time: ictr,
                amount: Math.floor((Math.random() * 100) + 1)
            });
        }

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