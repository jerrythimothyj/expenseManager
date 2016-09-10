(function(angular){
	'use strict';
	angular.module('moneyManager')
			.directive('bottomNavbar', () => {
				return {
					restrict: 'E',
					templateUrl: './client/views/components/bottomNavbar.html'
				}
			});


})(window.angular);