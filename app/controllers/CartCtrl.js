webshopControllers.controller('CartCtrl', ['$scope', 'Cart', '$state',

    function ($scope, Cart, $state) {

        // manages the products, in the cart

        var cart = $scope.$parent.cart;
        if($scope.sendingObject.cartIdHolder) {
            cart.fetchInfoFromServer('http://shop.dev.ittalents.bg/cart/get/' + $scope.sendingObject.cartIdHolder).then(function (response) {
                cart.parseItems(); // after the request has finished, parse the info
            });
        }
    }
]);

