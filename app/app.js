'use strict';

var webshopApp = angular.module('webshopApp', [
    'ngRoute',
    'ui.router',
    'ncy-angular-breadcrumb',
    'webshopControllers',
    'webshopServices',
    'webshopFilters',
    'webshopDirectives',
    'angularUtils.directives.dirPagination'
]);


webshopApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {

    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('main',{
            url : '/home',
            abstract: true,
            template: '<div><div ui-view></div></div>',
            controller: 'MainCtrl'

        })
        .state('main.home', {
            url: '/top-products',
            templateUrl: 'views/home-page.html',
            controller: 'CarouselCtrl',
            ncyBreadcrumb: {
                label: 'Home'
            },
            params: {
                productId: null
            }
        })
        .state('main.products', {
            url: '/products',
            templateUrl: 'views/products-range.html',
            controller: 'ProductsRangeCtrl',
            ncyBreadcrumb: {
                label: 'Products',
                parent: 'main.home'
            }
        })
        .state('main.productId', {
            url: '/products/',
            templateUrl: 'views/product-big.html',
            controller: 'ProductDetailCtrl',
            ncyBreadcrumb: {
                label: '{{ product.title }}',
                parent: 'main.products'
            },
            params: {
                productId: null
            }
        })
        .state('main.outOfStock', {
            url: '/out-of-stock',
            templateUrl: 'views/out-of-stock.html',
            controller: 'OutOfStockCtrl',
            ncyBreadcrumb: {
                label: 'Out Of Stock',
                parent: 'main.products'
            }
        })
        .state('main.cart', {
            abstract: true,
            url: '/cart',
            template: '<div><div ui-view></div></div>',
            controller: 'CartCtrl'
        })
        .state('main.cart.content', {
            url: '/content',
            templateUrl: 'views/cart.html',
            ncyBreadcrumb: {
                label: 'Cart',
                parent: 'main.home'
            }
        })
        .state('main.cart.checkout', {
            url: '/checkout',
            templateUrl: 'views/checkout.html',
            ncyBreadcrumb: {
                label: 'Checkout'
            }
        });
}]);

webshopApp.run(['$rootScope', '$location', '$anchorScroll', '$routeParams', '$timeout', '$state',
    function($rootScope, $location, $anchorScroll, $routeParams, $timeout, $state) {

    //when the route is changed scroll to the proper element)

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

        if(fromState.name == 'main.cart.checkout' && toState.name == 'main.cart.content'){

            //if you have just checkout, you can't go to previous state of the cart

            $state.go('main.home');
        };

        $rootScope.scrollTo = function(element) {

            $('body').animate({
                scrollTop: $(element ? element : '.anchor').offset().top
            }, 300);
        };

        $timeout(function() {
            $rootScope.scrollTo();
        }, 0);
    });
}]);
