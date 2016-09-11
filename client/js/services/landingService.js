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
			    	});
			    }

				this.registration = (submissionDetails) => {

			        return $http({
		              method: 'POST',
		              url: './server/api.php?api=newUserRegistration',
		              data: {
					    
					    	user: submissionDetails
						}
		            });
			    }
			    
			    this.forgotPassword = (submissionDetails) => {

			        return $http({
		              method: 'POST',
		              url: './server/api.php?api=forgotPassword',
		              data: {
					    
					    	user: submissionDetails
					    
						}
		            });
		            
			    }
			});
})(window.angular);