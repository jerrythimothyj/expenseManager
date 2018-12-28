export default class loginPanelController {
  loginPanelUser(user) {
    this.loginSubmit({ submissionDetails: user });
  }
}

angular
  .module("moneyManager")
  .controller("loginPanelController", loginPanelController)
  .component("loginPanel", {
    templateUrl: "./client/views/components/loginPanel.html",
    bindings: {
      returnObj: "=",
      loginSubmit: "&"
    },
    controller: loginPanelController,
    controllerAs: "lpc"
  });
