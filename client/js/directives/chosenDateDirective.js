(function(angular){
	'use strict';
	angular.module('moneyManager')
			.directive('chosenDate', () => {
				return {
					restrict: 'E',
					templateUrl: './client/views/components/chosenDate.html',
					scope: {
						expenseDate: '=',
						getExpenseValidation: '=',
						getExpenseRecords: '&'
					},
					controller: 'chosenDateController'
				}
			});


})(window.angular);