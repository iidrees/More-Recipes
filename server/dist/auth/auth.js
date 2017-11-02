'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  verifyUser: function verifyUser(req, res, next) {
    var token = req.headers['x-access-token'] || req.headers.token;

    if (token) {
      _jsonwebtoken2.default.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Authentication failed'
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Please send your token along with your request'
      });
    }
  }
};