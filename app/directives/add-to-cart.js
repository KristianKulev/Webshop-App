webshopDirectives.directive('addToCart', [
    function(){
        return {
            replace: true,
            restrict: 'E',
            template: '<div class="product-preferences">' +
                '<a href="" class="add-to-cart" ng-click="sendingObject.sendInfoToServer(product, cart)">' +
                '<i class="fa fa-cart-plus"><i> Buy</i></i></a><a href="" disabled class="btn add-to-favourites">' +
                '<i class="fa fa-heart"><i> Fav\'s</i></i></a></div>'
        };
    }
]);

