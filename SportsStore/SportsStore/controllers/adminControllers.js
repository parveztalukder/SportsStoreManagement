/// <reference path="../angular.min.js" />
angular.module("sportsStoreAdmin")
    .constant("authUrl", "https://parseapi.back4app.com/login")
    .run(function ($http) {
        $http.defaults.headers.common["X-Parse-Application-Id"]
            = "kOgIu24MYIFTLI6m1JEMpwxiQd1tne6szV5KDFVi";
        $http.defaults.headers.common["X-Parse-REST-API-Key"]
            = "pklhzxsKe0GlYKmqnqJ5cr1WdLfY3CoBOZM7TIeh";
    })
    .controller("authCtrl", function ($scope, $http, $location, authUrl) {
        $scope.authenticate = function (user, pass) {
            $http.get(authUrl, {
                params: {
                    username: user,
                    password: pass
                }
            }).then(function (data) {
                $scope.$broadcast("sessionToken", data.sessionToken);
                $http.defaults.headers.common["X-Parse-Session-Token"]
                    = data.seesionToken;
                $location.path("/main");
            })
                .catch(function (response) {
                    $scope.authenticationError = response.error || response;
                });
        }
    })
    .controller("mainCtrl", function ($scope) {
        $scope.screens = ["Products", "Order"];
        $scope.current = $scope.screens[0];

        $scope.setScreen = function (index) {
            $scope.current = $scope.screens["index"];

        };
        $scope.getScreen = function () {
            return $scope.current == "Products"
                ? "/views/adminProducts.html" : "/views/adminOrders.html";
        };
    });