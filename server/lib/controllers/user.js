import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import model  from '../model';

// import { Recipes } from '../model/recipes';
const User = model.User;
const saltRounds = 10;

console.log(User);
export default {
  signUp(req, res) {
    const { username, email} = req.body;
    let { password } = req.body;
    // console.log(email);

    if (password.length < 8 ) {
      return res.status(400).send({
        message: 'Password must not be less than 8'
      });
    }
  
    password = bcrypt.hashSync(password, 10);

    console.log('this is the hash', password);
    // res.status(200).send({ message: 'Password Created'});
    return User
      .create({
        username,
        email,
        password,
      })
      .then((user) => {
        res.status(201).send({
          success: true,
          message: 'Account created',
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
        return res.status(400).send({message: err});
      });
  },


  signIn(req, res) {
    const { username, email, password } = req.body;
    // console.log(email, password);
    if (!email || !password) {
      return res.status(400).send({ 
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
            err: 'User Not Found'
          });
        }
        if (bcrypt.compareSync(password, user.password)) {
          const payload = { id: user.id };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '3h'
          });
          return res.status(200).send({
            success: true,
            message: 'Token generation and signin successful',
            token: token
          })
        }
        return res.status(400).send({
          message: 'Incorrect Login Details supplied'
        })
      })
    
  }


};
