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

controller('countriesCtrl',['$scope','$location','countries','ccCurrentCountry',function($scope,$location,countries,ccCurrentCountry){

	$scope.countries = countries.geonames;

	$scope.countryDetails = function(targetCountry){

		ccCurrentCountry.set( targetCountry );

		$location.path('/countries/' + targetCountry.countryCode)

	}

}]);