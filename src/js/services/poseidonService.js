angular.module('poseidonServices', ['LocalStorageModule'])
	.config(function(localStorageServiceProvider){
		localStorageServiceProvider
		.setPrefix('poseidon');
	})
	
	.factory('Workouts', function($http, localStorageService) {
		var todayWorkout = function(){
				var newDate = new Date();
				var workoutLS = getWorkoutFromLS();
				if(workoutLS != null){
					var oldDate = new Date(workoutLS.date);
					if(oldDate.getDate() < newDate.getDate() || oldDate.getMonth() < newDate.getMonth() || oldDate.getFullYear() < newDate.getFullYear()){
						//WRITE CODE TO PUSH LAST DATE TO DATABASE
						console.log("All Cleared: " + localStorageService.clearAll());
						return {date:newDate, weight:[], cardio:[], note: ""};
					}
					else{
						return workoutLS;
					}
				}else{
					return {date:newDate, weight:[], cardio:[], note: ""};
				}
		};
		
		
		var saveWorkoutToLS = function () {
			return localStorageService.set("todaysWorkout", newWorkout);
		};
		var getWorkoutFromLS = function(){
			return localStorageService.get("todaysWorkout");
		};
		var newWorkout = todayWorkout();
		
		var getWorkouts = function(){
			return newWorkout;
		};
		
		var deleteWeightWorkout = function(id){
			for( var i = 0; i<newWorkout.weight.length; i++){ 
				if(newWorkout.weight[i].id == id){
					newWorkout.weight.splice(i, 1);
				}
			}
			console.log(saveWorkoutToLS());
		};
		
		var deleteCardioWorkout = function(id){
			for( var i = 0; i<newWorkout.cardio.length; i++){ 
				if(newWorkout.cardio[i].id == id){
					newWorkout.cardio.splice(i, 1);
				}
			}
			console.log(saveWorkoutToLS());

		};
		
		var addWeightWorkout = function(workout){
			newWorkout.weight.push(workout);
			console.log(saveWorkoutToLS());

		};
		
		var addCardioWorkout = function(workout){
			newWorkout.cardio.push(workout);
			console.log(saveWorkoutToLS());

		};

		return {
			getWorkouts: getWorkouts,
			deleteWeightWorkout:deleteWeightWorkout,
			deleteCardioWorkout:deleteCardioWorkout,
			addWeightWorkout:addWeightWorkout,
			addCardioWorkout:addCardioWorkout
		};
	})
	
	.factory('users', function($http) {
		return {
			
		}
	});