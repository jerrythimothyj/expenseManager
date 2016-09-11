(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('registerPanelController', function($scope) {
    	$scope.user = {
    			email : '',
    			pwd: '',
    			confPwd:''
    	}
        $scope.registerUser = (user) => {
        	
        	$scope.registrationSubmit({submissionDetails: user})
        }
        $scope.resetForm = () => {
        	$scope.user = {
    			email : '',
    			pwd: '',
    			confPwd:''
    		}
        }
        
    });
})(window.angular);