var poseidonApp = angular.module('poseidon', ['ui.router' , 'poseidonControllers', 'poseidonServices']);

poseidonApp.config(function($stateProvider, $urlRouterProvider) {
  
	var workoutState = {
		name: 'workout',
		url: '/workout',
		controller:'workoutCtrl',
		templateUrl: './partial/workout-partial.html'
	}

	var loginState = {
		name: 'login',
		url: '/',
		controller:'LoginController',
		templateUrl: './partial/login-partial.html',
	}

	var signupState = {
		name: 'signup',
		url: '/signup',
		templateUrl: './partial/signup-partial.html'
	}

	var progressState = {
		name: 'progress',
		url: '/progress',
		controller:'progressCtrl',
		templateUrl: './partial/progress-partial.html'
	}

	var settingsState = {
		name: 'settings',
		url: '/settings',
		controller:'settingsCtrl',
		templateUrl: './partial/settings-partial.html'
	}
  
	$stateProvider.state(loginState);
	$stateProvider.state(signupState);
	$stateProvider.state(workoutState);
	$stateProvider.state(progressState);
	$stateProvider.state(settingsState);
	

	$urlRouterProvider.otherwise("/");
});