(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('chosenDateController', function($scope) {
        $scope.getRecords = (expenseDate) => {
            let dateObj = expenseDate.year + '/' + expenseDate.month  + '/' + expenseDate.day;
            $scope.getExpenseRecords({expenseDate: dateObj});
        };
    });
})(window.angular);