webshopControllers.controller('MainCtrl', ['$scope', '$location', '$stateParams', 'SearchObject', 'InfoSendingObject', 'Cart',
    function($scope, $location, $stateParams, SearchObject, InfoSendingObject, Cart){

        $scope.queryInput = {};
        $scope.searchObject = new SearchObject($scope.queryInput);

        $scope.sendingObject = new InfoSendingObject();

        $scope.cart = new Cart($scope.sendingObject);

        $scope.getParsedUrl = function(title){

            //get a string from the product name, to be used in the url

            return title.split(/ |[^\x00-\x7F]/).join('-');
        }

    }
]);

