webshopServices.factory('Catalogue', ['InfoFetchingObject',
    function(InfoFetchingObject) {

        //inherits InfoFetchingObject

        function Catalogue(){
            InfoFetchingObject.call(this);
        }

        Catalogue.prototype = Object.create(InfoFetchingObject.prototype);
        Catalogue.prototype.constructor = Catalogue;

        Catalogue.prototype.read = function(){
            console.log(this.getInfo());
        }
        return Catalogue;

    }
]);