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

controller('countriesCtrl',['$scope','$location','pubSub','countries',function($scope,$location,pubSub,countries){

	$scope.countries = countries.geonames;

	$scope.countryDetails = function(targetCountry){

		pubSub.broadcast('targetCountry',targetCountry);

		$location.path('/countries/' + targetCountry.countryCode);

	}

}]);