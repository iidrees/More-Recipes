import model from '../model';

const Recipe = model.Recipes
const Reviews = model.Reviews;

console.log(Reviews);
export default {
  postReviews(req, res) {
    const id = req.params.recipeid;
    const { content } = req.body;
    console.log(id, content);
    res.status(200).send({ message: 'Reviews posted' });
    return Reviews
  }

}