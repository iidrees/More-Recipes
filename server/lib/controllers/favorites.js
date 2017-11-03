// import modules
import { Favorites, Recipes } from '../model';

/**
 * This is a Favorite class that allows a user add a favorite recipe
 */
export class Favorite {
  /**
 * Post recipe into the database
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} the JSON returned to the client as response
 */
  static addFavorites(req, res) {
    /*
      Grab values from the req object to be used for authentication
     */
    const recipeId = req.params.recipeid;
    const userId = req.decoded.id;
    console.log(recipeId, userId);
    if (!userId) {
      /*  if user not authenticated, return this response */
      return res.status(401).send({
        status: 'fail',
        message: 'You are not authorized to post a recipe, please send your token in the header'
      });
    }
    /* else, add the userid and favorite recipeid to the database */
    return Favorites
      .create({
        userId,
        recipeId,
      })
      .then((fave) => {
        return res.status(201).send({
          status: 'Success',
          message: 'Favorite recipe added',
          data: fave,
        });
      })
      .catch(err => res.status(400).send(err));
  }
}

/**
 * This is a FavoriteRecipes class that allows a user GET his favorite recipes
 */
export class FavoriteRecipes {
  /**
 * Post recipe into the database
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} the JSON returned to the client as response
 */
  static getFavorite(req, res) {
    /* Grab values from the request object */
    const id = parseInt(req.params.userid, 10);
    const userId = req.decoded.id;
    if (id !== userId) {
      /* Authenticate user */
      return res.status(401).send({
        status: 'Fail',
        message: 'You are unauthorised to view this resource',
      });
    }
    /* if user authenticated, find the user, and add the recipes they love too */
    return Favorites
      .find({
        where: {
          id,
        },
        include: [{
          model: Recipes,
          as: 'recipes'
        }]
      })
      .then((fave) => {
        return res.status(200).send({
          status: 'Success',
          message: 'This is your Favorite Recipes',
          data: fave
        });
      })
      .catch(err => res.status(400).send(err));
  }
}
