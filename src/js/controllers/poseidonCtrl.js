angular.module('poseidonControllers', ['angucomplete-alt'])

	.controller('workoutCtrl', ['$scope','Workouts', function($scope, Workouts) {
		
	//----------------------WORKOUT FACTORY COMMUNICATION FUNCTIONALITY----------------------- 
		$scope.workouts = Workouts.getWorkouts();
		var maxWorkoutList = Workouts.getMaxWorkoutList();
		$scope.newWeightWorkout = {id:guid(), name: "" , weight: "", reps: ""};
		$scope.newCardioWorkout = {id:guid(), name: "" , intensity: "", time: ""};
		$scope.workoutNotes = "";
		$scope.maxWorkout = maxWorkoutList;
		$scope.dirtyList = false;
		$scope.addCardioWorkout = function(){
			
			Workouts.addCardioWorkout($scope.newCardioWorkout);
			$scope.newCardioWorkout = {id:guid(), name: "" , intensity: "", time: ""};
			document.getElementsByClassName('workoutBottomInput')[0].placeholder='Intensity';
			document.getElementsByClassName('workoutBottomInput')[1].placeholder='Time';
		};
		
		$scope.addWeightWorkout = function(){
			
			Workouts.addWeightWorkout($scope.newWeightWorkout);
			$scope.dirtyList = true;
			$scope.newWeightWorkout = {id:guid(), name: "" , weight: "", reps: ""};	
			document.getElementsByClassName('workoutBottomInput')[0].placeholder='Weight';
			document.getElementsByClassName('workoutBottomInput')[1].placeholder='Reps';	
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
			$scope.dirtyList = true;
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
			$scope.dirtyList = true;
		};
		
		$scope.deleteWeightWorkout = function(id){
			Workouts.deleteWeightWorkout(id);
			$scope.dirtyList = true;
		};
		
		$scope.deleteCardioWorkout = function(id){
			Workouts.deleteCardioWorkout(id);
			$scope.dirtyList = true;
		};
		
		$scope.saveWorkout = function(){
			//save to database
			console.log("workout saved");
			$scope.dirtyList = false;
			//if saved
			//clear localstorage
			//put edit button
			//if edit clicked, save button needed
			
		};
		
		function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
		};
		
		
	//----------------------WORKOUT FORM FUNCTIONALITY----------------------- 
		$scope.isWeightLifting = true;
		var max = "";
		var repsTime = "";
		$scope.max = max;
		$scope.repsTime = repsTime;
		
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
		
		var workoutMaxExists = function(name){
			if($scope.isWeightLifting){
				for(var i = 0; i<maxWorkoutList.workouts.weight.length; i++){
					if(name.toUpperCase() === maxWorkoutList.workouts.weight[i].name.toUpperCase()){
						max = maxWorkoutList.workouts.weight[i].weight;
						repsTime = maxWorkoutList.workouts.weight[i].reps;
						return true;
					}
				}
			}
			else{
				for(var i = 0; i<maxWorkoutList.workouts.cardio.length; i++){
					if(name.toUpperCase() === maxWorkoutList.workouts.cardio[i].name.toUpperCase()){
						max = maxWorkoutList.workouts.cardio[i].intensity;
						repsTime = maxWorkoutList.workouts.cardio[i].time;
						return true;
					}
				}
			
			}
			return false;
		};
		
		$scope.lastMaxShow = function(){
			
			if($scope.newWeightWorkout.name != null && $scope.newWeightWorkout.name != ""){
				if(workoutMaxExists($scope.newWeightWorkout.name)){
				
					document.getElementsByClassName('workoutBottomInput')[0].placeholder="Max: " + max;
					document.getElementsByClassName('workoutBottomInput')[1].placeholder="Reps: " + repsTime;
				
				}
				else{
				
					document.getElementsByClassName('workoutBottomInput')[0].placeholder='Weight';
					document.getElementsByClassName('workoutBottomInput')[1].placeholder='Reps';
				
				}
			}
			else if ($scope.isWeightLifting){
					document.getElementsByClassName('workoutBottomInput')[0].placeholder='Weight';
					document.getElementsByClassName('workoutBottomInput')[1].placeholder='Reps';			
			}
			else if($scope.newCardioWorkout.name != null && $scope.newCardioWorkout.name != ""){
				if(workoutMaxExists($scope.newCardioWorkout.name)){
				
					document.getElementsByClassName('workoutBottomInput')[0].placeholder="Intensity: " + max;
					document.getElementsByClassName('workoutBottomInput')[1].placeholder="Minutes: " + repsTime;
				
				}
				else{
				
					document.getElementsByClassName('workoutBottomInput')[0].placeholder='Intensity';
					document.getElementsByClassName('workoutBottomInput')[1].placeholder='Time';
				
				}
			}
			else{
				
					document.getElementsByClassName('workoutBottomInput')[0].placeholder='Intensity';
					document.getElementsByClassName('workoutBottomInput')[1].placeholder='Time';
				
			}
		};

	
	//----------------------DATE AND DATE SWITCH FUNCTIONALITY----------------------- 

		$scope.date = $scope.workouts.date;
				
		$scope.notToday = false;
		var currDisplayDate = new Date();
		currDisplayDate.setHours(23,59,59,999);
		var isToday = function(date){
			var todayDate = new Date();
			todayDate.setHours(23,59,59,999);
			if(date.getDate() < todayDate.getDate() || date.getMonth() < todayDate.getMonth() || date.getFullYear() < todayDate.getFullYear()){

				return false;
			}

			return true;
			
		};
		
		$scope.goToLastWorkout = function(){
			currDisplayDate = new Date(currDisplayDate.getTime() - (24*60*60*1000));
			$scope.date = currDisplayDate.getTime();
			if(!isToday(currDisplayDate)){
				$scope.notToday = true;
			}
		};
		
		$scope.goToNextWorkout = function(){
			currDisplayDate = new Date(currDisplayDate.getTime() + (24*60*60*1000));
			$scope.date = currDisplayDate.getTime();
			if(isToday(currDisplayDate)){
				$scope.notToday = false;
			}
		};
	}])
		
	.controller('progressCtrl', ['$scope','$http','Workouts', function($scope, $http, Workouts) {
		
	}])
	
	.controller('settingsCtrl', ['$scope','$http','Workouts', function($scope, $http, Workouts) {
		
	}])
	
	/*.controller('LoginController', ['$location', 'AuthenticationService', function($location, AuthenticationService){
		var vm = this;
 
        vm.login = login;
 
        initController();
 
        function initController() {
            // reset login status
            AuthenticationService.Logout();
        };
 
        function login() {
            vm.loading = true;
            AuthenticationService.Login(vm.username, vm.password, function (result) {
                if (result === true) {
                    $location.path('/');
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        };
	}])*/;
