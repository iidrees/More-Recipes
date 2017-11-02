import { Votes, Recipes } from '../model';


const voted = false;
export default {
  makeUpVotes(req, res) {
    const recipeId = req.params.recipeid;
    const userId = req.decoded.id;
    if (!userId) {
      return res.status(401).send({
        success: false,
        message: 'You are not authorized to post a recipe, please send your token in the header'
      });
    }
    return Votes
      .find({
        where: {
          userId,
          recipeId,
          voted: true
        }
      })
      .then((recipe) => {
        if (recipe) {
          return res.status(200).send({
            message: 'You have voted for this recipe',
            data: recipe,
          });
        }
        Votes
          .create({
            userId,
            recipeId,
            voted,
          })
          .then((votes) => {
            Recipes.increment(upvotes);
            res.status(201).send({
              status: 'Success',
              votes,
            });
          })
          .catch(err => res.status(400).send(err));
      });
  }
};
