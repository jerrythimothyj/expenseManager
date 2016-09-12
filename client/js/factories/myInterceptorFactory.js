(function(angular) {
  'use strict';
angular.module('moneyManager')
       .factory('myInterceptor', function($q) {
            return {
            
               request: function(config)
                   {
                    console.log(config); 
                    return config; 

                   }

               // response: function(response) { return $q.reject(response); }
            };

});


})(window.angular);