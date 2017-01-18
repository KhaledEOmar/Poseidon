angular.module('poseidonControllers', ['LocalStorageModule'])

	.controller('workoutCtrl', ['$scope','$http','Workouts', 'localStorageService', function($scope, $http, Workouts, localStorageService) {
		$scope.date = new Date();
		
	}])
		
	.controller('progressCtrl', ['$scope','$http','Workouts', function($scope, $http, Workouts) {
		
	}]);
