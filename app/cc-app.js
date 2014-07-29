angular.module('ccApp',['ngRoute','ngAnimate','ccAppViews','ccTab']).
config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider){
	
	$locationProvider.hashPrefix('!');
	$routeProvider.otherwise({
		redirectTo : '/home'
	});
}]);