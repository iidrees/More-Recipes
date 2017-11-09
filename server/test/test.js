import { assert } from 'chai';
import request from 'supertest';
import app from '../lib/server';
import { User, Recipes, Favorites, Reviews, Votes } from '../lib/model';

User.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});
Recipes.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});
Favorites.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});
Reviews.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});
Votes.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});


let token;
const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTEwMTMyODA5LCJleHAiOjE1MTAxNDM2MDl9.Kjyo44x-yMFaS4yO9rr0kzi2qxQ1NxIod7HS5IMUihc';
describe('Server, Status and Content', () => {
  describe('GET "/api/v1/home", to test server ', () => {
    it('should respond with a 200 status code, status, and message', (done) => {
      request(app)
        .get('/api/v1/home')
        .expect(200)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Welcome To The More-Recipes API!');
          assert.deepEqual(res.status, 200);
          done();
        })
        .catch(err => done(err));
    });
  });
  /* Test for the signup endpoint */
  describe('Signup with "/api/v1/users/signup"', () => {
    it('should return password length error', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({
          username: 'tester',
          email: 'tester@test.com',
          password: 'idrees'
        })
        .expect(400)
        .then((res) => {
          assert.equal(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Password must not be less than 8 or be undefined');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
    it('Should successfully signup user', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({
          username: 'tester',
          email: 'tester@test.com',
          password: 'idreeskun'
        })
        .expect(201)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Account is created created');
          assert.deepEqual(res.body.username, 'tester');
          assert.deepEqual(res.body.id, 1);
          assert.deepEqual(res.status, 201);
          done();
        })
        .catch(err => done(err));
    });
    it('should return "user already exists" error', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({
          username: 'tester',
          email: 'tester@test.com',
          password: 'idreeskun'
        })
        .expect(400)
        .then((res) => {
          console.log(res.body.message);
          assert.equal(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'This username already exist, enter a new one');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
  });

  /* Test for the signin endpoint */
  describe('Signin with "/api/v1/users/signin"', () => {
    it('should return signin error with empty fields', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({
          username: '',
          email: 'tester@test.com',
          password: ''
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Please enter your username and password');
          done();
        });
    });
    it('should return "User Not Found"', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({
          username: 'test',
          email: 'tester@test.com',
          password: 'idreeskun'
        })
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.err, 'User Not Found');
          assert.deepEqual(res.status, 400);
          done();
        });
    });
    it('should return signin "Fail" error for wrong password', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({
          username: 'tester',
          email: 'tester@test.com',
          password: 'idreeskunkun'
        })
        .expect(400)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Incorrect Login Details supplied');
          assert.deepEqual(res.status, 400);
          done();
        });
    });
    it('should return signin 200 "Success" status with token', (done) => {
      request(app)
        .post('/api/v1/users/signin')
        .send({
          username: 'tester',
          email: 'tester@test.com',
          password: 'idreeskun'
        })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Token generation and signin successful');
          assert.deepEqual(res.status, 200);
          token = res.body.data;
          console.log('the token', token);
          done();
        });
    });
  });

  /* TEST FOR RECIPE ENDPOINT */
  describe('GET, POST and PUT Recipes', () => {
    /* TEST for GET and POST recipes */
    it('should return an error if no recipe', (done) => {
      request(app)
        .get('/api/v1/recipes')
        .expect(400)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'No Recipe available, please enter a recipe.');
          assert.lengthOf(res.body.data, 0);
          done();
        })
        .catch(err => done(err));
    });
    it('should return "Unauthorised" when token not supplied', (done) => {
      request(app)
        .post('/api/v1/recipes')
        .send({
          title: 'Jollof Rice Recipe',
          content: 'Just boil ordinary water'
        })
        .expect(403)
        .then((res) => {
          console.log(res.body, res.status);
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Please send your token along with your request');
          assert.deepEqual(res.status, 403);
          done();
        })
        .catch(err => done(err));
    });
    it('should return 403 status code for expired token', (done) => {
      request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', expiredToken)
        .send({
          title: 'Jollof Rice Recipe',
          content: 'Just boil ordinary water'
        })
        .expect(403)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Authentication Failed, Please signin again to get a token.');
          assert.deepEqual(res.status, 403);
          done();
        })
        .catch(err => done(err));
    });
    it('should add a recipe', (done) => {
      request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .send({
          title: 'Jollof Rice Recipe',
          content: 'Just boil ordinary water'
        })
        .expect(201)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Recipe added');
          assert.deepEqual(res.status, 201);
          done();
        })
        .catch(err => done(err));
    });
    it('should return all recipes', (done) => {
      request(app)
        .get('/api/v1/recipes')
        .expect(200)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Recipes below');
          assert.deepEqual(res.body.data[0].title, 'Jollof Rice Recipe');
          assert.deepEqual(res.body.data[0].content, 'Just boil ordinary water');
          assert.typeOf(res.body.data, 'array');
          done();
        })
        .catch(err => done(err));
    });

    /* TEST for PUT/updating a Recipe */
    it('should be able to PUT/update a recipe', (done) => {
      request(app)
        .put(`/api/v1/recipes/${1}`)
        .set('x-access-token', token)
        .send({
          title: 'Beans and Bread Recipe',
          content: 'All you need is ewa oloyin'
        })
        .expect(200)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Recipe updated successfully');
          assert.typeOf(res.body.data, 'object');
          assert.deepEqual(res.body.data.title, 'Beans and Bread Recipe');
          assert.deepEqual(res.body.data.content, 'All you need is ewa oloyin');
          done();
        })
        .catch(err => done(err));
    });
    it('should return a "404 Recipe Not Found" error where not found ', (done) => {
      request(app)
        .put(`/api/v1/recipes/${2}`)
        .set('x-access-token', token)
        .send({
          title: 'Beans and Bread Recipe',
          content: 'All you need is ewa oloyin'
        })
        .expect(404)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Recipe Not Found');
          assert.typeOf(res.body.data, 'null');
          assert.deepEqual(res.status, 404);
          done();
        })
        .catch(err => done(err));
    });
    it('should return an error where a string params is passed ', (done) => {
      let newNum;
      request(app)
        .put(`/api/v1/recipes/${newNum}`)
        .set('x-access-token', token)
        .send({
          title: 'Beans and Bread Recipe',
          content: 'All you need is ewa oloyin'
        })
        .expect(400)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Please enter a number representing the recipe');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
  });

  /* TEST FOR REVIEWS ENDPOINT */
  describe('POST/add and PUT/edit Reviews', () => {
    it('should add a review on endpoint "/api/v1/recipes/:recipeid/reviews"', (done) => {
      request(app)
        .post(`/api/v1/recipes/${1}/reviews`)
        .set('x-access-token', token)
        .send({
          content: 'This Recipe is shyte'
        })
        .expect(201)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Review has been added');
          assert.deepEqual(res.status, 201);
          assert.deepEqual(res.body.data.content, 'This Recipe is shyte');
          assert.typeOf(res.body.data, 'object');
          done();
        })
        .catch(err => done(err));
    });
    it('should edit a review', (done) => {
      request(app)
        .put(`/api/v1/recipes/${1}/${1}/reviews`)
        .set('x-access-token', token)
        .send({
          content: 'Recipe to sweet baje baje'
        })
        .expect(201)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Reviews updated');
          assert.deepEqual(res.body.data.content, 'Recipe to sweet baje baje');
          assert.typeOf(res.body.data, 'object');
          assert.deepEqual(res.status, 201);
          done();
        })
        .catch(err => done(err));
    });
    it('should return a 404 status error', (done) => {
      request(app)
        .put(`/api/v1/recipes/${1}/${4}/reviews`)
        .set('x-access-token', token)
        .send({
          content: 'Recipe to sweet baje baje'
        })
        .expect(404)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Review Not Found');
          assert.deepEqual(res.status, 404);
          done();
        })
        .catch(err => done(err));
    });
    it('should return a 400 status error', (done) => {
      const newNum = 's';
      request(app)
        .put(`/api/v1/recipes/${1}/${newNum}/reviews`)
        .set('x-access-token', token)
        .send({
          content: 'Recipe to sweet baje baje'
        })
        .expect(400)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Please enter the correct recipe ID and Review ID');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
    it('should return a 400 status error', (done) => {
      const newNum = 's';
      request(app)
        .post(`/api/v1/recipes/${newNum}/reviews`)
        .set('x-access-token', token)
        .send({
          content: 'Recipe to sweet baje baje'
        })
        .expect(400)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Please enter the correct recipe ID');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
  });
  /* TEST FOR GETTING AND ADDING FAVORITES */
  describe('POST/add Favorites and GET Favorites', () => {
    
    it('should return "No Favorite Found, Add a Favorite', (done) => {
      request(app)
        .get(`/api/v1/users/${1}/recipes`)
        .set('x-access-token', token)
        .expect(404)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.status, 404);
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Favorite Not Found');
          done();
        })
        .catch(err => done(err));
    });
    it('should add Favorite', (done) => {
      request(app)
        .post(`/api/v1/recipes/${1}/addfavorite`)
        .set('x-access-token', token)
        .expect(201)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Favorite Recipe Added');
          assert.typeOf(res.body.data, 'object');
          assert.deepEqual(res.status, 201);
          done();
        })
        .catch(err => done(err));
    });
    it('should return 400 "Bad request" error for invalid input', (done) => {
      const newNum = ' ';
      request(app)
        .post(`/api/v1/recipes/${newNum}/addfavorite`)
        .set('x-access-token', token)
        .expect(400)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Invalid parameter input');
          assert.deepEqual(res.status, 400);
          done();
        })
        .catch(err => done(err));
    });
    it('should get favorite recipe of a user', (done) => {
      request(app)
        .get(`/api/v1/users/${1}/recipes`)
        .set('x-access-token', token)
        .expect(200)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'This is your Favorite Recipes');
          assert.typeOf(res.body.data, 'array');
          done();
        })
        .catch(err => done(err));
    });
    it('should return "401 Unauthorised" error ', (done) => {
      request(app)
        .get(`/api/v1/users/${4}/recipes`)
        .set('x-access-token', token)
        .expect(401)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.status, 401);
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'You are unauthorised to view this resource');
          done();
        })
        .catch(err => done(err));
    });
  });

  /* TEST FOR UPVOTES AND DOWNVOTES */
  describe('Upvote and Downvote a recipe', () => {
    it('should return "404 Recipe Not Found" for Upvotes', (done) => {
      request(app)
        .post(`/api/v1/recipes/${3}/upvotes`)
        .set('x-access-token', token)
        .expect(404)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Recipe not found');
          assert.deepEqual(res.status, 404);
          done();
        })
        .catch(err => done(err));
    });
    it('should return "201 Success" for a successful vote', (done) => {
      request(app)
        .post(`/api/v1/recipes/${1}/upvotes`)
        .set('x-access-token', token)
        .expect(201)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.status, 201);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Beans and Bread Recipe has been upvoted');
          assert.typeOf(res.body.data, 'object');
          done();
        })
        .catch(err => done(err));
    });
    // downvotes
    it('should return "404 Recipe Not Found" for downvoted recipes not in database', (done) => {
      request(app)
        .post(`/api/v1/recipes/${3}/downvotes`)
        .set('x-access-token', token)
        .expect(404)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Recipe not found');
          assert.deepEqual(res.status, 404);
          done();
        })
        .catch(err => done(err));
    });
    it('should return "201 Success" for a successful downovote', (done) => {
      request(app)
        .post(`/api/v1/recipes/${1}/downvotes`)
        .set('x-access-token', token)
        .expect(201)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.status, 201);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Beans and Bread Recipe has been downvoted');
          assert.typeOf(res.body.data, 'object');
          done();
        })
        .catch(err => done(err));
    });
  });
  /*  TEST for getting Upvotes in descending order and deleting a recipe */
  describe('GET most upvotes in descending order', () => {
    it('should get recipes with most upvotes in descending order', (done) => {
      request(app)
        .get('/api/v1/recipes')
        .set('x-access-token', token)
        .query({ sort: 'upvotes', order: 'desc' })
        .expect(200)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.status, 200);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Upvotes found and displayed in descending order');
          assert.typeOf(res.body.data, 'array');
          done();
        })
        .catch(err => done(err));
    });
  });
  /* TEST for DELETE */
  describe('Delete recipes', () => {
    it('should return an error when no recipe found', (done) => {
      request(app)
        .delete(`/api/v1/recipes/${5}`)
        .set('x-access-token', token)
        .expect(404)
        .then((res) => {
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Recipe Not Found');
          assert.deepEqual(res.status, 404);
          done();
        })
        .catch(err => done(err));
    });
    it('should return "undefined" for a string params', (done) => {
      let newkid;
      request(app)
        .delete(`/api/v1/recipes/${newkid}`)
        .set('x-access-token', token)
        .expect(404)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Fail');
          assert.deepEqual(res.body.message, 'Please enter a number');
          assert.deepEqual(res.status, 404);
          done();
        })
        .catch(err => done(err));
    });
    it('should delete a recipe', (done) => {
      request(app)
        .delete(`/api/v1/recipes/${1}`)
        .set('x-access-token', token)
        .expect(200)
        .then((res) => {
          console.log(res.body);
          assert.deepEqual(res.body.status, 'Success');
          assert.deepEqual(res.body.message, 'Recipe successfully deleted');
          assert.deepEqual(res.status, 200);
          done();
        })
        .catch(err => done(err));
    });
  });
});
