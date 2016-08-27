(function(angular) {
  'use strict';
angular.module('expenseManager')
  .directive('invoices', function() {
    return {
      restrict: 'E',
      templateUrl: './client/views/components/invoices.php'
    };
  });
})(window.angular);