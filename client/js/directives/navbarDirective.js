(function(angular){
	'use strict';
	angular.module('moneyManager')
			.directive('navbar', () => {
				return {
					restrict: 'E',
					templateUrl: './client/views/components/navbar.html'
				}
			});


})(window.angular);