export default class loginController {
  constructor($state, landingService) {
    this.$state = $state;
    this.landingService = landingService;
  }

  loginSubmit(user) {
    this.landingService.login(user).then(response => {
      this.returnObj = response.data;
      if (this.returnObj.existingUser == 1) {
        this.$state.go("dashboard");
      }
    });
  }
}

angular.module("moneyManager").controller("loginController", loginController);
