// import dependencies
import express from 'express';
import 'babel-polyfill';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {
  GetRecipes,
  PostRecipe,
  DelRecipe,
  PostReview,
  UpdateRecipe
} from './controllers/routes/recipes';
import create from './controllers/user';
import postRecipe from './controllers/recipes';
import postReviews from './controllers/reviews';

const app = express(); // initialise project

// configured the dotenv command to enable protection of important links
dotenv.config();

// log request to the console
app.use(logger('dev'));

const port = process.env.PORT || 5005;

// set up body-parser to parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));


// routes

// Recipe Endpoint
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to the dark side!' });
});
app.post('/api/v1/recipes', (req, res) => {
  postRecipe.postRecipes(req, res);
});
app.get('/api/v1/recipes', (req, res) => {
  postRecipe.listAll(req, res);
});
app.put('/api/v1/recipes/:id', (req, res) => {
  postRecipe.updateRecipe(req, res);
});
app.delete('/api/v1/recipes/:id', (req, res) => {
  postRecipe.deleteRecipe(req, res);
});
app.post('/api/v1/recipes/:recipeid/reviews', (req, res) => {
  postReviews.postReviews(req, res);
});
app.post('/api/v1/users/signup', (req, res) => {
  create.signUp(req, res);
});
app.post('/api/v1/users/signin', (req, res) => {
  create.signIn(req, res);
});

// In-memory routes

app.get('/api/v1/recipes', (req, res) => {
  postRecipe.postRecipes(req, res);
});

app.post('/api/v1/recipes/:id/reviews', (req, res) => {
  PostReview.postReview(req, res);
});
app.put('/api/v1/recipes/:id', (req, res) => {
  UpdateRecipe.updateRecipe(req, res);
});

app.delete('/api/v1/recipes/:id', (req, res) => {
  DelRecipe.deleteRecipe(req, res);
});



export default app.listen(port, () => {
  console.log(app.get('env'));
// console.log(process.env);
// console.log(userCreate);
  console.log(`Live on port ${port}`);
});

