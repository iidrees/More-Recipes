// create my major routes here and export out to be used in the server
import fs from 'fs';


/**
 * A class that gets recipes and returns it
 * @constructor
 * @return {object} of json objects.
 * 
 */
export class GetRecipes {
  /**
   * stores recipes from the RecipeService
   */
  static getRecipes(req, res) {

    fs.readFile('recipe.json', (err, data) => {
      if (err) throw err;
      let rec = JSON.parse(data);
      console.log(rec);
      res.send(rec);
    });
    console.log('This is right under the fs system');
  }
}



// PORT Class

export class PostRecipe {
  static postRecipe(req, res) {
      console.log(req.body.name);

      let newRecipe = {
      id : req.body.id,
      name: req.body.name,
      email : req.body.email,
      createdAt: new Date(),
      recipeTitle: req.body.recipetitle,
      recipes: [{
        steps: req.body.steps
      }],
      reviews: [{
        user1: req.body.reviews,
        user2: req.body.reviews
      }],
      upvotes: req.body.upvotes
    }
    
    fs.readFile('recipe.json', (err, data) => {
      if (err) throw err;
      const rec = JSON.parse(data);
      //const arrRec = [];
      //arrRec = rec;

      console.log(newRecipe);
      const newData = JSON.stringify(newRecipe, null, 2)
      //arrRec.push(newData);
      console.log('New data turned to JSON', newData);
      fs.writeFile('recepe.json', newData, (err) => {
        if (err) throw err;
        res.status(201).send(newData);
      });
    });
  }
}


