angular.module('ccTab',[]).

	controller('tabCtrl',['$scope','$location',function($scope,$location){

		$scope.isActive = function(route) {
			return route === $location.path();
		};

	}]);