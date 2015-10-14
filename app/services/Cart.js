webshopServices.factory('Cart', ['InfoFetchingObject',
    function(InfoFetchingObject){

        //inherits InfoFetchingObject

        function Cart(sendingObject){
            InfoFetchingObject.call(this, sendingObject);
            this.infoSendingObject = sendingObject;
            this.id = '';
            this.sum = 0;
            this.countPerProductLimit = {  //if the server wants to limit the user it should be addressed here
                min: 1,
                max: ''
            }
            this.parsedItems = [];
            this.cachedItems = {
                items: []
                , sum: 0
            };

            this.isCheckedOut = false;
        }

        Cart.prototype = Object.create(InfoFetchingObject.prototype);
        Cart.prototype.constructor = Cart;

        Cart.prototype.buyCountPerProductLimit = function(){
            return this.countPerProductLimit;
        }

        Cart.prototype.getCurrentItemSum = function(item){
            return Math.round(item.amount || 1) * item.price;
        }

        Cart.prototype.getAbsoluteItemsCount = function(){

            var parsedItems = this.getParsedItems();
            var productCount = 0;
            for(var i = 0; i < parsedItems.length; i++) {
                productCount += parsedItems[i].amount;
            }
            return productCount;
        }

        Cart.prototype.parseItems = function(){
            this.isCheckedOut = false;
            this.cachedItems = {
                items: []
                , sum: 0
            };;
            this.parsedItems = [];
            var responseItems = this.getInfo()[0];
            for(var i = 0; i < responseItems.items.length; i++) {
                this.parsedItems.push({
                    info: responseItems.products[i],
                    amount: responseItems.items[i].amount
                });
            }
            return this.calculateItemsSum();
        }

        Cart.prototype.getParsedItems = function(){
            return this.parsedItems;
        }

        Cart.prototype.getCachedItems = function(){
            return this.cachedItems.items;
        }

        Cart.prototype.getItemsSum = function(inCartContext){
            var usedInCartContext = inCartContext;
            if(this.isCheckedOut && usedInCartContext) return this.cachedItems.sum;
            return this.sum;
        }

        Cart.prototype.parseCurrentItems = function(item) {
            this.sum += item.price;
            this.parsedItems.push(1);
        }

        Cart.prototype.calculateItemsSum = function(){
            var sum = 0;
            var items = this.getParsedItems();
            if(!items) return sum;

            for(var i = 0; i < items.length; i++){
                sum += items[i].info.price * items[i].amount;
            }
            this.sum = sum;
        }

        Cart.prototype.addProduct = function(newProduct){
            this.info.push(newProduct);
        }

        Cart.prototype.removeProduct = function(productId){

            for(var i = 0; i < this.parsedItems.length; i++){
                if(this.parsedItems[i].info.id === productId){
                    this.sum -= this.parsedItems[i].info.price * this.parsedItems[i].amount;
                    this.parsedItems.splice(i, 1);
                    return;
                }
            }
        }

        Cart.prototype.updateSum = function(newProductDetails, oldProductCount){

            var newProductCount = Math.round(newProductDetails.value) || 1;
            var oldProductCount = Math.round(oldProductCount) || 1;
            var productsDifference = Math.abs(newProductCount - oldProductCount);

            newProductCount > oldProductCount ?
                this.sum += productsDifference * newProductDetails.price : this.sum -= productsDifference * newProductDetails.price;
        }

        Cart.prototype.cacheItems = function(){
            for(var i = 0; i < this.parsedItems.length; i++){
                this.cachedItems.items[i] = this.parsedItems[i];
            };
            this.cachedItems.sum = this.sum;
        }

        Cart.prototype.checkout = function(){
            this.isCheckedOut = true;
            this.cacheItems();
            this.infoSendingObject.forgetCartId();
            this.parsedItems = [];
            this.info = [];
            return this.calculateItemsSum();
        }

        return Cart;
    }
])