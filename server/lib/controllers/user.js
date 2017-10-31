import model  from '../model';
// import { Recipes } from '../model/recipes';
const User = model.User
console.log(User);
export default {
  signUp(req, res) {
    let { username, email, password } = req.body;
    console.log(email);
    return User
      .create({
        username,
        email,
        password,
      })
      .then(user => res.status(201).send(user))
      .catch(err => res.status(400).send(err));
  },


  signIn(req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    res.status(200).send('You are still testing the routes and signin');
  }


};
