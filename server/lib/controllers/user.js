import { User } from '../model/user';

export default {
  create(req, res) {
    return User
      .create({
        email: req.body.email,
      })
      .then(user => res.status(201).send(user))
      .catch(err => res.status(400).send(err));
  }
};
