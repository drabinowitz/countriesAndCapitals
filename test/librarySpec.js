describe('cc-library',function(){

	beforeEach( module('ccLibrary') );

	describe('ccApiCache',function(){

		it('caches requests from other library services',
		inject(function(ccApiCache){

			ccApiCache.put('key','value');

			expect( ccApiCache.get('key') ).toBe( 'value' );

		}));

	});

	ddescribe('ccApiRequest',function(){

		it('gets data from the cache if it can',
		inject(function(ccApiRequest,CC_API_URL,CC_API_COUNTRIES_INFO,CC_API_PARAMS){

			var result;

			ccApiRequest.cache(CC_API_COUNTRIES_INFO,'value');

			ccApiRequest.get(CC_API_COUNTRIES_INFO).then(function(data){

				result = data;

				expect( result ).toBe( 'value' );

			});

		}));

		it('sends a request ')

	});

});