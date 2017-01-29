var poseidonApp = angular.module('poseidon', ['ui.router' , 'poseidonControllers', 'poseidonServices', 'LocalStorageModule']);

poseidonApp.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
  	localStorageServiceProvider
	.setPrefix('poseidon');
	
	var workoutState = {
		name: 'workout',
		url: '/workout',
		controller:'workoutCtrl',
		templateUrl: './partial/workout-partial.html'
	}

	var loginState = {
		name: 'login',
		url: '/login',
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
	

	$urlRouterProvider.otherwise("/login");
});

poseidonApp.run(function($rootScope, $http, $location, localStorageService) {
	/*	// keep user logged in after page refresh
        if (localStorageService.get("currentUser") != null) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + localStorageService.get("currentUser");
        }
 
        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && localStorageService.get("currentUser") != null) {
                $location.path('/login');
            }
        });*/
	
});