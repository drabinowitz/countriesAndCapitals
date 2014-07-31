angular.module('ccTab',[]).

	controller('tabCtrl',['$scope','$location',function($scope,$location){

		$scope.isActive = function(route) {

			return route === $location.path();

		};

		$scope.$on('viewLoading',function(){

			console.log('caught Loading');

		});

		$scope.$on('viewReady',function(){

			console.log('caught ready');

		});

	}]);