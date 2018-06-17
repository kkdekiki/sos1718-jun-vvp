/*global angular*/

angular.module("managerApp", ["ngRoute"]).config(function($routeProvider) {

    $routeProvider
        .when("/", {
        templateUrl: "/home.html"
        
        }).when("/mortality",{
        templateUrl : "/mortality-manager/front-end/mortalityList.html",
        controller : "mortalityListCntrl"
        
        }).when("/mortality/edit/:country",{
        templateUrl : "/mortality-manager/front-end/mortalityEdit.html",
        controller : "mortalityEditCtrl"
        
        }).when("/analytics/mortality-stats/view1", {
        templateUrl: "/mortality-manager/analytics/mortalityStatsView1.html",
        controller: "mortalityStatsView1"
        });
        
    console.log("App initialized and configured");

});