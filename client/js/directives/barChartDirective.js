(function(angular) {
  'use strict';
angular.module('moneyManager')
  .directive('barChart', function() {
    return {
      restrict: 'E',
      templateUrl: './client/views/components/barChart.html',
      scope: {
        barData: '=',
        barColorClass: '='
      },
      controller: 'barChartController'
    };
  });
})(window.angular);