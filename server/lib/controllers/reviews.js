import { Reviews } from '../model';
/**
 * This is a Reviews class that allows a user post a review to a recipe
 * @export
 * @class Review
 */
export default class Review {
/**
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON -the JSON returned to the client as response
 * @return {object} Reviews - returns the reviews added to a recipe 
 * @static
 * @memberof Review
 */
  static postReviews(req, res) {
    /* Grab values from the request object for authentication */
    const id = req.params.recipeid;
    const userId = req.decoded.id;
    const { content } = req.body;
    console.log('this is the ID and content', id, content);
    /* When user is authenticated, reviews is created in the database */
    return Reviews
      .create({
        content,
        recipeId: id
      })
      .then((review) => {
        res.status(201).send({
          status: 'Success',
          message: 'Review has been added',
          data: review
        });
      })
      .catch(() => res.status(400).send({
        status: 'Fail',
        message: 'Please enter the correct recipe ID'
      }));
  }

  /**
   *  This is a method that allows a review to be edited
   * @static
   * @param {any} req
   * @param {any} res
   * @return {object} JSON
   * @memberof Review
   */
  static editReviews(req, res) {
    /* Grab values from the request object for authentication */
    const id = req.params.recipeid;
    const reviewsId = req.params.id;
    const { content } = req.body;
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
            content: content || Reviews.content
          })
          .then(newReviews => res.status(201).send({
            status: 'Success',
            message: 'Reviews updated',
            data: newReviews
          }));
      })
      .catch(() => res.status(400).send({
        status: 'Fail',
        message: 'Please enter the correct recipe ID and Review ID'
      }));
  }

}
