viewsModule.config(['$routeProvider',function($routeProvider){

	$routeProvider.when('/countries',{

		templateUrl : "./countries/countries.html",

		controller : "countriesCtrl",

		resolve : {

			countries : ['ccCountryInfo', function(ccCountryInfo){

				return ccCountryInfo();

			}]

		}

	});

}]).

controller('countriesCtrl',['$scope','countries',function($scope,countries){

	$scope.countries = countries.geonames;

}]);