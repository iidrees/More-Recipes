// import dependencies
import express from 'express';
import fs from 'fs';
import logger from 'morgan';
import bodyParser from 'body-parser';
import newRecipe from './model/recipesService';
import { GetRecipes } from './controllers/routes/recipes';
import { PostRecipe } from './controllers/routes/recipes';


const app = express(); // initialise project

// log request to the console
app.use(logger('dev'));

const port = process.env.PORT || 5000;
// set up body-parser to parse incominf request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));


// routes
app.get('/home', (req, res) => {
  res.status(200).send({ message: 'Hello bro' });
});





app.listen(port, () => {
  console.log(app.get('env'));
  console.log(`Live on port ${port}`);
});

