import { Reviews } from '../model';
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
    /* Grab values from the request object for authentication */
    const id = req.params.recipeid;
    const userId = req.decoded.id;
    const { content } = req.body;
    if (!userId) {
      /* if not authenticated, user will not be allowed access to resource */
      return res.status(401).send({
        success: false,
        message: 'You are not authorized to post a review, please send your token in the header'
      });
    }
    /* When user is authenticated, reviews is created in the database */
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
  
  static editReviews(req, res) {
    /* Grab values from the request object for authentication */
    const id = req.params.recipeid;
    const reviewsId = req.params.id;
    const userId = req.decoded.id;
    const { content } = req.body;
    if (!userId) {
      /* if not authenticated, user will not be allowed access to resource */
      return res.status(401).send({
        success: false,
        message: 'You are not authorized to post a review, please send your token in the header'
      });
    }
    return Reviews
      .find({
        where: {
          recipeId: id,
          id: reviewsId
        }
      })
      .then((review) => {
        if (!review) {
          return res.status(404).send({
            status: 'Fail',
            message: 'Review Not Found'
          });
        }
        return review
          .update({
            content: content || Review.content
          })
          .then(newReviews => res.status(201).send({
            status: 'Success',
            Message: 'Reviews updated',
            data: newReviews
          }))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }

}
