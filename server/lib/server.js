// import dependencies
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import {
  GetRecipes,
  PostRecipe,
  DelRecipe,
  PostReview,
  UpdateRecipe
} from './controllers/routes/recipes';


const app = express(); // initialise project

// log request to the console
app.use(logger('dev'));

const port = process.env.PORT || 5000;
// set up body-parser to parse incominf request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));


// routes

// Recipe Endpoint
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to the dark side!' });
});
app.get('/api/v1/recipes', (req, res) => {
  GetRecipes.getRecipes(req, res);
});
app.post('/api/v1/recipes', (req, res) => {
  PostRecipe.postRecipe(req, res);
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
  console.log(`Live on port ${port}`);
});

