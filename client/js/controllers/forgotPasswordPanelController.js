(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('forgotPasswordPanelController', function($scope) {    	
        $scope.forgotPassword = (user) => {
        	$scope.forgotSubmit({submissionDetails: user});
            $scope.$watch('returnObj', (newValue) => {
                if(newValue && newValue.validAll == 1) {
                    $scope.user = {
                        email: ''
                    }
                }
            });
        }
        
    });
})(window.angular);