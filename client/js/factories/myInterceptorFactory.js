(function(angular) {
	"use strict";

	angular.module('moneyManager')
	.factory ('myInterceptor', function($q) {
		
		return {
	        request: function(config){

	        	if (config.url.indexOf('./server') != -1) {
	        		config.url=config.url+"&user=adin";
	        		console.log(config.url);
	        	}
	        	return config;
	        },
	        // response: function(response) { return $q.reject(response); }
	    };
	})
})(window.angular);