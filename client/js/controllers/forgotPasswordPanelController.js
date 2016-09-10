(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('forgotPasswordPanelController', function($scope) {
    	$scope.forgotClicked = 0;
    	$scope.retry = () =>{

    		$scope.forgotClicked = 0;
    	}
        $scope.forgotPassword = (user) => {
        	$scope.forgotClicked = 1;
        	$scope.forgotSubmit({submissionDetails: user})
        }
    });
})(window.angular);