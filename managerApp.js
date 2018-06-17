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
        
        }).when("/integrations/mortality-stats/proxy1", {
        templateUrl: "/mortality-manager/analytics/integrations/proxy1.html",
        controller: "proxy1Ctrl"
        
        }).when("/integrations/mortality-stats/cors", {
        templateUrl: "/mortality-manager/analytics/integrations/cors.html",
        controller: "corsCtrl"
        });
        
    console.log("App initialized and configured");

});