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
        message: 'You are not authorized to post a recipe, please send your token in the header'
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
          return res.status(204).send({
            message: 'No Recipe available, please enter a recipe.'
          });
        }
        return res.status(200).send(recipe);
      })
      .catch(error => res.status(400).send(error));
  },
  updateRecipe(req, res) {
    const userId = req.decoded.id;
    if (!req.decoded.id) {
      return res.status(401).send({
        success: false,
        message: 'You are not authorized to post a recipe, please send your token in the header'
      });
    }
    return Recipe
      .find({
        where: {
          id: parseInt(req.params.id, 10),
          userId: userId
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
    const userId = req.decoded.id;
    if (!req.decoded.id) {
      return res.status(401).send({
        success: false,
        message: 'You are not authorized to post a recipe, please send your token in the header or Signup for an account to post a recipe'
      });
    }
    // console.log('type of req.params.id ', typeof parseInt(req.params.id, 10));
    return Recipe
      .find({
        where: {
          id: parseInt(req.params.id, 10),
          userId: userId
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
