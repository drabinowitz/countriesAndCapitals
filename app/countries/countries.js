viewsModule.config(['$routeProvider',function($routeProvider){

	$routeProvider.when('/countries',{

		templateUrl : "./countries/countries.html",

		controller : "countriesCtrl",

		resolve : {

			countries : ['ccCountriesInfo', function(ccCountriesInfo){

				return ccCountriesInfo();

			}]

		}

	});

}]).

controller('countriesCtrl',['$scope','publisher','$location','countries','ccCurrentCountry',function($scope,publisher,$location,countries,ccCurrentCountry){

	$scope.countries = countries.geonames;

	$scope.countryDetails = function(targetCountry){

		publisher.broadcast('viewLoading');

		ccCurrentCountry.set( targetCountry );

		$location.path('/countries/' + targetCountry.countryCode)

	}

	publisher.broadcast('viewReady');

}]);