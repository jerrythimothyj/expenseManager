(function(angular){
	'use strict';
	angular.module('moneyManager')
			.directive('navbar', () => {
				return {
					restrict: 'E',
					templateUrl: './client/views/pages/navbar.php'
				}
			});


})(window.angular);