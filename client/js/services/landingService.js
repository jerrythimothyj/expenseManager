(function(angular) {
	'use strict';
	angular.module('moneyManager')
    
    .service('landingService', function($http) {
				this.registration = (submissionDetails) => {
			        //console.log(submissionDetails);


			        return $http({
		              method: 'POST',
		              url: './server/api.php?api=newUserRegistration',
		              data: {
					    
					    	user: submissionDetails
					    
					  }
		            });
		            
			    }
			    
			    this.forgotPassword = (submissionDetails) => {
			        //console.log(submissionDetails);


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