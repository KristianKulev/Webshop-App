webshopServices.factory('InfoFetchingObject', ['$http', 'InfoDealingObject',

    function($http, InfoDealingObject) {
        function InfoFetchingObject() {
            InfoDealingObject.call(this);

            //inherits InfoDealingObject; gets functionality to make GET requests

            if (this.constructor === InfoFetchingObject) {
                throw new Error("This class is abstract and can't be instantiated!");
            }

        }

        InfoFetchingObject.prototype = Object.create(InfoDealingObject.prototype);
        InfoFetchingObject.prototype.constructor = InfoFetchingObject;

        InfoFetchingObject.prototype.fetchInfoFromServer = function (url, urlParams) {

            var _this = this;

            return $http.get(url, urlParams)
                .then(
                function (response) {
                    _this.setInfo(response.data);
                    return response;
                },
                function (response) {
                    console.log(response);
                }
            );
        };
        return InfoFetchingObject;
    }
]);
