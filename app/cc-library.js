angular.module('ccLibrary',[]).

	constant('CC_API_URL','http://api.geonames.org/').

	constant('CC_API_CONFIG',{

		method : 'JSONP',

		cache : true

/*		params : {

			username:'drabinowitz',

			callback:'JSON_CALLBACK'*/

	}).
	
/*	constant('CC_API_URL','http://api.geonames.org/').

	constant('CC_API_METHOD','JSONP'),

	constant('CC_API_CACHE','')*/

	constant('CC_API_PARAMS','JSON?username=drabinowitz&callback=JSON_CALLBACK').

	constant('CC_COUNTRY_INFO','countryInfo').

	factory('ccApiRequest',['$http','$q','CC_API_URL','CC_API_CONFIG','CC_API_PARAMS','$rootScope','$cacheFactory',
						function($http, $q, CC_API_URL, CC_API_CONFIG, CC_API_PARAMS, $rootScope, $cacheFactory){

		var cacheEngine = $cacheFactory("geonames");

		var queryConfig = CC_API_CONFIG;

		return function(path,queryParams){

			var queryParamsStr = '';

			if (queryParams){

				for (var attrname in queryParams){

					queryParamsStr += '&' + attrname + '=' + queryParams[attrname];

				}

			}

			queryConfig.url = CC_API_URL + path + CC_API_PARAMS + queryParamsStr;

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

	factory('ccCountryInfo',['ccApiRequest','$q','CC_COUNTRY_INFO',function(ccApiRequest,$q,CC_COUNTRY_INFO){

		return function(){

			return ccApiRequest(CC_COUNTRY_INFO);

		};

	}]);