(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('registerPanelController', function($scope) {
    	

        $scope.registerUser = (user) => {
        	
        	$scope.registrationSubmit({submissionDetails: user})
        }
    });
})(window.angular);