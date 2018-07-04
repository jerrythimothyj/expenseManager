(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('budgetController', function($scope, $state, expenseFields, budgetData, budgetService) {

        $scope.dateChosen = false;

        $scope.expenseFields = _.sortBy(expenseFields.data, 'type');

        let d = new Date();
        $scope.budgetDate = {
            year: d.getFullYear(),
            month: (d.getMonth() + 1),
            day: 1
        }

        $scope.budgetRecords = budgetData.data;
        $scope.emptyRecord = {
            expenseType: 0,
            comments: '',
            amount: 0
        }
        $scope.budgetRecords.push(angular.copy($scope.emptyRecord));

        $scope.budgetSavedRes = {};

        $scope.getBudgetRecords = (budgetDate) => {
            budgetService.getBudget(budgetDate).then((response) => {
                $scope.getBudgetValidation = {};

                if(response.data.validAll == 0) {
                    $scope.getBudgetValidation = response.data;
                }
                else {
                    $scope.budgetRecords = response.data;
                    $scope.budgetRecords.push(angular.copy($scope.emptyRecord));

                    $scope.dateChosen = true;
                    $scope.budgetSavedRes = {};
                }
            });
        }

        $scope.saveBudget = (budgetRecords) =>{
            let budRecords = angular.copy(budgetRecords);
            budRecords.pop();

            let budgetData = {
                date: $scope.budgetDate.year.id + '/' + $scope.budgetDate.month.id + '/' + 1,
                budget: budRecords
            };

            budgetService.saveBudget(budgetData).then((response) => {
                $scope.budgetSavedRes = response.data;

                if(response.data.saveInd == 1) {
                    $scope.dateChosen = false;
                }
            });

        }
    });
})(window.angular);