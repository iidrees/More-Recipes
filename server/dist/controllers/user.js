'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserSignin = exports.UserSignup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import dependencies


var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _model = require('../model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This is a UserSignup class that allows a client to signup
 */
var UserSignup = exports.UserSignup = function () {
  function UserSignup() {
    _classCallCheck(this, UserSignup);
  }

  _createClass(UserSignup, null, [{
    key: 'signUp',

    /**
    * @param {object} req - The request object from the client
    * @param {object} res - The response object to the client
    * @return {object} JSON - this is returned to notify the user of account creation
    * @return {object}  JSON- returns the infomatoin about the account created
    */
    value: function signUp(req, res) {
      var _req$body = req.body,
          username = _req$body.username,
          email = _req$body.email;
      var password = req.body.password;


      if (password.length < 8) {
        return res.status(400).send({
          status: 'Fail',
          message: 'Password must not be less than 8 or be undefined'
        });
      }
      password = _bcrypt2.default.hashSync(password, 10);
      return _model.User.create({
        username: username,
        email: email,
        password: password
      }).then(function (user) {
        res.status(201).send({
          status: 'success',
          message: 'Account is created created',
          username: user.username,
          id: user.id
        });
      }).catch(function (err) {
        if (err.name === 'sequelizeUniqueConstraintError') {
          return res.status(400).send({
            error: err.errors[0].message
          });
        }
        return res.status(400).send({
          message: err
        });
      });
    }
  }]);

  return UserSignup;
}();

/**
 * This is a UserSignin class that allows a client to signin and
 * a token is generated for the user to keep for future authentication
 */


var UserSignin = exports.UserSignin = function () {
  function UserSignin() {
    _classCallCheck(this, UserSignin);
  }

  _createClass(UserSignin, null, [{
    key: 'signIn',

    /**
    * @param {object} req - The request object from the client
    * @param {object} res - The response object to the client
    * @return {object} JSON - this is returned to notify the user of account creation
    * @return {object} JSON - returns the informatoin about the account created
    */
    value: function signIn(req, res) {
      /* grab the username, email and password from the req.body
        these values are parsed and then if there is an error it is returned
        if
       */
      var _req$body2 = req.body,
          username = _req$body2.username,
          email = _req$body2.email,
          password = _req$body2.password;

      if (!email || !password) {
        return res.status(400).send({
          status: 'Error',
          message: 'Please enter your username and password'
        });
      }
      return _model.User.findOne({
        where: {
          username: username
        }
      }).then(function (user) {
        if (!user) {
          return res.status(400).send({
            status: 'Error',
            err: 'User Not Found'
          });
        }
        if (_bcrypt2.default.compareSync(password, user.password)) {
          var payload = { id: user.id };
          var token = _jsonwebtoken2.default.sign(payload, process.env.SECRET, {
            expiresIn: '3h'
          });
          return res.status(200).send({
            status: 'Success',
            message: 'Token generation and signin successful',
            data: token
          });
        }
        return res.status(400).send({
          status: 'Fail',
          message: 'Incorrect Login Details supplied'
        });
      });
    }
  }]);

  return UserSignin;
}();