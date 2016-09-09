(function(angular) {
  'use strict';
angular.module('moneyManager')
  .directive('bubbleChart', () => {
    return {
      restrict: 'E',
      templateUrl: './client/views/components/bubbleChart.html',
      scope: {
          bubbleNo: '@',
          titleText: '@'
      },
      controller: 'bubbleChartCtrl',
      controllerAs: 'bcc'
    };
  });
})(window.angular);