viewsModule.config(['$routeProvider',function($routeProvider){

	$routeProvider.when('/countries',{

		templateUrl : "./countries/countries.html",

		controller : "countriesCtrl",

		resolve : {

			countries : ['ccCountriesInfo', function(ccCountriesInfo){

				return ccCountriesInfo.get();

			}]

		}

	});

}]).

controller('countriesCtrl',['$scope','$location','countries','ccCountryInfo',function($scope,$location,countries,ccCountryInfo){

	$scope.countries = countries.geonames;

	$scope.countryDetails = function(targetCountry){

		ccCountryInfo.cache( targetCountry );

		$location.path('/countries/' + targetCountry.countryCode);

	}

}]);