angular.module('poseidonServices', [])
	.factory('Workouts', function($http) {
		var workouts = {weight: [{name:"Bench Press",weight:"180", reps:"18" , id:"0"}], cardio: [{"name":"run","intensity":"-", "time":"5",id:"0"},{"name":"walk","intensity":"8", "time":"8",id:"1"}]};
		
		var getWorkouts = function(){
			return workouts;
		};
		
		var deleteWeightWorkout = function(id){
			for( var i = 0; i<workouts.weight.length; i++){ 
				if(workouts.weight[i].id == id){
					workouts.weight.splice(i, 1);
				}
			}
		};
		
		var deleteCardioWorkout = function(id){
			for( var i = 0; i<workouts.cardio.length; i++){ 
				if(workouts.cardio[i].id == id){
					workouts.cardio.splice(i, 1);
				}
			}
		};
		
		var addWeightWorkout = function(workout){
			workouts.weight.push(workout);
		}
		
		var addCardioWorkout = function(workout){
			workouts.cardio.push(workout);
		}

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