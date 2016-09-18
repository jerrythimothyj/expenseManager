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
        $scope.monthlyBar = $scope.dailyBar;

        $scope.yearlyBubble = dashboardData.data.yearly;
        $scope.yearlyBar = $scope.dailyBar;

        $scope.invoices = dashboardData.data.invoices;
        _.map($scope.invoices, (num, key) => {
            num.date = new Date(num.date);
        });
    });
})(window.angular);