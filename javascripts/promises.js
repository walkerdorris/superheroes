requirejs.config({
	baseUrl: './javascripts',
	paths: {
		'q': '../lib/bower_components/q/q',
    	'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    	'lodash': '../lib/bower_components/lodash/lodash.min',
    	'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    	'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min'
	},
	shim: {
		'bootstrap': ['jquery']
	}
});

requirejs(
	["q", "jquery", "hbs", "bootstrap", "lodash", "get-superhero-data", "get-comic-types"],
	function(Q, $, Handlebars, bootstrap, _, superdata, comics) {
		console.log("checking get-superhero-data", superdata);
		console.log("checking get-comic-types", comics);

		var superHeroes;

		superdata.getSuperheroes()
		.then(function(superdata) {
			console.log("API call successful and responded with", superdata);
			superHeroes = superdata;
			return comics.getComicsTypes()
		})
		.then(function(comics) {
			console.log("API call successful and responded with", comics);

			comics = Object.keys (comics).map(key => types[key])
			superHeroes = Object.keys (superHeroes).map(key => superHeroes[key])

			var superheroesArray = superHeroes.map(superhero => {
				superhero.type = _.find(types, {id:superhero.class}).label;
				return superhero;
			});

			require(['hbs!../templates/batmanironman'], function(superheroTpl) {
				$("#superheroes").html(superheroTpl({superdata:superheroesArray}));
				console.log(superheroesArray);
			})
		}) 
		.fail(function(error) {
			console.log("API call failed with error", error);
		});
	});


//     var allBooks;

//   books.getBooks()
//   .then(function(books) {
//     console.log("API call successful and responded with", books);
//     allBooks = books;
//     return booktypes.getBooksTypes()
//   })
//   .then(function(types) {
//     console.log("API call successful and responded with", types);

//     types = Object.keys ( types ).map(key => types[ key ])
//     allBooks = Object.keys ( allBooks ).map(key => allBooks[ key ])

//     var booksArray = allBooks.map(book => {
//       book.type = _.find(types, { id:book.booktype }).label;
//       return book;
//     });

//     require(['hbs!../templates/books'], function(bookTpl) {
//       $("#bookList").html(bookTpl({ books:booksArray }));
//       console.log(booksArray);
//     })
//   })
//   .fail(function(error) {
//     console.log("API call failed with error", error);
//   });


// });