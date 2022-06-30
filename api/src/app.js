const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken");
const SECRET = "any_secret_you_want_to_use";

//Bcrypt code may go here??
//var db = require('../models');
var bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json())

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

// Register: storing name, username and passwd and redirecting to blog
// page of all the blogs i have created

app.post("/users", (request, response, next) => {
    bcrypt.hash(request.body.password, saltRounds)
    .then(hashedPassword => {
       return knex("users").insert({
          firstname: request.body.firstname,
          lastname: request.body.lastname,
          username: request.body.username,
          password: hashedPassword
       })
       .returning(["id", "username"])
       .then(users => {
          response.json(users[0])
       })
       .catch(error => next(error))
    })
 })

 app.post("/signin", (request, response, next) => {
    knex("users")
    .where({username: request.body.username})
    .first()
    .then(user => {
       if(!user){
          response.status(401).json({
             error: "No user by that name"
          })
       }else{
          return bcrypt
          .compare(request.body.password, user.password)
          .then(isAuthenticated => {
             if(!isAuthenticated){
                response.status(401).send("Unsuccessful login")
             }else{
                return jwt.sign(user, SECRET, (error, token) => {
                   response.status(200).send("Successful login")
                })
             }
          })
       }
    })
 })

app.get('/', (request, response) => {
    console.log(`servicing GET for /`);
    response.set("Access-Control-Allow-Origin", "*");
    response.status(200).send('App root route running');
})

app.get('/posts/:id', (request, response) => {
    let currentPosts = knex('posts')
    .join('users', 'users.id', '=', 'posts.id_user')
    .select('posts.content', 'posts.title')
    .where('posts.id_user', '=', parseInt(request.params.id))
    .then(data => {
      if(data.length >= 1) {
         response.status(200).json(data)
      } else {
         res.status(404).send(`id: ${request.params.id} not found`)
       }
    })

})

module.exports = app;
