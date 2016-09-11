(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('registerController', function($scope, landingService) {
        
        
        $scope.registrationSubmit = (user) => {
        	
        	landingService.registration(user)
            				.then((response) => {

									$scope.returnObj = response.data;
							         
                            	});
            				
        }
    });
})(window.angular);