webshopControllers.controller('CarouselCtrl', ['$scope', 'Catalogue',
    function ($scope, Catalogue) {

        // manages the products, shown in the carousel

        var catalogue = new Catalogue();
        catalogue.fetchInfoFromServer('http://shop.dev.ittalents.bg/top_products').then(function() {
            $scope.products = catalogue.getInfo().slice(0,4);
            $scope.info = $scope.products[0].description.split(' ').slice(0, 6);
        });
    }
]);
