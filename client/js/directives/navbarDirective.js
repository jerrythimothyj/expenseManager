(function(angular){
	'use strict';
	angular.module('moneyManager')
			.directive('navbar', () => {
				return {
					restrict: 'E',
					templateUrl: './client/views/components/navbar.php'
				}
			});


})(window.angular);