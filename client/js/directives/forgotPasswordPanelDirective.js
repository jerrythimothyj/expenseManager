(function(angular){
	'use strict';
	angular.module('moneyManager')
			.directive('forgotPasswordPanel', () => {
				return {
					restrict: 'E',
					templateUrl: './client/views/components/forgotPasswordPanel.html',
					scope: {
			          returnObj : '=',
			          forgotSubmit : '&'
 					},
 					controller : 'forgotPasswordPanelController'
				}
			});


})(window.angular);