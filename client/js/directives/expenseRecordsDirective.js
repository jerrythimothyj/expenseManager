(function(angular){
	'use strict';
	angular.module('moneyManager')
			.directive('expenseRecords', () => {
				return {
					restrict: 'E',
					templateUrl: './client/views/components/expenseRecords.html' //,
					//controller: 'navbarController'
				}
			});


})(window.angular);