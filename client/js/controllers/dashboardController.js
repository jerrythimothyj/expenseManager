(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('dashboardController', function($scope, dashboardData) {
        $scope.bubbleColors = dashboardData.data.bubbleColors;
        $scope.dailyBubble = dashboardData.data.daily;
        $scope.monthlyBubble = dashboardData.data.monthly;
        $scope.yearlyBubble = dashboardData.data.yearly;
        $scope.invoices = dashboardData.data.invoices;
        _.map($scope.invoices, (num, key) => {
            num.date = new Date(num.date);
        });
    });
})(window.angular);