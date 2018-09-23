/// <reference path="../angular.min.js" />

angular.module("SportsStore")

    .constant("dataUrl", "https://parseapi.back4app.com/classes/Products/")
    .constant("orderUrl", "https://parseapi.back4app.com/classes/Orders/")
    .run(function ($http) {
        $http.defaults.headers.common["X-Parse-Application-Id"]
            = "kOgIu24MYIFTLI6m1JEMpwxiQd1tne6szV5KDFVi";
        $http.defaults.headers.common["X-Parse-REST-API-Key"]
            = "pklhzxsKe0GlYKmqnqJ5cr1WdLfY3CoBOZM7TIeh";
    })
   
    .controller("sportsStoreCtrl", function ($scope, $http,$location, dataUrl,orderUrl,cart) {
        $scope.data = {};
        $http.get(dataUrl)
            .then(function (data) {
                $scope.data.products = data;
            }, function (response) {
                $scope.data.error = response.error || response;
            })
        $scope.sendOrder = function (shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order)
                
                .then(function (data) {
                    $scope.data.OrderId = data;
                    cart.getProducts().length = 0;
                })
                .catch(function (error) {
                    $scope.data.orderError = error;
                })
                .finally(function () {
                    $location.path("/complete");
                })
        }
    });