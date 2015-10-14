webshopServices.factory('Product', ['InfoFetchingObject',
    function(InfoFetchingObject){
        //inherits InfoFetchingObject

        function Product(id){
            InfoFetchingObject.call(this);
            this.mainImgUrl = '';
            this.infoList = '';
            this.product = '';
            this.id = id;
            this.description = '';
            this.images = '';
            this.title = '';
        }

        Product.prototype = Object.create(InfoFetchingObject.prototype);
        Product.prototype.constructor = Product;

        Product.prototype.parseResponse = function(data){

            // call this parsing function, after Ajax have resulted

            this.mainImgUrl = data.images[0];
            this.infoList = data.description.split(' ').slice(0, 10);
            this.description = data.description;
            this.images = data.images
            this.price = data.price;
            this.title = data.title;
        }

        Product.prototype.setImage = function(imageUrl) {
            this.mainImgUrl = imageUrl;
        };

        return Product;
    }
]);
