import model from '../model';
// import   from '../model/recipes';
const Recipe = model.Recipes;
const reviews = model.Reviews;
console.log(Recipe, reviews);
export default {
  postRecipes(req, res) {
    const { title, content } = req.body;
    return Recipe
      .create({
        title,
        content,
      })
      .then(recipes => res.status(201).send(recipes))
      .catch(err => res.status(400).send(err));
  },
  listAll(req, res) {
    return Recipe
      .findAll({
        include: [{
          model: reviews,
          as: 'reviews',
        }],
      })
      .then((recipe) => {
        if (recipe.length === 0) {
          return res.status(200).send({
            message: 'Out of stock'
          });
        }
        return res.status(200).send(recipe);
      })
      .catch(error => res.status(400).send(error));
  },
  updateRecipe(req, res) {
    return Recipe
      .find({
        where: {
          id: parseInt(req.params.id, 10),
        }
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        return recipe
          .update({
            content: req.body.content || recipe.content
          })
          .then(updatedRecipe => res.status(200).send(updatedRecipe))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },
  deleteRecipe(req, res) {
    console.log('type of req.params.id ', typeof parseInt(req.params.id, 10));
    return Recipe
      .find({
        where: {
          id: parseInt(req.params.id, 10),
        },
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found'
          });
        }

        return recipe
          .destroy()
          .then(() => res.status(200).send({ message: 'Recipe successfully deleted' }))
          .catch(err => res.status(404).send(err));
      })
      .catch(err => res.status(404).send(err));
  }
};
