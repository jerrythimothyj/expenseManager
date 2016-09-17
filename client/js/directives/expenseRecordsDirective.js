(function(angular){
	'use strict';
	angular.module('moneyManager')
			.directive('expenseRecords', () => {
				return {
					restrict: 'E',
					templateUrl: './client/views/components/expenseRecords.html',
					scope: {
						expenseFields: '=',
						spendingFields: '=',
						expensesRecords: '=',
						saveExpenses : '&'
					},
					controller: 'expenseRecordsController'
				}
			});
})(window.angular);