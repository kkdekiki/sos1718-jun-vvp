/*global angular*/

angular.module("managerApp", ["ngRoute"]).config(function($routeProvider) {

    $routeProvider
        .when("/", {
        templateUrl: "/home.html"
        
        }).when("/analytics", {
        templateUrl: "/grupal.html",
        controller: "grupalCtrl"
        
        }).when("/mortality",{
        templateUrl : "/mortality-manager/front-end/mortalityList.html",
        controller : "mortalityListCntrl"
        
        }).when("/mortality/edit/:country",{
        templateUrl : "/mortality-manager/front-end/mortalityEdit.html",
        controller : "mortalityEditCtrl"
        
        }).when("/analytics/mortality-stats/view1", {
        templateUrl: "/mortality-manager/analytics/mortalityStatsView1.html",
        controller: "mortalityStatsView1"
        
        }).when("/analytics/mortality-stats/proxy1", {
        templateUrl: "/mortality-manager/analytics/integrations/proxy1.html",
        controller: "proxy1Ctrl"
        
        }).when("/analytics/mortality-stats/cors", {
        templateUrl: "/mortality-manager/analytics/integrations/cors.html",
        controller: "corsCtrl"
        
        }).when("/analytics/mortality-stats/integration3", {
        templateUrl: "/mortality-manager/analytics/integrations/integration3.html",
        controller: "integration3Ctrl"
        
        }).when("/analytics/mortality-stats/integration4", {
        templateUrl: "/mortality-manager/analytics/integrations/integration4.html",
        controller: "integration4Ctrl"
        
        }).when("/analytics/mortality-stats/integration5", {
        templateUrl: "/mortality-manager/analytics/integrations/integration5.html",
        controller: "integration5Ctrl"
        
        }).when("/analytics/mortality-stats/integration6", {
        templateUrl: "/mortality-manager/analytics/integrations/integration6.html",
        controller: "integration6Ctrl"
        
        }).when("/analytics/mortality-stats/integration7", {
        templateUrl: "/mortality-manager/analytics/integrations/integration7.html",
        controller: "integration7Ctrl"
        
        
        }).when("/analytics/mortality-stats/normal1", {
        templateUrl: "/mortality-manager/analytics/integrations/normal1.html",
        controller: "normal1Ctrl"
        
        }).when("/analytics/mortality-stats/normal2", {
        templateUrl: "/mortality-manager/analytics/integrations/normal3.html",
        controller: "normal3Ctrl"
        
        }).when("/integrations", {
        templateUrl: "/integrations.html"
        
        }).when("/about", {
        templateUrl: "/about.html"
        
        });
        
    console.log("App initialized and configured");

});