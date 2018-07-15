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
					setDate: '&',
					isDashboard: '@',
					noDay: '<',
					noMonth: '<'
				},
				controller: 'chosenDateController',
				controllerAs: 'cdc'
		});
})(window.angular);