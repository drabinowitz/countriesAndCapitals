var viewsModule = angular.module('ccAppViews', ['ngRoute','ngAnimate','ccLibrary','ccAppContext']);

	viewsModule.factory('publisher',['$rootScope',function($rootScope){

		return {

			broadcast : function(event,args){

				$rootScope.$broadcast(event,args)

			}

		}

	}]);