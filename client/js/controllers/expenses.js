(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('expensesController', ['$scope', 'expensesService', 'expenseFields', 'spendingFields', function($scope, expensesService, expenseFields, spendingFields) {
        $scope.expenseFields = _.sortBy(expenseFields.data, 'type');
        $scope.spendingFields = _.sortBy(spendingFields.data, 'type');
        $scope.saveExpenses = (expenses) => {
            expensesService.saveExpenses(expenses)
        }
    }]);
})(window.angular);