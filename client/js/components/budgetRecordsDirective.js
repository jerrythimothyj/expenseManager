(function(angular){
	'use strict';
	angular.module('moneyManager')
			.component('budgetRecords', {
				templateUrl: './client/views/components/budgetRecords.html',
				bindings: {
					dateChosen: '=',
					getBudgetValidation: '=',
					expenseFields: '=',
					budgetRecords: '=',
					saveBudget : '&',
					budgetSavedRes: '='
				},
				controller: 'budgetRecordsController',
				controllerAs: 'brc'
			});
})(window.angular);