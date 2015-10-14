webshopControllers.controller('ProductsRangeCtrl', ['$scope', 'Catalogue',
    function ($scope, Catalogue) {

        var catalogue = new Catalogue();

        catalogue.fetchInfoFromServer('http://shop.dev.ittalents.bg/products/1').then(function(){

            $scope.products = catalogue.getInfo();

        });
        $scope.selectPerPage = $scope.selectPerPage || 10;
    }
]);

