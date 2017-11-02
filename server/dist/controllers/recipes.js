'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipeDelete = exports.RecipeUpdate = exports.RecipeList = exports.Recipes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('../model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import   from '../model/recipes';
var Recipe = _model2.default.Recipes;
var Reviews = _model2.default.Reviews;
var Favorites = _model2.default.Favorites;

/**
 * This is a Recipes class that allows you POST a recipe
 */

var Recipes = exports.Recipes = function () {
  function Recipes() {
    _classCallCheck(this, Recipes);
  }

  _createClass(Recipes, null, [{
    key: 'postRecipes',

    /**
    * Post recipe into the database
    * @param {object} req - The request object from the client
    * @param {object} res - The response object to the client
    * @return {object} the JSON returned to the client as response
    */
    value: function postRecipes(req, res) {
      var _req$body = req.body,
          title = _req$body.title,
          content = _req$body.content;

      var userId = req.decoded.id;
      if (!req.decoded.id) {
        return res.status(401).send({
          success: false,
          message: 'You are not authorized to post a recipe, please send your token in the header'
        });
      }
      return Recipe.create({
        title: title,
        content: content,
        userId: userId
      }).then(function (recipes) {
        res.status(201).send({
          success: true,
          recipe: recipes
        });
      }).catch(function (err) {
        return res.status(400).send(err);
      });
    }
  }]);

  return Recipes;
}();

/**
 * This is a Recipes class that allows you get all recipes a user has posted
 */


var RecipeList = exports.RecipeList = function () {
  function RecipeList() {
    _classCallCheck(this, RecipeList);
  }

  _createClass(RecipeList, null, [{
    key: 'listAll',

    /**
    * parse values from the req.body & req.decoded
    * @param {object} req - The request object from the client
    * @param {object} res - The response object to the client
    * @return {object} JSON -The JSON returned to the client as response containing all recipes
    * and reviews
    */
    value: function listAll(req, res) {
      return Recipe.findAll({
        include: [{
          model: Reviews,
          as: 'reviews'
        }, {
          model: Favorites,
          as: 'favorites'
        }]
      }).then(function (recipe) {
        if (recipe.length === 0) {
          return res.status(200).send({
            message: 'No Recipe available, please enter a recipe.'
          });
        }
        return res.status(200).send(recipe);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }]);

  return RecipeList;
}();

/**
 * This is a Recipes class that allows you to update a recipe
 */


var RecipeUpdate = exports.RecipeUpdate = function () {
  function RecipeUpdate() {
    _classCallCheck(this, RecipeUpdate);
  }

  _createClass(RecipeUpdate, null, [{
    key: 'updateRecipe',

    /**
    * parse values from the req.body & req.decoded
    * @param {object} req - The request object from the client
    * @param {object} res - The response object to the client
    * @return {object} JSON -The JSON returned to the client as response containing
    * the modified recipe.
    */
    value: function updateRecipe(req, res) {
      var userId = req.decoded.id;
      if (!req.decoded.id) {
        return res.status(401).send({
          success: false,
          message: 'You are not authorized to post a recipe, please send your token in the header'
        });
      }
      return Recipe.find({
        where: {
          id: parseInt(req.params.id, 10),
          userId: userId
        }
      }).then(function (recipe) {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found'
          });
        }
        return recipe.update({
          content: req.body.content || recipe.content
        }).then(function (updatedRecipe) {
          return res.status(200).send(updatedRecipe);
        }).catch(function (err) {
          return res.status(400).send(err);
        });
      }).catch(function (err) {
        return res.status(400).send(err);
      });
    }
  }]);

  return RecipeUpdate;
}();

/**
 * This is a Recipes class that allows you to delete a recipe
 */


var RecipeDelete = exports.RecipeDelete = function () {
  function RecipeDelete() {
    _classCallCheck(this, RecipeDelete);
  }

  _createClass(RecipeDelete, null, [{
    key: 'deleteRecipe',

    /**
     * parse values from the req.body & req.decoded to be used to delete the recipe
     * @param {object} req - The request object from the client
     * @param {object} res - The response object to the client
     * @return {object} JSON
     */
    value: function deleteRecipe(req, res) {
      var userId = req.decoded.id;
      if (!req.decoded.id) {
        return res.status(401).send({
          success: false,
          message: 'You are not authorized to post a recipe, please send your token in the header or Signup for an account to post a recipe'
        });
      }
      return Recipe.find({
        where: {
          id: parseInt(req.params.id, 10),
          userId: userId
        }
      }).then(function (recipe) {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found'
          });
        }
        return recipe.destroy().then(function () {
          return res.status(200).send({ message: 'Recipe successfully deleted' });
        }).catch(function (err) {
          return res.status(404).send(err);
        });
      }).catch(function (err) {
        return res.status(404).send(err);
      });
    }
  }]);

  return RecipeDelete;
}();