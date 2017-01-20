angular.module('poseidonControllers', ['LocalStorageModule'])

	.controller('workoutCtrl', ['$scope','$http','Workouts', 'localStorageService', function($scope, $http, Workouts, localStorageService) {
		$scope.date = new Date();
		$scope.workouts = Workouts.getWorkouts();
		$scope.isWeightLifting = true;
		$scope.newWeightWorkout = {id:guid(), name: "" , weight: "", reps: ""};
		$scope.newCardioWorkout = {id:guid(), name: "" , intensity: "", time: ""};
		
		$scope.formReady = false;
		
		$scope.switchWorkoutInput = function(){
			if($scope.isWeightLifting == true){
				$scope.isWeightLifting = false;
				$scope.newWeightWorkout = {name: "" , weight: "", reps: ""};
			}
			else{
				$scope.isWeightLifting = true;
				$scope.newCardioWorkout = {name: "" , intensity: "", time: ""};
			}
		};
		
		$scope.addCardioWorkout = function(){
			
			Workouts.addCardioWorkout($scope.newCardioWorkout);
			$scope.newCardioWorkout = {id:guid(), name: "" , intensity: "", time: ""};
		};
		
		$scope.addWeightWorkout = function(){
			
			Workout.addWeightWorkout($scope.newCardioWorkout);
			$scope.newWeightWorkout = {id:guid(), name: "" , weight: "", reps: ""};	
		};
		
		$scope.deleteWeightWorkout = function(id){
			Workouts.deleteWeightWorkout(id);
		};
		
		$scope.deleteCardioWorkout = function(id){
			Workouts.deleteCardioWorkout(id);
		};
		
		
		
		function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
		}
	}])
		
	.controller('progressCtrl', ['$scope','$http','Workouts', function($scope, $http, Workouts) {
		
	}]);
