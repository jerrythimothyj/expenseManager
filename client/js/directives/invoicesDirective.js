(function(angular) {
  'use strict';
angular.module('moneyManager')
  .directive('invoices', function() {
    return {
      restrict: 'E',
      templateUrl: './client/views/components/invoices.html'
    };
  });
})(window.angular);