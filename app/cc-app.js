angular.module('ccApp',['ngRoute','ngAnimate','ccAppViews']).

	config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider){
		
		$locationProvider.hashPrefix('!');

		$routeProvider.otherwise({

			redirectTo : '/home'

		});

	}]).

	controller('tabCtrl',['$scope','$location',function($scope,$location){

		$scope.isActive = function(route) {

			return route === $location.path();

		};

		$scope.$on('$routeChangeStart',function(){

			$scope.loading = true;

		});

		$scope.$on('$routeChangeSuccess',function(){

			$scope.loading = false;

			console.log('finished loading');

		});

	}]);;