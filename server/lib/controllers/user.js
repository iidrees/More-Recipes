// import dependencies
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../model';

/**
 * This is a UserSignup class that allows a client to signup
 */
export class UserSignup {
  /**
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON - this is returned to notify the user of account creation
 * @return {object}  JSON- returns the infomatoin about the account created
 */
  static signUp(req, res) {
    const { username, email } = req.body;
    let { password } = req.body;

    if (password.length < 8) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Password must not be less than 8 or be undefined'
      });
    }
    password = bcrypt.hashSync(password, 10);
    return User
      .create({
        username,
        email,
        password,
      })
      .then((user) => {
        res.status(201).send({
          status: 'success',
          message: 'Account is created created',
          username: user.username,
          id: user.id
        });
      })
      .catch((err) => {
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
}

/**
 * This is a UserSignin class that allows a client to signin and
 * a token is generated for the user to keep for future authentication
 */
export class UserSignin {
  /**
 * @param {object} req - The request object from the client
 * @param {object} res - The response object to the client
 * @return {object} JSON - this is returned to notify the user of account creation
 * @return {object} JSON - returns the informatoin about the account created
 */
  static signIn(req, res) {
    /* grab the username, email and password from the req.body
      these values are parsed and then if there is an error it is returned
      if
     */
    const { username, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        status: 'Error',
        message: 'Please enter your username and password'
      });
    }
    return User
      .findOne({
        where: {
          username,
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            status: 'Error',
            err: 'User Not Found'
          });
        }
        if (bcrypt.compareSync(password, user.password)) {
          const payload = { id: user.id };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '3h'
          });
          return res.status(200).send({
            status: 'Success',
            message: 'Token generation and signin successful',
            data: token,
          });
        }
        return res.status(400).send({
          status: 'Fail',
          message: 'Incorrect Login Details supplied'
        });
      });
  }
}

