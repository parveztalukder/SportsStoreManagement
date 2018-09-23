/// <reference path="../angular.min.js" />
angular.module("sportsStoreAdmin")
    .constant("authUrl", "https://parseapi.back4app.com/login")
    .constant("ordersUrl", "https://parseapi.back4app.com/classes/Orders/")
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
                },
            })
                .then(function (response) {
                    var data = response.data;
                    $scope.$broadcast("sessionToken", data.sessionToken);
                    $http.defaults.headers.common["X-Parse-Session-Token"]
                        = data.sessionToken;
                    $location.path("/main");

                }, function (response) {
                    $scope.authenticationError = response.error || response;
                });
        }
    })
    .controller("mainCtrl", function ($scope) {
        $scope.screens = ["Products", "Orders"];
        $scope.current = $scope.screens[0];

        $scope.setScreen = function (index) {
            $scope.current = $scope.screens[index];
        };

        $scope.getScreen = function () {
            return $scope.current == "Products" ?
                "/views/adminProducts.html" : "/views/adminOrders.html";
        }

    })

    .controller("ordersCtrl", function ($scope, $http, ordersUrl) {
        $http.get(ordersUrl)
            .then(function (data) {
                $scope.orders = data.data.results;
                console.log($scope.orders);
            }, function (response) {
                $scope.error = response.error || response;
            });
        $scope.selectedOrder;

        $scope.selectOrder = function (order) {
            $scope.selectedOrder = order;
        };
        $scope.calcTotal = function (order) {
            var total = 0;
            for (var i = 0; i < order.products.length; i++) {
                total += order.products[i].count * order.products[i].Price;
            }
            return total;
        }
    })
