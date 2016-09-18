(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('expenseRecordsController', function($scope) {

        $scope.deleteRow = (index) => {
        	$scope.expensesRecords.splice(index, 1);
            $scope.expensesSavedRes.invalidExpenseType = [];
            $scope.expensesSavedRes.invalidComments = [];
            $scope.expensesSavedRes.invalidSpendingType = [];
            $scope.expensesSavedRes.invalidAmount = [];

            if($scope.expensesSavedRes) {
                $scope.expensesSavedRes.validAll = 1;
            }

            // if($scope.expensesSavedRes) {
            //     if($scope.expensesSavedRes.invalidExpenseType)
            //         for(let ictr=0; ictr < ($scope.expensesSavedRes.invalidExpenseType).length; ictr++) {
            //             $scope.expensesSavedRes.invalidExpenseType[ictr] = $scope.expensesSavedRes.invalidExpenseType[ictr] - 1;
            //         }

            //     if($scope.expensesSavedRes.invalidComments)
            //         for(let ictr=0; ictr < ($scope.expensesSavedRes.invalidComments).length; ictr++) {
            //             $scope.expensesSavedRes.invalidComments[ictr] = $scope.expensesSavedRes.invalidComments[ictr] - 1;
            //         }

            //     if($scope.expensesSavedRes.invalidSpendingType)
            //         for(let ictr=0; ictr < ($scope.expensesSavedRes.invalidSpendingType).length; ictr++) {
            //             $scope.expensesSavedRes.invalidSpendingType[ictr] = $scope.expensesSavedRes.invalidSpendingType[ictr] - 1;
            //         }

            //     if($scope.expensesSavedRes.invalidAmount)
            //         for(let ictr=0; ictr < ($scope.expensesSavedRes.invalidAmount).length; ictr++) {
            //             $scope.expensesSavedRes.invalidAmount[ictr] = $scope.expensesSavedRes.invalidAmount[ictr] - 1;
            //         }
            // }
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
        		$scope.expensesRecords.push($scope.emptyRecord);
        	}

        	if($scope.expensesRecords.length > 0 && !$scope.expensesRecords[index]) {
        		$scope.deleteRow(index);
        	}
        };

        $scope.saveRecords = (expensesRecords) => {
            $scope.saveExpenses({expensesRecords:expensesRecords});
        };


    });
})(window.angular);