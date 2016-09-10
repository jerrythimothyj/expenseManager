(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('loginPanelController', function($scope) {
        $scope.loginPanelUser = (user) => {

        	console.log(user);
            // loginPanelService.loginPanelNewUser(user)
        }
    });
})(window.angular);