// create my major routes here and export out to be used in the server
import fs from 'fs';


/**
 * A class that gets recipes and returns it
 * @constructor
 * @return {array} of json objects.
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


