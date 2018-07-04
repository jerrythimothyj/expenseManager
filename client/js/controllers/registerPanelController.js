(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('registerPanelController', function($scope) {

        $scope.registerUser = (user) => {
        	$scope.registrationSubmit({submissionDetails: user})
        }

        $scope.$watch('returnObj', (newValue) => {
            if(newValue && newValue.validAll == 1) {
                $scope.user = {
                    email : '',
                    pwd: '',
                    confPwd:''
                }
            }
        });
        
    });
})(window.angular);