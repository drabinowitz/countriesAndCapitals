describe('cc-library',function(){

	beforeEach( module('ccLibrary') );

	describe('ccApiCache',function(){

		it('caches requests from other library services',
		inject(function(ccApiCache){

			ccApiCache.put('key','value');

			expect( ccApiCache.get('key') ).toBe( 'value' );

		}));

	});

	describe('ccApiRequest',function(){

		it('gets data from the cache if it can',
		inject(function(ccApiRequest,CC_API_URL,CC_API_COUNTRIES_INFO,CC_API_PARAMS){

			var result;

			ccApiRequest.cache(CC_API_COUNTRIES_INFO,'value');

			ccApiRequest.get(CC_API_COUNTRIES_INFO).then(function(data){

				result = data;

				expect( result ).toBe( 'value' );

			});

		}));

		it('sends a request if it does not have data in the cache',inject(function(ccApiRequest,CC_API_COUNTRIES_INFO,$httpBackend){

			$httpBackend.expectJSONP('http://api.geonames.org/countryInfoJSON?username=drabinowitz&callback=JSON_CALLBACK').respond('...');

			ccApiRequest.get(CC_API_COUNTRIES_INFO);

			$httpBackend.flush();

			$httpBackend.verifyNoOutstandingRequest();

		}));

	});

	describe('country, countries, neighbors, capitals, etc requesters', function(){

		module(function($provide,$q,$timeout) {

            $provide.value('ccApiRequest',{

            	get : function(value) {

            		var defer = $q.defer();

            		$timeout(function(){

            			defer.resolve(value);

            		},10);	
                
                	return defer.promise;
            	
            	}

            });

        });

		describe('ccCountriesInfo',function(){

			it('requests data on all countries',function(){

				inject(function(ccCountriesInfo,CC_API_COUNTRIES_INFO){

					var result;

					ccCountriesInfo.get().then(function(data){

						result = data;

						expect( result ).toEqual( CC_API_COUNTRIES_INFO );

					});

				});

			});

		});

		describe('ccCountryInfo',function(){

			it('requests data on a specific country',function(){

				inject(function(ccCountryInfo,CC_API_COUNTRY_INFO,$interpolate){

					var result;

					var cCode = 'US';

					var expectation = $interpolate(CC_API_COUNTRY_INFO)({countryCode : cCode});

					ccCountryInfo.get( cCode ).then(function(data){

						result = data;

						expect( result ).toEqual( expectation );

					});

				});

			});

		});

		describe('ccCapitalInfo',function(){

			it('gets data on the capital of the country',function(){

				inject(function(ccCapitalInfo,CC_API_CAPITAL_INFO,$interpolate){

					var result;

					var cCode = 'US';

					var expectation = $interpolate(CC_API_CAPITAL_INFO)({countryCode : cCode});

					ccCapitalInfo.get( cCode ).then(function(data){

						result = data;

						expect( result ).toEqual( expectation );

					});

				});

			});

		});

		describe('ccNeighborsInfo',function(){		

			it('gets data on the neighbors of the country',function(){

				inject(function(ccCapitalInfo,CC_API_NEIGHBORS_INFO,$interpolate){

					var result;

					var cCode = 'US';

					var expectation = $interpolate(CC_API_NEIGHBORS_INFO)({countryCode : cCode});

					ccCapitalInfo.get( cCode ).then(function(data){

						result = data;

						expect( result ).toEqual( expectation );

					});

				});

			});

		});

	});

});