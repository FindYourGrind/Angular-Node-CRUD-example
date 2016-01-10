angular.module('EditCtrl', []).controller('EditController', function($scope, Create, Receive, Update, Delete) {

	$scope.responses = {
		'create': '',
		'receive': '',
		'update': '',
		'delete': '',
		'receiveAll': '',
		'found': ''
	};

	/*
	CREATE
	 */

	$scope.dataForCreating = {
		'username': '',
		'email': '',
		'password': ''
	};

	$scope.createUser = function () {
		Create.create($scope.dataForCreating)
			.success(function (response) {
				$scope.dataForCreating.password = '';
				$scope.responses.create = 'New user added';
				getIdList();
			})
			.error(function (error) {
				$scope.responses.create = error;
			});
	};

	/*
	RECEIVE
	 */

	$scope.users = null;
	$scope.tableTitle = ['ID','Username', 'E-mail', 'Created'];
	$scope.keysInDB = ['_id','username', 'email', 'created'];
	$scope.searchingOptions = ['User ID', 'User Name', 'User E-mail'];
	$scope.dataForReceiveing = {
		'data': '',
		'option': $scope.searchingOptions[0]
	};

	$scope.getReceivingMethod = function () {
		if ($scope.dataForReceiveing.option === 'User ID') {
			return $scope.receiveUser(Receive.receiveUserById);
		} else if ($scope.dataForReceiveing.option === 'User Name') {
			return $scope.receiveUser(Receive.receiveUserByName);
		} else if ($scope.dataForReceiveing.option === 'User E-mail') {
			return $scope.receiveUser(Receive.receiveUserByEmail);
		}
	};

	$scope.receiveUser = function (method) {
		if ($scope.dataForReceiveing.data) {
			method($scope.dataForReceiveing)
				.success(function (users) {
					$scope.users = [];
					if (users.length) {
						users.forEach(function (user, num, arr) {
							var tmpUser = {};
							for (var key in $scope.keysInDB) {
								tmpUser[$scope.keysInDB[key]] = user[$scope.keysInDB[key]];
							}
							$scope.users.push(tmpUser);
						});
					} else {
						var tmpUser = {};
						for (var key in $scope.keysInDB) {
							tmpUser[$scope.keysInDB[key]] = users[$scope.keysInDB[key]];
						}
						$scope.users.push(tmpUser);
					}
					$scope.responses.found = 'Found';
				})
				.error(function (error) {
					$scope.responses.found = error;
				});
		} else {
			$scope.responses.found = 'Wrong searching data';
		}
	};

	/*
	 UPDATE
	 */

	$scope.usersForUpdating = '';
	$scope.idList = '';
	$scope.idForUpdate = '';
	$scope.dataForUpdating = {
		'id': '',
		'username': '',
		'email': '',
		'password': ''
	};

	$scope.updateUser = function () {
		if ($scope.dataForUpdating.id) {
			Update.update($scope.dataForUpdating)
				.success(function (response) {
					$scope.responses.update = 'User updated';
				})
				.error(function (error) {
					$scope.responses.update = error;
				});
		} else {
			$scope.responses.update = 'Wrong ID';
		}
	};

	$scope.fillUserData = function (data, id) {
		$scope.dataForUpdating.id = $scope.idForUpdate;
		var i = $scope.usersForUpdating.length;
		while (i--) {
			if ($scope.usersForUpdating[i]._id === $scope.idForUpdate) {
				$scope.dataForUpdating.username =  $scope.usersForUpdating[i].username;
				$scope.dataForUpdating.email =  $scope.usersForUpdating[i].email;
				break;
			}
		}
	};

	function getIdList(){
		Update.receiveAll()
			.success(function (response) {
				$scope.usersForUpdating = response;
				var l = [];
				$scope.usersForUpdating.forEach(function (user, num, arr){
					l.push(user._id);
				});
				$scope.idList = l;
				$scope.idForUpdate = l;
			})
			.error(function (error) {

			});
	}

	/*
	 DELETE
	 */
	$scope.idForDelete = '';

	$scope.deleteUser = function () {
		if ($scope.idForDelete) {
			Delete.delete($scope.idForDelete)
				.success(function (response) {
					$scope.responses.delete = response;
					getIdList();
				})
				.error(function (error) {
					$scope.responses.delete = error;
				});
		} else {
			$scope.responses.delete = 'Wrong ID';
		}
	};

	/*
	START
	 */

	getIdList();

});