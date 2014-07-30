viewsModule.config(['$routeProvider',function($routeProvider){

	$routeProvider.when('/countries/:country',{

		templateUrl : "./countries/country/country.html",

		controller : "countryCtrl",

		resolve : {

			currentContext : ['$q','$route','ccCurrentCountry','ccCountryInfo',function($q,$route,ccCurrentCountry,ccCountryInfo){

				var currentCountry = ccCurrentCountry.get();

				if( currentCountry && currentCountry.countryCode == $route.current.params.country ){

					return currentCountry;

				} else {

					var defer = $q.defer();

					ccCountryInfo( $route.current.params.country ).then(function(data){

						ccCurrentCountry.set( data.geonames[0] );

						defer.resolve( ccCurrentCountry.get() );

					})

					return defer.promise; 

				}

			}],

			countryInfo : ['$route','ccCapitalInfo', function($route,ccCapitalInfo){

				return ccCapitalInfo( $route.current.params.country );

			}]

		}

	});

}]).

controller('countryCtrl',['$scope','currentContext','countryInfo',function($scope,currentContext,countryInfo){

	console.log(currentContext);

	console.log(countryInfo);

}]);