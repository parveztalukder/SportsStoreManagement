/// <reference path="../angular.js" />
angular.module("exampleApp", [])
    .controller("defaultCtrl", function ($scope) {
        $scope.displayMode = "list";
        $scope.currentProduct = null;
        $scope.listProducts = function () {
            $scope.product = [
                { objectId: 0, name: Dummy1, category: "Test", price: 1.25 },
                { objectId: 1, name: Dummy2, category: "Test", price: 2.45 },
                { objectId: 2, name: Dummy3, category: "Test", price: 4.25 }
            ]
        }
        $scope.deleteProduct = function (product) {
            $scope.products.splice($scope.products.indexOf(product), 1);
        }
        $scope.createProduct = function (product) {
            product.objectId = $scope.product.length;
            $scope.products.push(product);
            $scope.displayMode = "list";
        }
        $scope.updateProduct = function (product) {
            for (var i = 0; i < $scope.products.length; i++) {
                if ($scope.products[i].objectId == product.objectId) {
                    $scope.products[i] = product;
                    break;
                }
            }
            $scope.displayMode = "list";
        }
        $scope.editOrCreateProduct = function(pro)
    })