(function(angular){
	'use strict';
	angular.module('moneyManager')
			.directive('navbar', () => {
				return {
					restrict: 'E',
					templateUrl: './client/views/components/navbar.html',
					controller: 'navbarController'
				}
			});


})(window.angular);