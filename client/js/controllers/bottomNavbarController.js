(function(angular) {
  'use strict';
angular.module('moneyManager')

    .controller('bottomNavbarController', function(facebookService) {

        var vm = this;
        facebookService.getRecentPosts().then((response) => {
        	vm.recentPost = response.data.data[0].message;
        });

    });
})(window.angular);