(function(angular) {
  'use strict';
angular.module('moneyManager')
  .directive('invoices', function() {
    return {
      restrict: 'E',
      templateUrl: './client/views/components/invoices.php'
    };
  });
})(window.angular);