(function(angular){
	'use strict';
	angular.module('moneyManager')
			.directive('chosenData', () => {
				return {
					restrict: 'E',
					templateUrl: './client/views/components/chosenData.html' //,
					//controller: 'navbarController'
				}
			});


})(window.angular);