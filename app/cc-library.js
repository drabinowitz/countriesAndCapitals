angular.module('ccLibrary',[]).

	constant('CC_API_URL','http://api.geonames.org/').

	constant('CC_API_CONFIG',{

		method : 'JSONP',

		cache : true

	}).

	constant('CC_API_PARAMS','username=drabinowitz&callback=JSON_CALLBACK').

	constant('CC_API_COUNTRIES_INFO','countryInfoJSON?').

	constant('CC_API_COUNTRY_INFO','countryInfoJSON?country={{ countryCode }}&').

	constant('CC_API_CAPITAL_INFO','searchJSON?country={{ countryCode }}&q=capital%20of%20a%20political%20entity&').

	constant('CC_API_NEIGHBORS_INFO','neighboursJSON?country={{ countryCode }}&').

/*	factory('pubSub',['$rootScope',function($rootScope){

		return {

			broadcast : function(event,args){

				$rootScope.$broadcast(event,args);

			},

			listen : function(event,action){

				$rootScope.$on(event,action);

			}

		}

	}]).*/

	factory('ccApiCache',['$cacheFactory',function($cacheFactory){

		var cacheEngine = $cacheFactory("geonames");

		return {

			get : function(key){

				return cacheEngine.get( key );

			},

			put : function(key,data){

				cacheEngine.put( key,data );

			}

		};		

	}]).

	factory('ccApiRequest',['$http','$q','CC_API_URL','CC_API_CONFIG','CC_API_PARAMS','$rootScope','ccApiCache',
						function($http, $q, CC_API_URL, CC_API_CONFIG, CC_API_PARAMS, $rootScope, ccApiCache){



		var queryConfig = CC_API_CONFIG;

		return { 

			get : function(path){

				queryConfig.url = CC_API_URL + path + CC_API_PARAMS;

				var cache = ccApiCache.get(queryConfig.url);
				
				var defer = $q.defer();


				if (cache){

					defer.resolve(cache);

				} else {

					$http(queryConfig).

					success(function(data,status,headers,config){

						ccApiCache.put(config.url,data);

						defer.resolve(data);

					}).

					error(function(error){

						defer.reject(error);

						$rootScope.$broadcast('error',queryConfig.url,error);

					});

				}

				return defer.promise;

			},

			cache : function(path,data){

				var urlCachePath = CC_API_URL + path + CC_API_PARAMS;

				ccApiCache.put( urlCachePath,data );

			}

		}

	}]).

	factory('ccCountriesInfo',['ccApiRequest','CC_API_COUNTRIES_INFO',function(ccApiRequest,CC_API_COUNTRIES_INFO){

		return {

			get : function(){

				var path = CC_API_COUNTRIES_INFO;

				return ccApiRequest.get( path );

			}

		};

	}]).

	factory('ccCountryInfo',['$q','ccApiCache','ccApiRequest','CC_API_COUNTRY_INFO','$interpolate',
							function($q,ccApiCache,ccApiRequest,CC_API_COUNTRY_INFO,$interpolate){

		return {

			get : function(cCode){

				var defer = $q.defer();

				var path = $interpolate(CC_API_COUNTRY_INFO)({countryCode : cCode});

				ccApiRequest.get( path ).then(function(data){

					if(data.hasOwnProperty('geonames')){

						defer.resolve(data.geonames[0]);

					} else {

						defer.resolve(data);

					}

				});

				return defer.promise;

			},

			cache : function(country){

				var path = $interpolate(CC_API_COUNTRY_INFO)({countryCode : country.countryCode});

				return ccApiRequest.cache ( path,country );

			}

		};

	}]).

	factory('ccCapitalInfo',['ccApiRequest','CC_API_CAPITAL_INFO','$interpolate',function(ccApiRequest,CC_API_CAPITAL_INFO,$interpolate){

		return {

			get : function(cCode){

				var path = $interpolate(CC_API_CAPITAL_INFO)({countryCode : cCode});

				return ccApiRequest.get( path );

			}

		};



	}]).

	factory('ccNeighborsInfo',['ccApiRequest','CC_API_NEIGHBORS_INFO','$interpolate',function(ccApiRequest,CC_API_NEIGHBORS_INFO,$interpolate){

		return {

			get : function(cCode){

				var path = $interpolate(CC_API_NEIGHBORS_INFO)({countryCode : cCode});

				return ccApiRequest.get( path );

			}

		};

	}]);