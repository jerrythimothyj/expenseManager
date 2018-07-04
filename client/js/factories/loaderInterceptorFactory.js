(function(angular) {
	"use strict";

	angular.module('moneyManager')
		.factory ('loaderInterceptorFactory', function ($q, $rootScope, $log) {
			
			let numLoadings = 0;

			return {
		        request: function (config) {

		            numLoadings++;

		            // Show loader
		            $rootScope.$broadcast("loader_show");
		            return config || $q.when(config)

		        },
		        response: function (response) {

		            if ((--numLoadings) === 0) {
		                // Hide loader
		                $rootScope.$broadcast("loader_hide");
		            }

		            return response || $q.when(response);

		        },
		        responseError: function (response) {

		            if (!(--numLoadings)) {
		                // Hide loader
		                $rootScope.$broadcast("loader_hide");
		            }

		            return $q.reject(response);
		        }
		    };
		})
})(window.angular);