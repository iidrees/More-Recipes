'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FavoriteRecipes = exports.Favorite = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('../model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Favorite = exports.Favorite = function () {
  function Favorite() {
    _classCallCheck(this, Favorite);
  }

  _createClass(Favorite, null, [{
    key: 'addFavorites',
    value: function addFavorites(req, res) {
      var recipeId = req.params.recipeid;
      var userId = req.decoded.id;
      console.log(recipeId, userId);
      if (!userId) {
        return res.status(401).send({
          status: 'fail',
          message: 'You are not authorized to post a recipe, please send your token in the header'
        });
      }
      return _model.Favorites.create({
        userId: userId,
        recipeId: recipeId
      }).then(function (fave) {
        return res.status(201).send({
          status: 'Success',
          message: 'Favorite recipe added',
          data: fave
        });
      }).catch(function (err) {
        return res.status(400).send(err);
      });
    }
  }]);

  return Favorite;
}();

var FavoriteRecipes = exports.FavoriteRecipes = function () {
  function FavoriteRecipes() {
    _classCallCheck(this, FavoriteRecipes);
  }

  _createClass(FavoriteRecipes, null, [{
    key: 'getFavorite',
    value: function getFavorite(req, res) {
      var id = parseInt(req.params.userid, 10);
      var userId = req.decoded.id;
      if (id !== userId) {
        return res.status(401).send({
          status: 'Fail',
          message: 'You are unauthorised to view this resource'
        });
      }
      return _model.Favorites.find({
        where: {
          id: id
        },
        include: [{
          model: _model.Recipes,
          as: 'recipes'
        }]
      }).then(function (fave) {
        return res.status(200).send({
          status: 'Success',
          message: 'This is your Favorite Recipes',
          data: fave
        });
      }).catch(function (err) {
        return res.status(400).send(err);
      });
    }
  }]);

  return FavoriteRecipes;
}();