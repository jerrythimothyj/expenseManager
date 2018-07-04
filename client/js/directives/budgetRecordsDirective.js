(function(angular){
	'use strict';
	angular.module('moneyManager')
			.directive('budgetRecords', () => {
				return {
					restrict: 'E',
					templateUrl: './client/views/components/budgetRecords.html',
					scope: {
						dateChosen: '=',
						getBudgetValidation: '=',
						expenseFields: '=',
						budgetRecords: '=',
						saveBudget : '&',
						budgetSavedRes: '='
					},
					controller: 'budgetRecordsController'
				}
			});
})(window.angular);