(function(angular) {
  'use strict';
angular.module('moneyManager')
    .service('expensesService', function($http) {
        this.expenseFields = () => {
            return $http({
              method: 'GET',
              url: './server/api.php?api=expenseFields'
            });
        }
        
        this.spendingFields = () => {
            return $http({
              method: 'GET',
              url: './server/api.php?api=spendingFields'
            });
        }

        this.getExpenses = (obj) => {
            return $http({
              method: 'POST',
              url: './server/api.php?api=getExpenses',
              data: {
                date: obj
              }
            });
        }

        this.saveExpenses = (obj) => {
            return $http({
              method: 'POST',
              url: './server/api.php?api=saveExpenses',
              data: obj
            });
        }
    });
})(window.angular);