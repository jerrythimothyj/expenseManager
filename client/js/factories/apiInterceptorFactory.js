angular
  .module("moneyManager")
  .factory("apiInterceptorFactory", function($q, $window) {
    return {
      responseError: function(response) {
        if (response.status === 403) {
          $window.location.hash = "";
        }
        return $q.reject(response);
      }
    };
  });
