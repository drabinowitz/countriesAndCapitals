describe('cc-app-views',function(){

	beforeEach( module('ccAppViews') );

	describe('/home route', function(){

		it('loades the home.html content by default and on button click for Home',
		inject(function($location,$rootScope,$httpBackend,$rootElement,$compile){

			var view = $compile('<div ng-view></div>')($rootScope);

			$rootElement.append(view);

			$httpBackend.expect('GET','./home/home.html').respond('...');

			$rootScope.$apply(function() {
                $location.path('/home');
            });

            $rootScope.$digest();

		}));

	});

	describe('/countries route', function(){

        beforeEach(inject(function($controller, $rootScope) {

        	countries = { 

        		geonames : [

        			{

						countryName : 'United States'

					}

				]

			};

            scope = $rootScope.$new();

            ctrl = $controller('countriesCtrl', {

                $scope : scope,

                countries : countries

            });

        }));

		it('loads the countries.html, resolves a request for countries, and attaches the countries controller',
					inject(function($location,$rootScope,$httpBackend,$rootElement,$compile){

			var view = $compile('<div ng-view></div>')($rootScope);

			$rootElement.append(view);

			$httpBackend.expectGET('./countries/countries.html').respond('...');

			$httpBackend.whenJSONP('http://api.geonames.org/countryInfoJSON?username=drabinowitz&callback=JSON_CALLBACK').respond('...');

			$rootScope.$apply(function() {
                $location.path('/countries');
            });

            $rootScope.$digest();

            expect( scope.countries[0].countryName ).toBe('United States')

		}));

	});

	describe('/countries/{country} route', function(){

		beforeEach(inject(function($controller, $rootScope) {

        	countryInfo = { 

				countryName : 'United States'

			};

			capitalInfo = {

				geonames : [

					{

						name : 'Washington, DC'

					}

				]

			};

			neighborsInfo = {

				geonames : [

					{

						countryName : 'Canada'

					}

				]

			};

            scope = $rootScope.$new();

            ctrl = $controller('countryCtrl', {

                $scope : scope,

                countryInfo : countryInfo,

                capitalInfo : capitalInfo,

                neighborsInfo : neighborsInfo

            });

        }));

		it('loads the country.html, resolves three requests for the country, and attaches the country controller',
					inject(function($location,$rootScope,$httpBackend,$rootElement,$compile){

			var view = $compile('<div ng-view></div>')($rootScope);

			$rootElement.append(view);

			$httpBackend.expectGET('./countries/country/country.html').respond('...');

			$httpBackend.whenJSONP('http://api.geonames.org/countryInfoJSON?country=US&username=drabinowitz&callback=JSON_CALLBACK').respond('...');

			$httpBackend.whenJSONP('http://api.geonames.org/searchJSON?country=US&q=capital%20of%20a%20political%20entity&username=drabinowitz&callback=JSON_CALLBACK').respond('...');
			
			$httpBackend.whenJSONP('http://api.geonames.org/neighboursJSON?country=US&username=drabinowitz&callback=JSON_CALLBACK').respond('...');

			$rootScope.$apply(function() {
                $location.path('/countries/US');
            });

            $rootScope.$digest();

            expect( scope.country.countryName ).toBe( 'United States' );

            expect( scope.capital.name ).toBe( 'Washington, DC' );

            expect( scope.neighbors[0].countryName ).toBe( 'Canada' );

		}));

	});

});