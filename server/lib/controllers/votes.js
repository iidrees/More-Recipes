import { Votes, Recipes } from '../model';
/**
 * A Votes class that allows a user to upvote or downvote a recipe
 * @export
 * @class Vote
 */
export default class Vote {
  /**
   * @static
   * @param {object} req
   * @param {object} res response object returned to the user
   * @returns {object} JSON showing success or failure of the request
   * @memberof Vote
   */
  static upVotes(req, res) {
    const id = req.params.recipeid;
    const userId = req.decoded.id;
    let voted = false;
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
            status: 'Fail',
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
          .then(vote => res.status(201).send({
            status: 'Success',
            message: `${recipe.title} has been upvoted`,
            data: {
              recipe,
              vote
            }
          }))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }


  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {object} JSON
   * @memberof Vote
   */
  static downVotes(req, res) {
    const id = req.params.recipeid;
    const userId = req.decoded.id;
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
            status: 'Fail',
            message: 'Recipe not found'
          });
        }
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
