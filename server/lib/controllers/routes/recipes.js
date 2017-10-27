// create my major routes here and export out to be used in the server
import fs from 'fs';


/**
 * A class that gets recipes and returns recipes
 * @constructor
 * @return {object} of json objects.
 */
export class GetRecipes {
  /**
   * stores recipes from the RecipeService
   * @override
   */
  static getRecipes(req, res) {
    fs.readFile('recipe.json', (err, data) => {
      if (err) throw err;
      const rec = JSON.parse(data);
      console.log(rec);
      res.send(rec);
    });
    console.log('This is right under the fs system');
  }
}

// POST Class

export class PostRecipe {
  static postRecipe(req, res) {
    console.log(req.body.name);

    const newRecipe = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
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
    };
    fs.readFile('recipe.json', (err, data) => {
      if (err) {
        console.log(err);
      }
      const newRec = JSON.parse(data);
      newRec.push(newRecipe);
      const json = JSON.stringify(newRec, null, 2);
      fs.writeFile('recipe.json', json, (err) => {
        if (err) throw err;
        res.status(201).send(json);
      });
    });
  }
}

// DELETE Class
export class DelRecipe {
  static deleteRecipe(req, res) {
    const id = req.params.id;
    console.log(id);
    fs.readFile('recipe.json', (err, data) => {
      if (err) throw err;
      const obj = JSON.parse(data);
      for (let i = 0; i < obj.length; i += 1) {
        if (id === obj[i].id) {
          obj.splice(i, 1);
          const json = JSON.stringify(obj, null, 2);
          fs.writeFile('recipe.json', json, (err) => {
            if (err) throw err;
            res.status(204).send({ message: 'Recipe Deleted' });
          });
        }
      }
    });
  }
}


