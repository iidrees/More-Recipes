import { model } from '../model';

const { Votes, Recipes } = model;
const voted = true;
export default {
  makeVotes(req, res) {
    const recipeId = req.params.recipeid;
    const userId = req.decoded.id;
    if (userId) {
      return res.status(401).send({
        success: false,
        message: 'You are not authorized to post a recipe, please send your token in the header'
      });
    }
    return Votes
      .find({
        where: {
          userId
        }
      })
      .then((vote) => {
        if (vote) {
          return res.status(204).send({
            message: 'You have voted for this recipe'
          });
        }
        Votes
          .create({
            userId,
            recipeId,
            voted,
          })
          .then((votes) => {
            res.status(201).send({
              success: true,
              votes,
            });
          })
          .catch(err => res.status(400).send(err));
      });
  }
};
