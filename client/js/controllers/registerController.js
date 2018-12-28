export default class registerController {
  constructor(landingService) {
    this.landingService = landingService;
  }

  registrationSubmit(user) {
    this.landingService.registration(user).then(response => {
      this.returnObj = response.data;
    });
  }
}

angular
  .module("moneyManager")
  .controller("registerController", registerController);
