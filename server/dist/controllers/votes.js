'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('../model');

var voted = false;
exports.default = {
  makeUpVotes: function makeUpVotes(req, res) {
    var recipeId = req.params.recipeid;
    var userId = req.decoded.id;
    if (!userId) {
      return res.status(401).send({
        success: false,
        message: 'You are not authorized to post a recipe, please send your token in the header'
      });
    }
    return _model.Votes.find({
      where: {
        userId: userId,
        recipeId: recipeId,
        voted: true
      }
    }).then(function (recipe) {
      if (recipe) {
        return res.status(200).send({
          message: 'You have voted for this recipe',
          data: recipe
        });
      }
      _model.Votes.create({
        userId: userId,
        recipeId: recipeId,
        voted: voted
      }).then(function (votes) {
        _model.Recipes.increment(upvotes);
        res.status(201).send({
          status: 'Success',
          votes: votes
        });
      }).catch(function (err) {
        return res.status(400).send(err);
      });
    });
  }
};