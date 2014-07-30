angular.module('ccLibrary',[]).

	constant('CC_API_URL','http://api.geonames.org/').

	constant('CC_API_CONFIG',{

		method : 'JSONP',

		cache : true

	}).

	constant('CC_API_PARAMS','username=drabinowitz&callback=JSON_CALLBACK').

	constant('CC_API_COUNTRIES_INFO','countryInfoJSON?').

	constant('CC_API_COUNTRY_INFO','countryInfoJSON?country={{ countryCode }}&').

	constant('CC_API_CAPITAL_INFO','searchJSON?country={{ countryCode }}&q=capital of a political entity&').

	factory('ccApiRequest',['$http','$q','CC_API_URL','CC_API_CONFIG','CC_API_PARAMS','$rootScope','$cacheFactory',
						function($http, $q, CC_API_URL, CC_API_CONFIG, CC_API_PARAMS, $rootScope, $cacheFactory){

		var cacheEngine = $cacheFactory("geonames");

		var queryConfig = CC_API_CONFIG;

		return function(path){

			queryConfig.url = CC_API_URL + path + CC_API_PARAMS;

			var cache = cacheEngine.get(queryConfig.url);
			
			var defer = $q.defer();


			if (cache){

				defer.resolve(cache);

			} else {

				$http(queryConfig).

				success(function(data){

					cacheEngine.put(queryConfig.url,data);

					defer.resolve(data);

				}).

				error(function(error){

					defer.reject(error);

					$rootScope.$broadcast('error',queryConfig.url,error);

				});

			}

			return defer.promise;

		};

	}]).

	factory('ccCountriesInfo',['ccApiRequest','CC_API_COUNTRIES_INFO',function(ccApiRequest,CC_API_COUNTRIES_INFO){

		return function(){

			return ccApiRequest(CC_API_COUNTRIES_INFO);

		};

	}]).

	factory('ccCountryInfo',['ccApiRequest','CC_API_COUNTRY_INFO','$interpolate',function(ccApiRequest,CC_API_COUNTRY_INFO,$interpolate){

		return function(cCode){

			var path = $interpolate(CC_API_COUNTRY_INFO)({countryCode : cCode});

			return ccApiRequest(path);

		};

	}]).

	factory('ccCapitalInfo',['ccApiRequest','CC_API_CAPITAL_INFO','$interpolate',function(ccApiRequest,CC_API_CAPITAL_INFO,$interpolate){

		return function(cCode){

			var path = $interpolate(CC_API_CAPITAL_INFO)({countryCode : cCode});

			return ccApiRequest(path);

		};

	}]);