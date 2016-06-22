
(function(){

	'use strict';

	angular
		.module('starwars')
		.factory('movieServices', movieServices);

	movieServices.$inject = ['$http', '$q', '$rootScope'];
	
	//Factory Purpose: Handles extrapolation of movie data
	function movieServices($http, $q, $rootScope){
		var services = {
			clearMovies		 : 	clearMovies,
			extractMovies	 : 	extractMovies,
			extractNameURL	 : 	extractNameURL,
			extractTitles	 : 	extractTitles,
			getCharacterData : 	getCharacterData,
			getMovieData	 : 	getMovieData,
			getMovies 		 : 	getMovies
		};

		return services;

//------SERVICES------------------------------------------------------------------
		//describe("A function to clear the movieTitle array")
		//it("should check for nonempty array and pop();")
		//expect(model.characters.movieTitles).toBeEmptyArray;
		function clearMovies(movies, dates) {
			while (movies.valueOf()!="") {
				movies.pop();
				dates.pop();
			}
		};

		//describe("A function to fill the name_url array with obj{name: name, url: url}")
		//it("should push obj into name_url array;")
		//expect(model.characters.name_url).toBeArrayOfObjects;
		function extractNameURL(name_url) {
			var charJSON = $http.get("mock/characters.json")
				.then(function (response) {
					var characters = response.data.characters;
					for(var character in characters){
						name_url.push(characters[character]);
					}
				},
				function (response) {
					console.error("Response: ", response.statusText);
				});
		};

//Tightly Coupled ===
		//describe("A function to fetch character data from server")
		//it("should return an array and a promise object;")
		//expect(movieData.films).toBeArrayOfStrings
		function getCharacterData(movieTitles, url, releaseDate) {
			getMovieData(url, movieTitles, releaseDate)
				.then(function (movieData) {
					return extractMovies(movieData.films);
				})
				.then(function (movieArray) {
					return extractTitles(movieArray, movieTitles, releaseDate);
				});
		};

		//describe("A function to fill var movieArray with the name of films")
		//it("should return an array of strings;")
		//expect(movieArray).toBeArrayOfStrings
		function extractMovies(films) {
			var movieArray = []
			for(var film in films){
				movieArray.push(films[film])
			}
			return movieArray
		};

		//describe("A function to fetch movie titles and fill var model.characters.movieTitles with the titles
		// and model.characters.releaseDate with dates")
		//it("should return an array of strings;")
		//expect(model.characters.movieTitles).toBeArrayOfStrings
		//expect(model.characters.movieTitles).toBeDate
		function extractTitles(movieArray, movieTitles, releaseDate) {
			var promises = [];
			for(var title in movieArray){
				promises.push($http.get(movieArray[title]));
			}

			$q.all(promises)
				.then(function (films) {
					for(var film in films){
						movieTitles.push(films[film].data.title);
						releaseDate.push(films[film].data.release_date);
					}
				},
				function (response) {
					console.error("Response: ", response.statusText);
				});
		}
			
		
//<=================
		//describe("A function to fetch movie data from server and return non empty object
		//it("should return object with properties: film as array, data as object ")
		//expect(obj).toBeNonEmptyObject
		function getMovieData(url, movieTitles, releaseDate) {
			return $http.get(url)
				.then(function (response) {
						console.log(response);
						return {
							"films": response.data.films,
							"data" : response.data
						}
					},
					function (response) {
						movieTitles.push("Sorry! No Information is currently available for this Character");
						releaseDate.push("Unavailable")
					});
		};

		//describe("A callback function to ng-click in partials/movieTemplate.html
		//it("should be a callback function")
		//expect(clearMovies).toBeAFunction
		//expect(getCharacterData).toBeAFunction
		function getMovies(movieTitles,url, releaseDate) {
			clearMovies(movieTitles, releaseDate);
			getCharacterData(movieTitles, url, releaseDate);
			triggerModal();

		};

		function triggerModal() {
			$('.btn-hide').trigger('click');
		}
	};
//---------End of Services------------------------------------------------------
})()
