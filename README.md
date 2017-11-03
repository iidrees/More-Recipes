# More-Recipes!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/78da5d21d008689ddbea/maintainability)](https://codeclimate.com/github/iidrees/More-Recipes/maintainability)
[![Build Status](https://travis-ci.org/iidrees/More-Recipes.svg?branch=develop)](https://travis-ci.org/iidrees/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/iidrees/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/iidrees/More-Recipes?branch=develop)

## Introduction

This is a project divided into three parts:

1. The Templates:
    
    * This part holds the UI or template for the whole project.

2. The Server:

    * This part holds the basic functionalities that will make the UI interactive for users

3. The Client:

    * This part hold the front-end functionalities that enables users have seamless experience using the web application


## Getting Started

This is a project in three parts, and the first part is to design a UI Template to be hosted using Github Pages.
To view the UI template for the More-Recipes web application on Github Pages, you should click on this link [More-Recipes](https://iidrees.github.io/More-Recipes/template/landing.html) .

The second part of this project is the Sever-side.
The server-side is where the functionality for the API is stored and to be used to power the Template UI previously designed.
This is the part where the logic on how Users are created,
User Authentication is handled, API versioning is used,
JSONWEBTOKEN is used to protect different endpoints etc.


### Prerequisites

To view the UI Template, please use a web browser, preferably, Google Chrome and ensure you have a very good internet connection for a good web experience.

To see how the API works, kindly get a POSTMAN application fired up,
and then follow the DOCUMENTATION below on how to interface with the API.
Although the specification requires nine endpoints to be working and functional by the end of this iteration. However, just seven endpoints have been completed so far and are working appropriately. 
By the end of my next iteration, all endpoints should be completed and accounted for.



## DOCUMENTATION

### To signup using POSTMAN

* Goto the [address](https://quiet-earth-33684.herokuapp.com/api/v1/users/signup)
* choose POST request and select x-www-form-urlencoded
* enter in the body of the request
  `username`: `your-chosen-username`
  `email`: `your-chosen-email`
  `password`: `your-chosen-password`
* send the request and you should get a `success` response if your request was successful and an error will be return if unsuccessful

### To signin using POSTMAN

* Goto the [signin address](https://quiet-earth-33684.herokuapp.com/api/v1/users/signin)
* choose POST request and select x-www-form-urlencoded
* supply in the body of the request
  `username`: `your-chosen-username`
  `email`: `your-chosen-email`
  `password`: `your-chosen-password`
* send the request and you should get a `success` response along with your generated `token` if your request was successful and an error will be return if unsuccessful.
* PLEASE NOTE: when your token has been generated, kindly copy said token in a safe place because your subsequent requests to other endpoints will you sending your token along with your request.

### To POST a recipe using POSTMAN

* Goto to the [POST recipe endpoint](https://quiet-earth-33684.herokuapp.com/api/v1/recipes)
* supply in the body of your request the following
    `title`: `this-is-the-name-of-recipe-to-be-posted`
    `content`: `the-recipe-itself`

* send the POST request, if your request was successful you'll get a response showing the recipe you just added if the request was unsuccessful, it will return the error.

### To GET a recipe using POSTMAN

* Goto to the [GET recipe endpoint](https://quiet-earth-33684.herokuapp.com/api/v1/recipes)

* send the GET request, if your request was successful you'll get a 200 status response showing the recipe you just added and if the request was unsuccessful or you do not supply your token, it will return a 403 error and the resource will be unavailable to you.

### To PUT a recipe using POSTMAN

* Goto to the [PUT recipe endpoint](https://quiet-earth-33684.herokuapp.com/api/v1/recipes/<recipeid>)
* First, you ensure that your token is supplied and select the PUT request
* second, you enter the recipe-id of the recipe you want to edit as a req.parameter in the url and then send same to the API
* send in the body of the request, a `content` body containing your edits, and the send the request to the API.

* if your request was successful, you will get a status code response of 200 and the edited recipe will be returned showing the new recipe content. However, if a wrong recipe-id is supplied, the API will respond with a 404 status code error with a `Recipe Not Found` message.

### To DELETE a recipe using POSTMAN

* Goto to the [DELETE recipe endpoint](https://quiet-earth-33684.herokuapp.com/api/v1/recipes/<recipeid>)
* First, you ensure that your token is supplied and select the DELETE request
* second, you enter the recipe-id of the recipe you want to DELETE as a request parameter in the url and then send same to the API

* if your request was successful, you should get a status code response of 204 (no content) with the recipe deleted, however you will get a 200 (OK) status code so a message can be returned as a response to tell the user that the recipe has been deleted successfully i.e `Recipe successfully deleted`. However, if a wrong recipe-id is supplied, the API will respond with a 404 status code error with a `Recipe Not Found` message.

### To add/POST a Review to a recipe using POSTMAN

* Goto to the [POST reviews endpoint](https://quiet-earth-33684.herokuapp.com/api/v1/recipes/<recipeid>/reviews)

* First, you ensure that your token is supplied and select the POST request option
* second, you enter the recipe-id of the recipe you want to DELETE as a request parameter in the url and then send same to the API
* if your request is successful, you should get a status code response of 201 (Created)

* However, if a wrong recipe-id is supplied, the API will respond with a 400 status code error with the error returned.

### To add Favorite Recipes

* Goto the [POST favorites endpoint](https://quiet-earth-33684.herokuapp.com/api/v1/recipes/<recipeid>/addfavorite)

* Enter the recipe-id of your favorite recipe on the recipe-table in the request URL parameter while making a post request.

* The API will respond with a 201 (created) status code if the request was successful, and then a json will be returned showing the `status`, `message` and `data` added to the favorite recipe list.


### Built With

* HTML/CSS
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Twitter Bootstrap](getbootstrap.com) / [Font Awesome](fontawesome.io/icons/)
* [Node.js](https://nodejs.org)
* [Express.js](https://expressjs.com)
* [Postgresql](https://www.postgresql.org)


## Authors

* Idrees Ibraheem

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/iidrees/More-Recipes/blob/master/LICENSE) file for details.
