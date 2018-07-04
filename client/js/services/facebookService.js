(function(angular) {
	'use strict';
	angular.module('moneyManager')

			.service('facebookService', function($http) {
				
				this.pageID = "868991496571130";
				this.appKey = "1109545585782187";
				this.appSecretKey = "515ed5ec4d3639b4aa610380b546a513";

			    this.getRecentPosts = () => {
			        return $http({
		              method: 'GET',
		              url: 'https://graph.facebook.com/'+this.pageID+'/posts?limit=1&access_token='+this.appKey+'|'+this.appSecretKey
		            });
			    }
			});
})(window.angular);