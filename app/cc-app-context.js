angular.module('ccAppContext',[]).

	factory('ccCurrentCountry',[function(){

		var country;

		return {

			set : function(currentCountry){

				country = currentCountry;

				return true;

			},

			get : function(){

				return country;

			}

		};

	}])