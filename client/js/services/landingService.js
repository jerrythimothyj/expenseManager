(function(angular) {
	'use strict';
	angular.module('moneyManager')

			.service('landingService', function($http) {




































































				
			    this.login = (submissionDetails) => {
			    	
			        return $http({
		              method: 'POST',
		              url: './server/api.php?api=login',
		              data:{
		              	user: submissionDetails
		              } 
		            });
			    }

			    this.logout = () => {

			    	return $http({
			    		method: 'POST',
			    		url: './server/api.php?api=logout',
			    		data: {}
			    	})
			    }
			});



})(window.angular);