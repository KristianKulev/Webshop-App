
webshopServices.service('InfoSendingObject', ['$http', 'InfoDealingObject', '$httpParamSerializerJQLike',
    function($http, InfoDealingObject, $httpParamSerializerJQLike) {
        function InfoSendingObject() {

            //inherits InfoDealingObject; gets functionality to make POST requests

            InfoDealingObject.call(this);
            this.cartIdHolder = '';
        };

        InfoSendingObject.prototype = Object.create(InfoDealingObject.prototype);
        InfoSendingObject.prototype.constructor = InfoSendingObject;

        InfoSendingObject.prototype.forgetCartId = function() {

            //call this function after the user have checked out

            this.cartIdHolder = '';
        }

        InfoSendingObject.prototype.sendInfoToServer = function(product, cart) {

            var _this = this;
            var cartIdHolder = this.cartIdHolder;
            var url = cartIdHolder ? 'http://shop.dev.ittalents.bg/cart/add' + '/' + cartIdHolder : 'http://shop.dev.ittalents.bg/cart/add'
            var product = product;
            return $http({
                url: url,
                method: "POST",
                data: $httpParamSerializerJQLike({
                    'product_id' : product.id,
                    'amount': '1'
                }),
                headers: {
                    'Accept': '*!/!*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
            .then(function(response) {
                _this.cartIdHolder = response.data.data.id;

                cart.sum += product.price;
                cart.parsedItems.push({
                    amount: 1
                });
            },
            function(response) {
                console.log(response)
            });
        };
        return InfoSendingObject;
    }
]);


