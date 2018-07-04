(function(angular) {
  'use strict';
angular.module('moneyManager')
  .directive('flatValue', function() {
    return {
      restrict: 'E',
      templateUrl: './client/views/components/flatValue.html',
      scope: {
          flatClass: '@',
          titleText: '@',
          flatData: '=',
          flatDataEarnings: '='
      }
    };
  });
})(window.angular);