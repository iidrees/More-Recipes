import { Favorites, Recipes } from '../model';

export class Favorite {
  static addFavorites(req, res) {
    const recipeId = req.params.recipeid;
    const userId = req.decoded.id;
    console.log(recipeId, userId);
    if (!userId) {
      return res.status(401).send({
        status: 'fail',
        message: 'You are not authorized to post a recipe, please send your token in the header'
      });
    }
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

export class FavoriteRecipes {
  static getFavorite(req, res) {
    const id = parseInt(req.params.userid, 10);
    const userId = req.decoded.id;
    if (id !== userId) {
      return res.status(401).send({
        status: 'Fail',
        message: 'You are unauthorised to view this resource',
      });
    }
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