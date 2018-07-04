(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('expenseRecordsController', function($rootScope, $scope) {

        let calculateTodays = () => {
            $scope.todays = {};
            $scope.todays.earnings = 0;
            $scope.todays.spendings = 0;
            _.map($scope.expensesRecords, (num) => {
                if(num.expenseType) {
                    let amt = isNaN(parseFloat(num.amount))? 0 : parseFloat(num.amount);
                    amt = Math.round(amt*100)/100;
                    console.log(amt);
                    if(num.spendingsType == 1)
                        $scope.todays.earnings += amt;
                    else if(num.spendingsType == 2)
                        $scope.todays.spendings += amt;
                }
            });
        }

        calculateTodays();

        $scope.deleteRow = (index) => {
        	$scope.expensesRecords.splice(index, 1);
            $scope.expensesSavedRes.invalidExpenseType = [];
            $scope.expensesSavedRes.invalidComments = [];
            $scope.expensesSavedRes.invalidSpendingType = [];
            $scope.expensesSavedRes.invalidAmount = [];

            if($scope.expensesSavedRes) {
                $scope.expensesSavedRes.validAll = 1;
            }

            calculateTodays();
        };

        $scope.addNewRow = (index) => {
            if($scope.expensesSavedRes) {
                $scope.expensesSavedRes.saveInd = 0;
            }
        	if($scope.expensesRecords[$scope.expensesRecords.length - 1].expenseType != 0 || 
                $scope.expensesRecords[$scope.expensesRecords.length - 1].comments != '' || 
                $scope.expensesRecords[$scope.expensesRecords.length - 1].spendingsType != 0 || 
                $scope.expensesRecords[$scope.expensesRecords.length - 1].amount != 0) {
                $scope.emptyRecord = {
                    expenseType: 0,
                    comments: '',
                    spendingsType: 0,
                    amount: 0
                }
        		$scope.expensesRecords.push(angular.copy($scope.emptyRecord));
        	}

        	if($scope.expensesRecords.length > 0 && !$scope.expensesRecords[index]) {
        		$scope.deleteRow(index);
        	}

            calculateTodays();
        };

        $scope.saveRecords = (expensesRecords) => {
            $scope.saveExpenses({expensesRecords:expensesRecords});
        };

        $scope.$watch('getExpenseValidation', (newValue) => {
            if(newValue && newValue.validAll !== 0)
                $scope.dateChosen = true;
        });

        $scope.$watch('getExpenseValidation', (newValue) => {
            if(newValue && newValue.validAll !== 0)
                $scope.dateChosen = true;
        });

        $scope.$watch('expensesRecords', (newValue) => {
            calculateTodays();
        });
    });
})(window.angular);