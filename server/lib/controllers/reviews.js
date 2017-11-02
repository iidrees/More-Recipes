import model from '../model';

const Recipe = model.Recipes
const Reviews = model.Reviews;
// add relationship between user and reviews so its easy to map who posted what.
console.log(Reviews);
export default {
  postReviews(req, res) {
    const id = req.params.recipeid;
    const userId = req.decoded.id;
    const { content } = req.body;
    console.log(id, content);
    // res.status(200).send({ message: 'Reviews posted' });
    if (!userId) {
      return res.status(401).send({
        success: false,
        message: 'You are not authorized to post a review, please send your token in the header'
      });
    }
    return Reviews
      .create({
        content: content,
        recipesId: id
      })
      .then((review) => {
         res.status(201).send({
           success: true,
           review: review,
         });
      })
      .catch(err => res.status(400).send(err));
  }

}