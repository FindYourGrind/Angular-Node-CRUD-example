angular.module('appRoutes', [])
	.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {

			$routeProvider

				// home page
				.when('/', {
					templateUrl: 'views/home.html',
					controller: 'MainController',
					access: { requiredAuthentication: false }
				})

				.when('/login', {
					controller: 'AuthController',
					templateUrl: 'views/login.html',
					access: { requiredAuthentication: false }
				})

				.when('/register', {
					controller: 'AuthController',
					templateUrl: 'views/register.html',
					access: { requiredAuthentication: false }
				})

				.when('/logout', {
					controller: 'AuthController',
					templateUrl: 'views/register.html',
					access: { requiredAuthentication: false }
				})

				.when('/table', {
					templateUrl: 'views/table.html',
					controller: 'TableController',
					access: {
						requiredAuthentication: true,
						redirectTo: '/login'
					}
				})

				.when('/edit', {
					templateUrl: 'views/edit.html',
					controller: 'EditController',
					access: {
						requiredAuthentication: true,
						redirectTo: '/login'
					}
				})

				.otherwise({
					redirectTo: '/'
				});


			$locationProvider.html5Mode(true);
		}
	])
	.config(
		function ($httpProvider) {
			$httpProvider.interceptors.push('TokenInterceptor');
		}
	)
	.run(
		function($rootScope, $location, $window, AuthenticationService) {
		$rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
			//redirect only if both isAuthenticated is false and no token is set
			if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication
				&& !AuthenticationService.isAuthenticated && !$window.sessionStorage.token) {
				$location.path('/login');
			} else {
			}
		});
	});