viewsModule.config(['$routeProvider',function($routeProvider){

	$routeProvider.when('/countries/:country',{

		templateUrl : "./countries/country/country.html",

		controller : "countryCtrl",

		resolve : {

			countryInfo : ['$q','$route','ccCurrentCountry','ccCountryInfo',function($q,$route,ccCurrentCountry,ccCountryInfo){

				var currentCountry = ccCurrentCountry.get();

				if( currentCountry && currentCountry.countryCode == $route.current.params.country ){

					return currentCountry;

				} else {

					var defer = $q.defer();

					ccCountryInfo( $route.current.params.country ).

					then(function(data){

						ccCurrentCountry.set( data.geonames[0] );

						defer.resolve( ccCurrentCountry.get() );

					});

					return defer.promise; 

				}

			}],

			capitalInfo : ['$q','$route','ccCapitalInfo', function($q,$route,ccCapitalInfo){

				var defer = $q.defer();

				ccCapitalInfo( $route.current.params.country ).

				then(function(data){

					defer.resolve( data.geonames[0] );

				});

				return defer.promise;

			}],

			neighborsInfo : ['$route','ccNeighborsInfo',function($route,ccNeighborsInfo){

				return ccNeighborsInfo( $route.current.params.country );

			}]

		}

	});

}]).

controller('countryCtrl',['$scope','publisher','countryInfo','capitalInfo','neighborsInfo',function($scope,publisher,countryInfo,capitalInfo,neighborsInfo){

	$scope.country = countryInfo;

	$scope.capital = capitalInfo;

	$scope.neighbors = neighborsInfo.geonames;

	publisher.broadcast('viewReady');

}]);