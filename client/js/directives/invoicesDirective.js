(function(angular) {
  'use strict';
angular.module('moneyManager')
  .directive('invoices', () => {
    return {
      restrict: 'E',
      templateUrl: './client/views/components/invoices.html'
    };
  });
})(window.angular);