export default class navbarController {
  constructor($state, landingService) {
    this.$state = $state;
    this.landingService = landingService;
  }

  logout() {
    this.landingService.logout().then(response => {
      this.returnObj = response.data;

      if (this.returnObj.logoutInd == 1) {
        this.$state.go("login");
      }
    });
  }
}

angular
  .module("moneyManager")
  .controller("navbarController", navbarController)
  .component("navbar", {
    templateUrl: "./client/views/components/navbar.html",
    controller: navbarController,
    controllerAs: "nc"
  });
