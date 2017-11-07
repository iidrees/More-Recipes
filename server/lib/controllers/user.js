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
    console.log(' the password', password);

    /* Checks password length */
    if (password.length < 8) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Password must not be less than 8 or be undefined'
      });
    } 
    /* encrypt password and stores in the database
    along with some user information */
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
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({
        status: 'Error',
        message: 'Please enter your username and password'
      });
    }
    return User // check the db if user has already signedup
      .findOne({
        where: {
          username,
        }
      })
      .then((user) => {
        if (!user) { // returns an error if user has not signedup yet
          return res.status(400).send({
            status: 'Error',
            err: 'User Not Found'
          });
        }
        if (bcrypt.compareSync(password, user.password)) {
          /*  if user has an account,
            compare password with what we have in the db.
            if password is correct, save the user id in a token
            and send this to the user for authentication.
           */
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

