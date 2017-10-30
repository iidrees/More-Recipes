import { assert } from 'chai';
import request from 'supertest';
import app from '../lib/server';


describe('Server, Status and Content', () => {
  describe('GET /, to test server ', () => {
    it('should respond with a 200 status code and a string', (done) => {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });
  let newRecipe = {};
  let updateRecipe = {};
  describe('All Endpoints', () => {
    beforeEach(() => {
      newRecipe = {
        id: '6',
        name: 'Hokage Narutoklasjdk',
        email: 'narutokun@kun.com',
        createdAt: new Date(),
        recipeTitle: 'Jollof Rice',
        recipes: [
          {
            step: 'This is a good way to edit this thing.\nLets edit once more\nsome more more more more\n'
          }
        ],
        reviews: 'THis is awesome',
        upvotes: ''
      };
      updateRecipe = {
        createdAt: new Date(),
        recipe: [
          {
            step: 'This recipe is one of a kind and here it is.'
          }
        ]
      };
    });
    it('GET "/api/v1/recipes" should return all recipes', (done) => {
      request(app)
        .get('/api/v1/recipes')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
    it('POST a recipe to "/api/v1/recipes" and should return updated recipe.', (done) => {
      request(app)
        .post('/api/v1/recipes')
        .send(newRecipe)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
    it('should modify a recipe on endpoint "/api/v1/recipes/:id"', (done) => {
      request(app)
        .put(`/api/v1/recipes/${newRecipe.id}`)
        .send(updateRecipe)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
    it('should POST a review to "/api/v1/recipes/:id/reviews', (done) => {
      request(app)
        .post(`/api/v1/recipes/${newRecipe.id}/reviews`)
        .send(newRecipe)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
    it('should GET recipe with most UPVOTES', (done) => {
      request(app)
        .get('/api/v1/recipes?sort=upvotes&order=desc')
        .query({sort: 'upvotes', order: 'desc' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
    it('should DELETE a recipe', (done) => {
      request(app)
        .delete(`/api/v1/recipes/${newRecipe.id}`)
        .expect(204)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
