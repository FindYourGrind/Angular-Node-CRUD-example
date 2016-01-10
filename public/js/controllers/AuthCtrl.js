angular.module('AuthCtrl', []).controller('AuthController', ['$scope', '$location', '$window', 'UserService', 'AuthenticationService',
    function ($scope, $location, $window, UserService, AuthenticationService) {

        $scope.isAuth = AuthenticationService.isAuthenticated;
        $scope.signinMessage = '';
        $scope.registerMessage = '';

        //Admin User Controller (signIn, logOut)
        $scope.logIn = function signIn(email, password) {
            if (email != null && password != null) {
                UserService.signIn(email, password).success(function(data) {
                    AuthenticationService.isAuthenticated = true;
                    $scope.isAuth = true;
                    $scope.signinMessage = '';
                    $window.sessionStorage.token = data.token;
                    $location.path('/');
                }).error(function(err) {
                    $scope.signinMessage = err;
                });
            }
        };

        $scope.logOut = function logOut() {
            if (AuthenticationService.isAuthenticated) {
                UserService.logOut().success(function(data) {
                    AuthenticationService.isAuthenticated = false;
                    $scope.isAuth = false;
                    delete $window.sessionStorage.token;
                    $location.path('/');
                }).error(function(status, data) {
                });
            }
            else {
                $location.path("/login");
            }
        };

        $scope.register = function register(username, email, password, passwordConfirm) {
            if (password != passwordConfirm) {
                $scope.registerMessage = 'Passwords do not match';
                return
            }
            if (AuthenticationService.isAuthenticated) {
                $location.path('/');
            }
            else {
                UserService.register(username, email, password, passwordConfirm).success(function(data) {
                    $scope.registerMessage = '';
                    $location.path('/login');
                }).error(function(err) {
                    $scope.registerMessage = err;
                });
            }
        }
    }
]);
