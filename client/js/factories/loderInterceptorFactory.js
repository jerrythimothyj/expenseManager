(function(angular) {
  'use strict';
angular.module('moneyManager')
       .factory('loderInterceptor', function($q) {
            return {
            
               request: function(config)
                   {
                      if(config.url.indexOf('./server') != -1){
                        /*config.url= config.url+'&user=admin';
                        console.log(config.url); */
                        //Start loder
                      }
                      return config; 


                   }

               // response: function(response) { return $q.reject(response); }
            };

});


})(window.angular);