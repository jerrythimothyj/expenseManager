(function(angular) {
  'use strict';
angular.module('moneyManager')
  .directive('barChart', function() {
    return {
      restrict: 'E',
      templateUrl: './client/views/components/barChart.html',
      controller: 'barChartController'
    };
  });
})(window.angular);