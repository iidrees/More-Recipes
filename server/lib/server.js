// import dependencies
import express from 'express';
import 'babel-polyfill';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { UserSignup, UserSignin } from './controllers/user';
import { Recipe, RecipeList, RecipeUpdate, RecipeDelete } from './controllers/recipes';
import Review from './controllers/reviews';
import auth from './auth/auth';
import Votes from './controllers/votes';
import { Favorite, FavoriteRecipes } from './controllers/favorites';

const app = express(); // Application is Initialised

// configured the dotenv command to enable storage in the environment
dotenv.config();

// log request to the console
app.use(logger('dev'));

// Application port
const port = process.env.PORT || 5005;

// set up body-parser to parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));


/* routes */

/* Recipe Endpoint */
app.get('/api/v1/home', (req, res) => {
  res.status(200).send({
    status: 'Success',
    message: 'Welcome To The More-Recipes API!'
  });
});

// Signup and Signin (Authentication) endpoints
app.post('/api/v1/users/signup', UserSignup.signUp);
app.post('/api/v1/users/signin', UserSignin.signIn);

// Everyone should be able to see all recipes
app.get('/api/v1/recipes', RecipeList.listAll);

// jwt middleware to verify users trying yo hit other endpoints
app.use(auth.verifyUser);

/**
 * Recipes endpoints requiring authentication before getting access
 *to different points of the application
 */

app.post('/api/v1/recipes', Recipe.postRecipes);
app.put('/api/v1/recipes/:id', RecipeUpdate.updateRecipe);
app.delete('/api/v1/recipes/:id', RecipeDelete.deleteRecipe);
app.post('/api/v1/recipes/:recipeid/reviews', Review.postReviews);
app.put('/api/v1/recipes/:recipeid/:id/reviews', Review.editReviews);
app.post('/api/v1/recipes/:recipeid/addfavorite', Favorite.addFavorites);
app.get('/api/v1/users/:userid/recipes', FavoriteRecipes.getFavorite);
app.post('/api/v1/recipes/:recipeid/upvotes', Votes.upVotes);
app.post('/api/v1/recipes/:recipeid/downvotes', Votes.downVotes);


logger('dev');
console.log('we are live on port', port);
// Start server on port 5000
export default app.listen(port);

