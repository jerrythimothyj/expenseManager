export default class forgotPasswordController {
  constructor(landingService) {
    this.landingService = landingService;
  }

  forgotSubmit(user) {
    this.landingService.forgotPassword(user).then(response => {
      this.returnObj = response.data;
    });
  }
}

angular
  .module("moneyManager")
  .controller("forgotPasswordController", forgotPasswordController);
