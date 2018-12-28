export default class bottomNavbarController {
  constructor(facebookService) {
    facebookService.getRecentPosts().then(response => {
      this.recentPost = response.data.data[0].message;
    });
  }
}

angular
  .module("moneyManager")
  .controller("bottomNavbarController", bottomNavbarController)
  .component("bottomNavbar", {
    templateUrl: "./client/views/components/bottomNavbar.html",
    controller: bottomNavbarController,
    controllerAs: "bnc"
  });
