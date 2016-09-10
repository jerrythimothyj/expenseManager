(function(angular) {
	'use strict';
	angular.module('moneyManager')

			.service('landingService', function($http) {
			    this.login = (submissionDetails) => {
			        return $http({
		              method: 'POST',
		              url: 'http://jsonplaceholder.typicode.com/posts',
		              data: {
					    title: submissionDetails.name,
					    body: submissionDetails.message,
					    userId: 999
					  }
		            });
			    }
			});



})(window.angular);