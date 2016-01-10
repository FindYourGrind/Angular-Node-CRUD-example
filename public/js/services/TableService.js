angular.module('TableService', []).factory('Table', ['$http', function($http) {
    var Table = {};

    Table.get = function () {
        return $http.get('/api/users');
    };

    return Table;
}]);