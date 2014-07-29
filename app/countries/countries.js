viewsModule.config(['$routeProvider',function($routeProvider){

	$routeProvider.when('/countries',{

		templateUrl : "./countries/countries.html",

		controller : "countriesCtrl",

		resolve : {

			countryInfo : ['ccCountryInfo', function(ccCountryInfo){

				return ccCountryInfo();

			}]

		}

	});

}]).

controller('countriesCtrl',['$scope','countryInfo',function($scope,countryInfo){

	console.log(countryInfo);

}]);