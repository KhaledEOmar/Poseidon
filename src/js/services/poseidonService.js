angular.module('poseidonServices', ['LocalStorageModule'])

	
	/*.factory('AuthenticationService', function($http, localStorageService){
		var service = {};
 
        service.Login = Login;
        service.Logout = Logout;
 
        return service;
 
        function Login(username, password, callback) {
            $http.post('/api/authenticate', { username: username, password: password })
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { username: username, token: response.token };
 
                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
 
                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }
 
        function Logout() {
            // remove user from local storage and clear http auth header
            localStorageService.remove("currentUser");
            $http.defaults.headers.common.Authorization = '';
        }
    })*/
	
	.factory('User', function($http, /*AuthenticationService,*/ localStorageService) {

	//----------------------GETTING USER WORKOUT DATA FROM DATABASE AND SEND TO CTRL-- 
		var getMaxWorkoutListDB = function(){
			//return get list of user workout max weight and max reps from database
		};
		
		//var maxWorkoutList = getMaxWorkoutListDB(); 
		var maxWorkoutList = {user:"augustthathird", workouts:{weight:[{ name:"BENCH PRESS", weight:"180", reps:"8"}],cardio:[{name:"RUNNING", intensity:"-", time:"45"}]}};
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

		return {
			getMaxWorkoutList: getMaxWorkoutList,
			getUserSettings:getUserSettings,
			changeUserSettings:changeUserSettings
		};
		
	})
	
	.factory('Workouts', function($http, User, localStorageService) {
		var todayWorkout = function(){
				var newDate = new Date();
				newDate.setHours(23,59,59,999);
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