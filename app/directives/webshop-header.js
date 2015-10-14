webshopDirectives.directive('webshopHeader', [
    function(){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/header.html'
        };
    }
]);
