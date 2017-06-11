//define variables for API URLs
var RECIPE_SEARCH_URL ='https://api.edamam.com/search';
var BEER_SEARCH_URL = 'http://vehrenkamp.com/api/search';

//define variable for beer pairing
var beer_pairing = {
  'beef steak dinner' : "Ale",
  'chicken dinner' : "Lager",
  'fish meal': "Lager",
  'pork dinner': "Bock Beer",
  pizza: "Ale",
  'salad dinner': "Pilsner",
  'vegetarian dinner': "Wheat beer"
}

//function to generate a random number to feed into getDataFromAPI, so that API can choose a random recipe/beer
function getRandomInt(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min)) +min;
}

function renderRecipe(data) {
  $(".js-recipe-image").attr("src", data.hits[0].recipe.image);
  $(".js-recipe-url").attr("href", data.hits[0].recipe.url);
  $(".js-recipe-name").text(data.hits[0].recipe.label);
}

function renderBeer(searchTerm, data) {
	var randomBeer = getRandomInt(0,40);
		console.log(randomBeer);
		$(".js-beer-type").text(beer_pairing[searchTerm]); /* style */
		console.log(beer_pairing[searchTerm]);
		$(".js-beer-name").text(data.data[randomBeer].name);  /* name */
		if (data.data[randomBeer].labels != undefined && data.data[randomBeer].description != null) {
		console.log('image and descr found!');
			$(".js-beer-img").attr("src", data.data[randomBeer].labels.medium); /*image */
			$(".js-beer-descr").text(data.data[randomBeer].description);	/* description */
			} else {
				$(".js-beer-img").attr("src", "images/stock-beer3.jpg")
				$(".js-beer-descr").text("");
	}	
}

//define items to pull from API
function getDataFromEdamamAPI(searchTerm, callback) {
  var start = getRandomInt(1, 3);
  var end = start +1;
  var settings = {
    url: RECIPE_SEARCH_URL,
    data: {
      app_id: 'dda27a93',
      app_key: '9ed3d0d27f7f4a70c5401ffe1e64de60',	
      q: searchTerm,
      from: start,
      to: end
    },
    dataType: 'json',
    type: "GET",
      success: function(data){
        callback(data);
      }
      };
      $.ajax(settings);
}

function getDataFromBreweryDBAPI(searchTerm, callback) {
  var random_page = getRandomInt(1,2);
  var settings = {
    url: BEER_SEARCH_URL,
    data: {
      key: '3f82ffb77634f481ff4376a346fc7cd9',
      q: beer_pairing[searchTerm],
      p: random_page,
      type: "beer"
    },
    type: "GET",
      success: function(data){
        callback(searchTerm, data);
      }
      };
      $.ajax(settings);
}

function handleSubmit() {
	$('.js-button').on("click", function(e){
		var food_type = $(this).attr('value');
    	e.preventDefault();
    	getDataFromBreweryDBAPI(food_type, renderBeer);
    	getDataFromEdamamAPI(food_type, renderRecipe); 
	});
}
  
$(handleSubmit);




