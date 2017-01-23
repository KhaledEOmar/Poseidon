angular.module('poseidonServices', ['LocalStorageModule'])
	.config(function(localStorageServiceProvider){
		localStorageServiceProvider
		.setPrefix('poseidon');
	})
	
	.factory('User', function($http, localStorageService) {

	//----------------------GETTING USER WORKOUT DATA FROM DATABASE AND SEND TO CTRL-- 
		var getMaxWorkoutListDB = function(){
			//return get list of user workout max weight and max reps from database
		};
		
		//var maxWorkoutList = getMaxWorkoutListDB(); 
		var maxWorkoutList = {user:"augustthathird", workouts:{weight:[{ name:"BENCH PRESS", weight:"180", reps:"8"}],cardio:[{name:"RUNNING", time:"45"}]}};
		var getMaxWorkoutList = function(){
			return maxWorkoutList;
		};
	
	//----------------------GETTING USER SETTINGS FROM DATABASE----------------------- 
		var getUserSettingsDB = function(){
			//return list of user settings from database
		};

		var userSettings = getUserSettingsDB();		

		var getUserSettings = function(){
			return userSettings;
		};
		
		var changeUserSettings = function(userSettings){
			//save user settings in database immediately after change
		};


		//--------------------USER LOGIN AND LOGOUT FUNCTIONALITY---------------

		
		
		return {
			getMaxWorkoutList: getMaxWorkoutList,
			getUserSettings:getUserSettings,
			changeUserSettings:changeUserSettings
		};
		
	})
	
	.factory('Workouts', function($http, User, localStorageService) {
		var todayWorkout = function(){
				var newDate = new Date();
				var workoutLS = getWorkoutFromLS();
				if(workoutLS != null){
					var oldDate = new Date(workoutLS.date);
					if(oldDate.getDate() < newDate.getDate() || oldDate.getMonth() < newDate.getMonth() || oldDate.getFullYear() < newDate.getFullYear()){
						//WRITE CODE TO PUSH LAST DATE TO DATABASE
						if (confirm('Save workout from: ' + oldDate.getMonth() + "/" + oldDate.getDate() + "/" + oldDate.getFullYear())) {
							// Save it!
						} else {
							// Do nothing!
						}
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
		
		var userMaxWorkoutList = User.getMaxWorkoutList();

		var getMaxWorkoutList = function(){
			return userMaxWorkoutList;
		};
			
		return {
			getWorkouts: getWorkouts,
			getMaxWorkoutList:getMaxWorkoutList,
			deleteWeightWorkout:deleteWeightWorkout,
			deleteCardioWorkout:deleteCardioWorkout,
			addWeightWorkout:addWeightWorkout,
			addCardioWorkout:addCardioWorkout
		};
	});