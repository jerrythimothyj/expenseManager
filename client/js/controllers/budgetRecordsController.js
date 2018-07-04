(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('budgetRecordsController', function($scope) {

        let calculateTodays = () => {
            $scope.todays = {};
            $scope.todays.total = 0;
            _.map($scope.budgetRecords, (num) => {
                if(num.expenseType) {
                    $scope.todays.total += isNaN(parseFloat(num.amount))? 0 : parseFloat(num.amount);
                }
            });
        }

        calculateTodays();

        $scope.deleteRow = (index) => {
        	$scope.budgetRecords.splice(index, 1);
            $scope.budgetSavedRes.invalidExpenseType = [];
            $scope.budgetSavedRes.invalidComments = [];
            $scope.budgetSavedRes.invalidAmount = [];

            if($scope.budgetSavedRes) {
                $scope.budgetSavedRes.validAll = 1;
            }

            calculateTodays();
        };

        $scope.addNewRow = (index) => {
            if($scope.budgetSavedRes) {
                $scope.budgetSavedRes.saveInd = 0;
            }
        	if($scope.budgetRecords[$scope.budgetRecords.length - 1].expenseType != 0 || 
                $scope.budgetRecords[$scope.budgetRecords.length - 1].comments != '' || 
                $scope.budgetRecords[$scope.budgetRecords.length - 1].amount != 0) {
                $scope.emptyRecord = {
                    expenseType: 0,
                    comments: '',
                    amount: 0
                }
        		$scope.budgetRecords.push(angular.copy($scope.emptyRecord));
        	}

        	if($scope.budgetRecords.length > 0 && !$scope.budgetRecords[index]) {
        		$scope.deleteRow(index);
        	}

            calculateTodays();
        };

        $scope.saveRecords = (budgetRecords) => {
            $scope.saveBudget({budgetRecords:budgetRecords});
        };

        $scope.$watch('getBudgetValidation', (newValue) => {
            if(newValue && newValue.validAll !== 0)
                $scope.dateChosen = true;
        });

        $scope.$watch('budgetRecords', (newValue) => {
            calculateTodays();
        });
    });
})(window.angular);