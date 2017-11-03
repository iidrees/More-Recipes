'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

require('babel-polyfill');

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _user = require('./controllers/user');

var _recipes = require('./controllers/recipes');

var _reviews = require('./controllers/reviews');

var _reviews2 = _interopRequireDefault(_reviews);

var _auth = require('./auth/auth');

var _auth2 = _interopRequireDefault(_auth);

var _votes = require('./controllers/votes');

var _votes2 = _interopRequireDefault(_votes);

var _favorites = require('./controllers/favorites');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); // initialise project

// configured the dotenv command to enable storage in the environment
// import dependencies
_dotenv2.default.config();

// log request to the console
app.use((0, _morgan2.default)('dev'));

// Application port
var port = process.env.PORT || 5000;

// set up body-parser to parse incoming request data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json({ type: 'application/json' }));

/* routes */

/* Recipe Endpoint */
app.get('/api/v1/home', function (req, res) {
  res.status(200).send({
    status: 'Success',
    message: 'Welcome To The More-Recipes API!'
  });
});

// Signup and Signin (Authentication) endpoints
app.post('/api/v1/users/signup', _user.UserSignup.signUp);
app.post('/api/v1/users/signin', _user.UserSignin.signIn);

// jwt middleware to verify users trying yo hit other endpoints

app.use(_auth2.default.verifyUser);

/**
 * Recipes endpoints requiring authentication before getting access
 *to different points of the application
 */
app.get('/api/v1/recipes', _recipes.RecipeList.listAll);
app.post('/api/v1/recipes', _recipes.Recipes.postRecipes);
app.post('/api/v1/recipes/:recipeid/reviews', _reviews2.default.postReviews);
app.put('/api/v1/recipes/:id', _recipes.RecipeUpdate.updateRecipe);
app.delete('/api/v1/recipes/:id', _recipes.RecipeDelete.deleteRecipe);
app.post('/api/v1/recipes/:recipeid/votes', _votes2.default.makeUpVotes);
app.post('/api/v1/recipes/:recipeid/addfavorite', _favorites.Favorite.addFavorites);
app.get('/api/v1/users/:userid/recipes', _favorites.FavoriteRecipes.getFavorite);

// Start server on port 5000
exports.default = app.listen(port, function () {
  console.log(app.get('env'));
  console.log('Live on port ' + port);
});