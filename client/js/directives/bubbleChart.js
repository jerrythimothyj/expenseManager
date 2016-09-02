(function(angular) {
  'use strict';
angular.module('moneyManager')
  .directive('bubbleChart', function() {
    return {
      restrict: 'E',
      templateUrl: './client/views/components/bubbleChart.php',
      scope: {
          bubbleNo: '@',
          titleText: '@'
      },
      controller: 'bubbleChartCtrl',
      controllerAs: 'bcc'
    };
  });
})(window.angular);