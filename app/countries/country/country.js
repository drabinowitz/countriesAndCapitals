viewsModule.config(['$routeProvider',function($routeProvider){

	$routeProvider.when('/countries/:country',{

		templateUrl : "./countries/country/country.html",

		controller : "countryCtrl",

		resolve : {

			countryInfo : ['$route','ccCountryInfo',function($route,ccCountryInfo){

				return ccCountryInfo.get( $route.current.params.country );

			}],

			capitalInfo : ['$route','ccCapitalInfo', function($route,ccCapitalInfo){

				return ccCapitalInfo.get( $route.current.params.country );

			}],

			neighborsInfo : ['$route','ccNeighborsInfo',function($route,ccNeighborsInfo){

				return ccNeighborsInfo.get( $route.current.params.country );

			}]

		}

	});

}]).

controller('countryCtrl',['$scope','countryInfo','capitalInfo','neighborsInfo',function($scope,countryInfo,capitalInfo,neighborsInfo){

	$scope.country = countryInfo;

	$scope.capital = capitalInfo.geonames[0];

	$scope.neighbors = neighborsInfo.geonames;

}]);