(function(angular) {
  'use strict';
angular.module('moneyManager')
  .component('barChart', {
      templateUrl: './client/views/components/barChart.html',
      bindings: {
        barData: '=',
        barColorClass: '='
      },
      controller: 'barChartController'
  });
})(window.angular);