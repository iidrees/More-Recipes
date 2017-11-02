// import dependencies
import express from 'express';
import 'babel-polyfill';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { UserSignup, UserSignin } from './controllers/user';
import { Recipes, RecipeList, RecipeUpdate, RecipeDelete } from './controllers/recipes';
import postReviews from './controllers/reviews';
import auth from './auth/auth';


const app = express(); // initialise project

// configured the dotenv command to enable storage in the environment
dotenv.config();

// log request to the console
app.use(logger('dev'));

// Application port
const port = process.env.PORT || 5000;

// set up body-parser to parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));


/* routes */

/* Recipe Endpoint */
app.get('/api/v1/', (req, res) => {
  res.status(200).send({
    status: 'Success',
    message: 'Welcome To The More-Recipes API!'
  });
});

// Signup and Signin (Authentication) endpoints
app.post('/api/v1/users/signup', UserSignup.signUp);
app.post('/api/v1/users/signin', UserSignin.signIn);

/**
 * Recipes endpoints requiring authentication before getting access
 *to different points of the application
 */
app.get('/api/v1/recipes', auth.verifyUser, RecipeList.listAll);
app.post('/api/v1/recipes', auth.verifyUser, Recipes.postRecipes);
app.post('/api/v1/recipes/:recipeid/reviews', auth.verifyUser, postReviews.postReviews);
app.put('/api/v1/recipes/:id', auth.verifyUser, RecipeUpdate.updateRecipe);
app.delete('/api/v1/recipes/:id', auth.verifyUser, RecipeDelete.deleteRecipe);


// Start server on port 5000
export default app.listen(port, () => {
  console.log(app.get('env'));
  console.log(`Live on port ${port}`);
});

