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

controller('countriesCtrl',['$rootScope','$scope','$location','countries',function($rootScope,$scope,$location,countries){

	$scope.countries = countries.geonames;

	$scope.countryDetails = function(targetCountry){

/*		ccCountryInfo.cache( targetCountry );*/

		$rootScope.$broadcast('targetCountry',targetCountry);

		$location.path('/countries/' + targetCountry.countryCode);

	}

}]);