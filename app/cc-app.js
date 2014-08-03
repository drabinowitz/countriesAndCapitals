angular.module('ccApp',['ngRoute','ngAnimate','ccAppViews']).

	config(['$locationProvider','$routeProvider', function($locationProvider,$routeProvider){
		
		$locationProvider.hashPrefix('!');

		$routeProvider.otherwise({

			redirectTo : '/home'

		});

	}]).

	controller('tabCtrl',['$scope','$location','pubSub',function($scope,$location,pubSub){

		$scope.isActive = function(route) {

			return route === $location.path();

		};

		pubSub.listen('$routeChangeStart',function(){

			$scope.loading = true;

		});

		pubSub.listen('$routeChangeSuccess',function(){

			$scope.loading = false;

			console.log('finished loading');

		});

	}]);;