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

	ddescribe('/countries route', function(){

		module(function($provide){

			$provide.value('countries', function(){

				return { geonames : [{

					countryName : 'United States'

				}]};

			});

		});

        var ctrl, scope;

        beforeEach(inject(function($controller, $rootScope) {

            scope = $rootScope.$new();

            ctrl = $controller('countriesCtrl', {

                $scope : scope

            });

        }));

		it('loads the countries.html, resolves a request for countries, and attaches the countries controller',
					inject(function($location,$rootScope,$httpBackend,$rootElement,$compile){

			var view = $compile('<div ng-view></div>')($rootScope);

			$rootElement.append(view);

			$httpBackend.expectGET('./countries/countries.html').respond('...');

			$rootScope.$apply(function() {
                $location.path('/countries');
            });

            $rootScope.$digest();

            $httpBackend.flush();

            $httpBackend.verifyNoOutstandingRequest();

            expect( scope.countries[0].countryName ).toBe('United States')

		}));

	});

	describe('/countries/{country} route', function(){

		it('loads the country.html, resolves three requests for the country, and attaches the country controller',
					inject(function($location,$rootScope,$httpBackend,$rootElement,$compile){

			var view = $compile('<div ng-view></div>')($rootScope);

			$rootElement.append(view);

			$httpBackend.expectGET('./countries/country/country.html').respond('...');

			$httpBackend.whenJSONP('http://api.geonames.org/countryInfoJSON?username=drabinowitz&callback=JSON_CALLBACK').respond({});

			$rootScope.$apply(function() {
                $location.path('/countries/US');
            });

            $rootScope.$digest();

            $httpBackend.flush();

            $httpBackend.verifyNoOutstandingRequest();

		}));

	});

});