import { Votes, Recipes } from '../model';
/*
  A Votes class that allows a user to upvote or downvote a recipe
 */
export default class Vote {
  static upVotes(req, res) {
    const id = req.params.recipeid;
    const userId = req.decoded.id;
    let voted = false;
    if (!userId) {
      return res.status(401).send({
        success: false,
        message: 'You are not authorized to do this.'
      });
    }
    return Recipes
      .find({
        where: {
          userId,
          id
        }
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe not found',
            data: recipe,
          });
        }
        recipe.increment('upVotes', { by: 1 });
        voted = true;
        return Votes // need re-migrate table again in order to test this elaborately
          .create({
            userId,
            recipeId: id,
            voted,
          })
          .then((vote) => {
            return res.status(201).send({
              status: 'Success',
              message: `${recipe.title} has been upvoted`,
              data: {
                recipe,
                vote
              }
            });
            // console.log('the votes', vote);
          })
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }

  static downVotes(req, res) {
    const id = req.params.recipeid;
    const userId = req.decoded.id;
    if (!userId) {
      return res.status(401).send({
        success: false,
        message: 'You are not authorized to do this.'
      });
    }
    return Recipes
      .find({
        where: {
          userId,
          id
        }
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe not found',
            data: recipe,
          });
        }
        // recipe.decrement('upVotes', { by: 1 });
        recipe.decrement('downVotes', { by: 1 });
        return res.status(201).send({
          status: 'Success',
          message: `${recipe.title} has been downvoted`,
          data: recipe,
        });
      })
      .catch(err => res.status(400).send(err));
  }
}
