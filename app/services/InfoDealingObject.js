webshopServices.factory('InfoDealingObject', [
    function() {
        function InfoDealingObject() {

            //abstract class for some basic functions common in most other classes

            if (this.constructor === InfoDealingObject) {
                throw new Error("This class is abstract and can't be instantiated!");
            }

            this.responseInfo = [];
            this.info = [];
        };

        InfoDealingObject.prototype.getInfo = function(){
            return this.info;
        }

        InfoDealingObject.prototype.setInfo = function(newInfo){
            this.info = newInfo;
        }

        InfoDealingObject.prototype.getResponse = function(){
            return this.responseInfo;
        }

        return InfoDealingObject;
    }
]);
