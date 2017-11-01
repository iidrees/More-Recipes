import model from '../model';

const Recipe = model.Recipes
const Reviews = model.Reviews;

console.log(Reviews);
export default {
  postReviews(req, res) {
    const id = req.params.recipeid;
    const { content } = req.body;
    console.log(id, content);
    // res.status(200).send({ message: 'Reviews posted' });
    return Reviews
      .find({
        where:{
          id: parseInt(id, 10),
        }
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }
        return recipe
          .create({
            content,
          })
          .then(reviews => res.status(200).send({ message: 'Reviews posted successfully'}))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }

}