import { Recipe, Reviews } from '../model';
/**
 * This is a Reviews class that allows a user post a review to a recipe
 */
export default class Review {
  /**
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON -the JSON returned to the client as response
 * @return {object} Reviews - returns the reviews added to a recipe
 */
  static postReviews(req, res) {
    const id = req.params.recipeid;
    const userId = req.decoded.id;
    const { content } = req.body;
    if (!userId) {
      return res.status(401).send({
        success: false,
        message: 'You are not authorized to post a review, please send your token in the header'
      });
    }
    return Reviews
      .create({
        content,
        recipeId: id
      })
      .then((review) => {
        res.status(201).send({
          success: true,
          review,
        });
      })
      .catch(err => res.status(400).send(err));
  }
}
