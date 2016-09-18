(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('expensesController', function($scope, $state, expenseFields, spendingFields, expensesData, expensesService) {
        $scope.expenseFields = _.sortBy(expenseFields.data, 'type');
        $scope.spendingFields = _.sortBy(spendingFields.data, 'type');

        let d = new Date();
        $scope.expenseDate = {
        	year: d.getFullYear(),
        	month: (d.getMonth() + 1),
        	day: d.getDate()
        }

        $scope.expensesRecords = expensesData.data;
        $scope.emptyRecord = {
            expenseType: 0,
            comments: '',
            spendingsType: 0,
            amount: 0
        }
        $scope.expensesRecords.push($scope.emptyRecord);

        $scope.getExpenseRecords = (expenseDate) => {
            expensesService.getExpenses(expenseDate).then((response) => {
                $scope.expensesRecords = response.data;
                $scope.expensesRecords.push($scope.emptyRecord);
            });
        }

        $scope.saveExpenses = (expensesRecords) =>{
            let expRecords = angular.copy(expensesRecords);
            expRecords.pop();

            let expenseData = {
                date: $scope.expenseDate.year + '/' + $scope.expenseDate.month + '/' + $scope.expenseDate.day,
                expenses: expRecords
            };

            expensesService.saveExpenses(expenseData).then((response) => {
                $scope.expensesSavedRes = response.data;
            });

        }
    });
})(window.angular);