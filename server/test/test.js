import { assert } from 'chai';
import request from 'supertest';
import app from '../lib/server';

// let signup = {};
// let signin = {};
// let token;
describe('Server, Status and Content', () => {
  describe('GET /, to test server ', () => {
    it('should respond with a 200 status code and a string', (done) => {
      request(app)
        .get('/api/v1/home')
        .expect(200, done);
    });
  });
/*
  describe('Sign up and Sign in', () => {
    beforeEach(() => {
      signup = {
        username: 'idrees',
        email: 'idrees@g.com',
        password: 'idreeskunkun'
      };
      signin = {
        username: 'narutokun',
        email: 'idrees@gmail.com',
        password: 'idreeskunkun'
      };
    });
    it('Signup with these information', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({
          username: 'idrees',
          email: 'idrees@g.com',
          password: 'idreeskunkun'
        })
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('All Endpoints', () => {

    it('GET "/api/v1/recipes" should return all recipes', (done) => {
      request(app)
        .get('/api/v1/recipes')
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
    it('POST a recipe to "/api/v1/recipes" and should return updated recipe.', (done) => {
      request(app)
        .post('/api/v1/recipes')
        .send(signup)
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
    it('should modify a recipe on endpoint "/api/v1/recipes/:id"', (done) => {
      request(app)
        .put(`/api/v1/recipes/${newRecipe.id}`)
        .send(updateRecipe)
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
    it('should POST a review to "/api/v1/recipes/:id/reviews', (done) => {
      request(app)
        .post(`/api/v1/recipes/${newRecipe.id}/reviews`)
        .send(newRecipe)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
    it('should GET recipe with most UPVOTES', (done) => {
      request(app)
        .get('/api/v1/recipes?sort=upvotes&order=desc')
        .query({ sort: 'upvotes', order: 'desc' })
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
    it('should DELETE a recipe', (done) => {
      request(app)
        .delete(`/api/v1/recipes/${newRecipe.id}`)
        .expect(204)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  }); */
});
