'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('../model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is a Reviews class that allows a user post a review to a recipe
 */
var Review = function () {
  function Review() {
    _classCallCheck(this, Review);
  }

  _createClass(Review, null, [{
    key: 'postReviews',

    /**
    * @param {object} req - The request object from the client
    * @param {object} res - The response object to the client
    * @return {object} JSON -the JSON returned to the client as response
    * @return {object} Reviews - returns the reviews added to a recipe
    */
    value: function postReviews(req, res) {
      var id = req.params.recipeid;
      var userId = req.decoded.id;
      var content = req.body.content;

      if (!userId) {
        return res.status(401).send({
          success: false,
          message: 'You are not authorized to post a review, please send your token in the header'
        });
      }
      return _model.Reviews.create({
        content: content,
        recipeId: id
      }).then(function (review) {
        res.status(201).send({
          success: true,
          review: review
        });
      }).catch(function (err) {
        return res.status(400).send(err);
      });
    }
  }]);

  return Review;
}();

exports.default = Review;