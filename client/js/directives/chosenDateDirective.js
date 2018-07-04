(function(angular){
	'use strict';
	angular.module('moneyManager')
			.directive('chosenDate', () => {
				return {
					restrict: 'E',
					templateUrl: './client/views/components/chosenDate.html',
					scope: {
						dateChosen: '=',
						expenseDate: '=',
						getExpenseValidation: '=',
						getExpenseRecords: '&',
						isDashboard: '@',
						noDay: '@'
					},
					controller: 'chosenDateController'
				}
			});


})(window.angular);