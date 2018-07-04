(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('expensesController', function($scope, $state, expenseFields, spendingFields, expensesData, expensesService) {
        
        $scope.dateChosen = false;

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
        $scope.expensesRecords.push(angular.copy($scope.emptyRecord));

        $scope.getExpenseRecords = (expenseDate) => {
            expensesService.getExpenses(expenseDate).then((response) => {
                $scope.getExpenseValidation = {};

                if(response.data.validAll == 0) {
                    $scope.getExpenseValidation = response.data;
                }
                else {
                    $scope.expensesRecords = response.data;
                    $scope.expensesRecords.push(angular.copy($scope.emptyRecord));

                    $scope.dateChosen = true;
                    $scope.expensesSavedRes = {};
                }
            });
        }

        $scope.saveExpenses = (expensesRecords) =>{
            let expRecords = angular.copy(expensesRecords);
            expRecords.pop();

            let expenseData = {
                date: $scope.expenseDate.year.id + '/' + $scope.expenseDate.month.id + '/' + $scope.expenseDate.day.id,
                expenses: expRecords
            };

            expensesService.saveExpenses(expenseData).then((response) => {
                $scope.expensesSavedRes = response.data;

                if(response.data.saveInd == 1) {
                    $scope.dateChosen = false;
                }
            });

        }
    });
})(window.angular);