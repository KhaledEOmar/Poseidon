var poseidonApp = angular.module('poseidon', ['ui.router']);

poseidonApp.config(function($stateProvider, $urlRouterProvider) {
  
	var workoutState = {
		name: 'workout',
		url: '/workout',
		controller:'workoutCtrl',
		templateUrl: './workout-partial.html'
	}

	var loginState = {
		name: 'login',
		url: '/',
		templateUrl: './login-partial.html'
	}

	var signupState = {
		name: 'signup',
		url: '/signup',
		templateUrl: './signup-partial.html'
	}

	var progressState = {
		name: 'progress',
		url: '/progress',
		templateUrl: './progress-partial.html'
	}

	var settingsState = {
		name: 'settings',
		url: '/settings',
		templateUrl: './settings-partial.html'
	}
  
	$stateProvider.state(loginState);
	$stateProvider.state(signupState);
	$stateProvider.state(workoutState);
	$stateProvider.state(progressState);
	$stateProvider.state(settingsState);

	$urlRouterProvider.otherwise("/");
});


poseidonApp.controller('workoutCtrl',['$scope',function($scope){
	$scope.date = new Date();
}]);
