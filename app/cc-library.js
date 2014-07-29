angular.module('ccLibrary',[]).
	
	constant('CC_REQUEST_API','http://api.geonames.org/').

	constant('CC_API_USERNAME','username=drabinowitz').

	constant('CC_COUNTRY_INFO','countryInfo').

	factory('ccApiRequest',['$http','$q','CC_REQUEST_API','CC_API_USERNAME',
						function($http, $q, CC_REQUEST_API, CC_API_USERNAME){

		return function(path,queryParams){

			var queryParamsStr = '';

			if (queryParams){

				angular.forEach(queryParams, function(queryKey,queryValue){

					queryParamsStr += '&' + queryKey + '=' + queryValue;

				});

			}
			
			var defer = $q.defer();

			$http.get(CC_REQUEST_API + path + '?' + CC_API_USERNAME + queryParamsStr).

				success(function(data){

					defer.resolve(data);

				}).

				error(function(error){

					defer.reject(error);

				});

			return defer.promise;

		};

	}]).

	factory('ccCountryInfo',['ccApiRequest','$q','CC_COUNTRY_INFO',function(ccApiRequest,$q,CC_COUNTRY_INFO){

		return function(){

			return ccApiRequest(CC_COUNTRY_INFO);

		}

	}]);