webshopControllers.controller('ProductDetailCtrl', ['$scope', 'Product', '$stateParams',

    function($scope, Product, $stateParams) {

        var productId = $stateParams.productId;

        var product = new Product(productId);

        product.fetchInfoFromServer('http://shop.dev.ittalents.bg/products/1').then(function(response){

            /*
                because the server API doesn't provide request for a single product, based on the id

                I make request for all products of the type, and set $scope.product to

                match a product, based on $stateParams.productId - variable set for the state in .config() of uiRouter

                Because the current state no longer keeps na variable, if tries to access a product directly and not coming

                from a previous state, $stateParams.productId will be undefined, and an error will occur.

            */

            product.parseResponse(response.data[productId - 1]);
            $scope.product = product;

        });

    }
]);

