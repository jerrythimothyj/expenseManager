(function(angular){
	'use strict';
	angular.module('moneyManager')
			.component('chosenDate', {
				templateUrl: './client/views/components/chosenDate.html',
				bindings: {
					dateChosen: '=',
					expenseDate: '=',
					getExpenseValidation: '=',
					getExpenseRecords: '&',
					isDashboard: '@',
					noDay: '@'
				},
				controller: 'chosenDateController',
				controllerAs: 'cdc'
		});
})(window.angular);