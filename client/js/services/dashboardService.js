(function(angular) {
  'use strict';
angular.module('moneyManager')
    .service('dashboardService', function($http) {
        this.getDashboard = (obj) => {
            return $http({
              method: 'POST',
              url: './server/api.php?api=getDashboard',
              data: {
                date: obj
              }
            });
        }
    });
})(window.angular);