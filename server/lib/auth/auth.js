import jwt from 'jsonwebtoken';

export default {
  verifyUser(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.token;

    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
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
        message: 'Token not provided'
      });
    }
  }
};