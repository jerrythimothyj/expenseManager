(function(angular) {
  "use strict";
  angular.module("moneyManager").component("navbar", {
    templateUrl: "./client/views/components/navbar.html",
    controller: "navbarController",
    controllerAs: "nc"
  });
})(window.angular);
