(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('expensesController', ['$scope', 'expensesService', 'expenseFields', 'spendingFields', function($scope, expensesService, expenseFields, spendingFields) {
        $scope.expenseFields = _.sortBy(expenseFields.data, 'type');
        $scope.spendingFields = _.sortBy(spendingFields.data, 'type');

        let d = new Date();
        $scope.expenses = {
        	year: d.getFullYear(),
        	month: d.getMonth(),
        	day: d.getDate()
        }

        $scope.expenseRecords = [
		  {
		    "expenseType": "2",
		    "spendingsType": "1",
		    "amount": 98
		  },
		  {
		    "expenseType": "3",
		    "spendingsType": "2",
		    "amount": 10
		  },
		  {
		    "expenseType": "3",
		    "spendingsType": "2",
		    "amount": 10
		  }
		];

        $scope.expenseRecords.push(null);

        $scope.deleteRow = (index) => {
        	$scope.expenseRecords.splice(index, 1);
        };

        $scope.addNewRow = (index) => {
        	if($scope.expenseRecords[$scope.expenseRecords.length - 1] != null) {
        		$scope.expenseRecords.push(null);
        	}

        	if($scope.expenseRecords.length > 0 && !$scope.expenseRecords[index]) {
        		$scope.deleteRow(index);
        	}
        }


        $scope.saveExpenses = (expenses) => {
            expensesService.saveExpenses(expenses)
        }
    }]);
})(window.angular);