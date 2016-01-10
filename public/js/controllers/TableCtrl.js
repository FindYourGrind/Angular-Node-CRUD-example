angular.module('TableCtrl', []).controller('TableController', function($scope, Table) {

	$scope.users = null;
	$scope.tableTitle = ['ID','Username', 'E-mail', 'Created'];
	$scope.keysInDB = ['_id','username', 'email', 'created'];
	$scope.status = null;

	getUsers();

	function getUsers() {
		Table.get()
			.success(function (users) {
				$scope.users = [];
				users.forEach(function (user, num, arr) {
					var tmpUser = {};
					for (var key in $scope.keysInDB) {
						tmpUser[$scope.keysInDB[key]] = user[$scope.keysInDB[key]];
					}
					$scope.users.push(tmpUser);
				});
			})
			.error(function (error) {
				$scope.status = 'Unable to load users data';
			});
	}
});