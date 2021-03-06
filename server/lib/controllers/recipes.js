// import Modules
import { Recipes, Reviews, Favorites } from '../model';


/**
 * This is a Recipes class that allows you POST a recipe
 */
export class Recipe {
  /**
 * Post recipe into the database
 * @static
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} the JSON returned to the client as response
 * @memberof Recipe
  */
  static postRecipes(req, res) {
    // grab values from the req object
    const { title, content } = req.body;
    const userId = req.decoded.id;
    /* When user is authenticated, we store data into the database */
    return Recipes
      .create({
        title,
        content,
        userId,
      })
      .then((recipes) => {
        res.status(201).send({
          status: 'Success',
          message: 'Recipe added',
          recipe: recipes,
        });
      })
      .catch(err => res.status(400).send(err));
  }
}

/**
 * This is a Recipes class that allows you get all recipes a user has posted
 * @export listAll method
 * @class RecipeList
 */
export class RecipeList {
  /**
 * parse values from the req.body & req.decoded
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @returns {object} JSON -The JSON returned to the client as response containing all recipes
 * and reviews
 * @static
 * @memberof RecipeList
 */
  static listAll(req, res) {
    /* Get all recipes with most votes in descending order from the database */
    const { sort, order } = req.query;
    if (sort === 'upvotes' && order === 'desc') {
      /* Find all recipes with upVotes property and returns them in descending order */
      return Recipes
        .findAll({
          order: [['upVotes', 'DESC']]
        })// if no upVotes is found it returns an error
        .then((upvotes) => {
          if (!upvotes) {
            return res.status(404).send({
              status: 'Fail',
              message: 'No upvotes found',
              data: upvotes
            });
          }
          /* Returns a JSON array objects in descending
          order based on the most upvotes */
          return res.status(200).send({
            status: 'Success',
            message: 'Upvotes found and displayed in descending order',
            data: upvotes
          });
        })
        .catch(err => res.status(400).send(err));
    }
    /* Get all recipes */
    return Recipes
      .findAll({
        include: [
          {
            model: Reviews,
            as: 'reviews',
          },
          {
            model: Favorites,
            as: 'favorites',
          }
        ],
      })
      .then((recipe) => {
        /* Checks if db is empty and returns a notice to enter a recipe */
        if (recipe.length === 0) {
          return res.status(400).send({
            status: 'Fail',
            message: 'No Recipe available, please enter a recipe.',
            data: recipe
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'Recipes below',
          data: recipe
        });
      })
      .catch(error => res.status(400).send(error));
  }
}


/**
 * This is a Recipes class that allows you to update a recipe
 * @exports updateRecipe method
 * @class RecipeUpdate
 */
export class RecipeUpdate {
  /**
 * parse values from the req.body & req.decoded
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object|JSON|array} - JSON is returned signifying success or failr of
 *                              the modified recipe.
 * @static
 * @memberof RecipeUpdate
 */
  static updateRecipe(req, res) {
    /* Grab values to be used to authenticate from the request object */
    const userId = req.decoded.id;
    
    /* Finds a recipe to be updated */
    return Recipes
      .find({
        where: {
          id: parseInt(req.params.id, 10),
          userId,
        }
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            status: 'Fail',
            message: 'Recipe Not Found',
            data: recipe
          });
        }
        /* Updates the recipe and returns the updated recipe */
        return recipe
          .update({
            title: req.body.title || recipe.title,
            content: req.body.content || recipe.content
          })
          .then(updatedRecipe => res.status(200).send({
            status: 'Success',
            message: 'Recipe updated successfully',
            data: updatedRecipe
          }));
        // .catch(err => res.status(400).send(err));
      })
      .catch(() => res.status(400).send({
        status: 'Fail',
        message: 'Please enter a number representing the recipe'
      }));
  }
}

/**
 * This is a Recipes class that allows you to delete a recipe
 * @export deleteRecipe method
 * @class RecipeDelete
 */
export class RecipeDelete {
/**
 * parse values from the req.body & req.decoded to be used to delete the recipe
 * @static
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON object notifying the success of the delete request
 * @memberof RecipeDelete
 */
  static deleteRecipe(req, res) {
    /* Checks if user is authenticated */
    const userId = req.decoded.id;
    
    /* if authenticated, we find the recipe we want to delete */
    return Recipes
      .find({
        where: {
          id: parseInt(req.params.id, 10),
          userId,
        },
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            status: 'Fail',
            message: 'Recipe Not Found'
          });
        }
        /* Then we delete the recipe */
        return recipe
          .destroy()
          .then(() => res.status(200).send({
            status: 'Success',
            message: 'Recipe successfully deleted'
          }));
        // .catch(err => res.status(404).send(err));
      })
      .catch(() => res.status(404).send({
        status: 'Fail',
        message: 'Please enter a number'
      }));
  }
}

