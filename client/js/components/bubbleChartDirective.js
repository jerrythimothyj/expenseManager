(function(angular) {
  'use strict';
angular.module('moneyManager')
  .component('bubbleChart', {
    templateUrl: './client/views/components/bubbleChart.html',
    bindings: {
        bubbleNo: '@',
        bubbleData: '=',
        bubbleColors: '='
    },
    controller: 'bubbleChartController'
  });
})(window.angular);