var myApp = angular.module('poseidon', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  
  var workoutState = {
    name: 'workout',
    url: '/workout',
    templateUrl: './workout-partial.html'
  }

  var loginState = {
    name: 'login',
    url: '/',
    templateUrl: './login-partial.html'
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
  $stateProvider.state(workoutState);
  $stateProvider.state(progressState);
  $stateProvider.state(settingsState);
  
  $urlRouterProvider.otherwise("/");
});