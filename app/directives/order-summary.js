webshopDirectives.directive('orderSummary', ['Cart',
    function(Cart){
        return {
            replace: true,
            restrict: 'E',
            template: '<div id="order-summary"><span id="order-total-price">' +
            'Order total: </span><i class="product-price">{{ cart.getItemsSum(true)' +
            ' | currency:"BGN " }}</i></div>'
        };
    }
]);

