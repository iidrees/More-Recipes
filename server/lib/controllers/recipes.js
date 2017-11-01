import model from '../model';
// import   from '../model/recipes';
const Recipe = model.Recipes;
const reviews = model.Reviews;
console.log(Recipe, reviews);
export default {
  postRecipes(req, res) {
    const { title, content } = req.body;
    const userId = req.decoded.id;
    if (!req.decoded.id) {
      return res.status(401).send({
        success: false,
        message: 'You are not authorized to post a recipe, please send your token'
      });
    }
    return Recipe
      .create({
        title,
        content,
        userId,
      })
      .then((recipes) => {
         res.status(201).send({
           success: true,
           recipe: recipes,
         });
      })
      .catch(err => res.status(400).send(err));
  }
};
