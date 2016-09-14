(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('expensesController', function($scope, expenseFields, spendingFields, expensesData, expensesService) {
        $scope.expenseFields = _.sortBy(expenseFields.data, 'type');
        $scope.spendingFields = _.sortBy(spendingFields.data, 'type');

        let d = new Date();
        $scope.expenseDate = {
        	year: d.getFullYear(),
        	month: (d.getMonth() + 1),
        	day: d.getDate()
        }

  //       $scope.expensesRecords = [
		//   {
		//     "expenseType": "2",
		//     "spendingsType": "1",
		//     "amount": 98
		//   },
		//   {
		//     "expenseType": "3",
		//     "spendingsType": "2",
		//     "amount": 10
		//   },
		//   {
		//     "expenseType": "3",
		//     "spendingsType": "2",
		//     "amount": 10
		//   }
		// ];

        $scope.expensesRecords = expensesData.data;
        $scope.expensesRecords.push(null);

        $scope.getExpenseRecords = (expenseDate) => {
            expensesService.getExpenses(expenseDate).then((response) => {
                $scope.expensesRecords = response.data;
                $scope.expensesRecords.push(null);
            });
        }
    });
})(window.angular);