angular.module('poseidonControllers', [])

	.controller('workoutCtrl', ['$scope','$http','Workouts', function($scope, $http, Workouts) {
		$scope.workouts = Workouts.getWorkouts();
		$scope.date = $scope.workouts.date;
		$scope.isWeightLifting = true;
		$scope.newWeightWorkout = {id:guid(), name: "" , weight: "", reps: "", notes:""};
		$scope.newCardioWorkout = {id:guid(), name: "" , intensity: "", time: "", notes:""};
		
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
			
			Workouts.addWeightWorkout($scope.newWeightWorkout);
			$scope.newWeightWorkout = {id:guid(), name: "" , weight: "", reps: ""};	
		};
		
		$scope.duplicateWeightWorkout = function(id){
			var workout = {id:guid(), name: "" , weight: "", reps: ""};
			for(var i = 0; i < $scope.workouts.weight.length; i++){
				if($scope.workouts.weight[i].id == id){
					workout.name = $scope.workouts.weight[i].name;
					workout.weight = $scope.workouts.weight[i].weight;
					workout.reps = $scope.workouts.weight[i].reps;
					Workouts.addWeightWorkout(workout);
				}
			}
		};
		
		$scope.duplicateCardioWorkout = function(id){
			var workout = {id:guid(), name: "" , intensity: "", time: ""};
			for(var i = 0; i < $scope.workouts.cardio.length; i++){
				if($scope.workouts.cardio[i].id == id){
					workout.name = $scope.workouts.cardio[i].name;
					workout.intensity = $scope.workouts.cardio[i].intensity;
					workout.time = $scope.workouts.cardio[i].time;
					Workouts.addCardioWorkout(workout);
				}
			}
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
