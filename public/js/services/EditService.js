angular.module('EditService', [])
    .factory('Create', ['$http', function($http) {
        var Create = {};

        Create.create = function (userdata) {
            return $http.post('/api/users', userdata);
        };

        return Create;
    }])
    .factory('Receive', ['$http', function($http) {
        var Receive = {};

        Receive.receiveUserById = function (dataForReceiveing) {
            return $http.get('/api/users/id/' + dataForReceiveing.data);
        };

        Receive.receiveUserByName = function (dataForReceiveing) {
            return $http.get('/api/users/name/' + dataForReceiveing.data);
        };

        Receive.receiveUserByEmail = function (dataForReceiveing) {
            return $http.get('/api/users/email/' + dataForReceiveing.data);
        };

        Receive.receiveAll = function () {
            return $http.get('/api/users');
        };

        return Receive;
    }])
    .factory('Update', ['$http', function($http) {
        var Update = {};

        Update.receiveAll = function () {
            return $http.get('/api/users');
        };

        Update.update = function (dataForUpdating) {
            return $http.put('/api/users/' + dataForUpdating.id, dataForUpdating);
        };

        return Update;
    }])
    .factory('Delete', ['$http', function($http) {
        var Delete = {};

        Delete.delete = function (userid) {
            return $http.delete('/api/users/' + userid);
        };

        return Delete;
    }]);