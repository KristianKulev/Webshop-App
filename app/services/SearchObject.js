webshopServices.factory('SearchObject', [function() {

    function SearchObject(queryInput){
        this.queryInput = queryInput;
        this.query = {
            value: ''
        };
    }

    SearchObject.prototype.clearSearch = function(){
        this.query.value = '';
    }

    SearchObject.prototype.doSearch = function(){
        this.query = this.queryInput;
    }

    SearchObject.prototype.getQuery = function(){
        return this.query.value;
    }

    return SearchObject;
}]);

