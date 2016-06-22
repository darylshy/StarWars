(function(){

	var app = angular.module('starwars');

		//abstract controller
	function controller($http, movieServices) {
		var model = this;
		model.characters = {};
		model.characters.name_url = [];
		model.getCharName = function () {
			console.log(model.characters.name_url[0]);
		}

		//Add whatever movie info you need here and add an extra parameter to the movieServices.getCharacterData() function in movieServices
		model.characters.movieTitles = [];
		model.characters.releaseDate = [];
		model.getMovies = movieServices.getMovies.bind(movieServices);

		//Gets character names and renders them to the view
		model.$onInit = function () {
			movieServices.extractNameURL(model.characters.name_url);
		};//end of $onInit
		//register component
	};

	app.component('starwarsMovie', {
		templateUrl: "partials/mainTemplate.html",
		controllerAs: 'vm', 
		controller: ['$http','movieServices', '$rootScope', controller]
	});
	
})()