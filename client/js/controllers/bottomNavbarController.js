(function(angular) {
  'use strict';
angular.module('moneyManager')

    .controller('bottomNavbarController', function($scope, facebookService) {

        facebookService.getRecentPosts().then((response) => {
        	$scope.recentPost = response.data.data[0].message;
        });

    });
})(window.angular);