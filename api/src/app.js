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

 // Adding a new Post/Blog
 app.post("/blogs", (request, response) => {
   let body = request.body;
   let key = ['title']

   let validRequest = false;

   if(body[key[0]]) {
      validRequest = true;
    }

   if(validRequest) {
      knex('posts')
      .insert(request.body)
      .returning('id')
      .then((ids) => {
         knex('posts')
         .select('*')
         .where('id', '=', ids[0].id)
         .then(data => {
           response.status(200).json(data);
         })
       })
   }
   else {
      console.log(`post for blog failed, body: `, request.body)
      response.status(404).send('Add was not valid');
    }
   
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
                  // return the id back to the ui to know where to go
                   response.status(200).send(JSON.stringify(user.id))
                   //response.json(user)
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
    .select('posts.id', 'posts.content', 'posts.title')
    .where('posts.id_user', '=', parseInt(request.params.id))
    .then(data => {
      if(data.length >= 1) {
         response.status(200).json(data)
      } else {
         response.status(404).send(`id: ${request.params.id} has no blogs yet`)
       }
    })

})

// Get a specific blog from a certain user
app.get('/:userid/blog/:blogid', (request, response) => {
   knex('posts')
   .join('users', 'users.id', '=', 'posts.id_user')
   .select('posts.id', 'posts.content', 'posts.title')
   .where('posts.id_user', '=', parseInt(request.params.userid))
   .andWhere('posts.id', '=', parseInt(request.params.blogid))
   .then(data => {
      if(data.length >= 1) {
         response.status(200).json(data)
      } else {
         response.status(404).send(`id: ${request.params.blogid} doesnt exist for this user`)
       }
    })
})

app.get('/:userid/blog/:blogid', (request, response) => {
   knex('posts')
   .join('users', 'users.id', '=', 'posts.id_user')
   .select('posts.id', 'posts.content', 'posts.title')
   .where('posts.id_user', '=', parseInt(request.params.userid))
   .andWhere('posts.id', '=', parseInt(request.params.blogid))
   .then(data => {
      if(data.length >= 1) {
         response.status(200).json(data)
      } else {
         response.status(404).send(`id: ${request.params.blogid} doesnt exist for this user`)
       }
    })
})

app.delete('/:userid/blog/:blogid', (request, response) => {
   knex('posts')
   .where('id', '=', parseInt(request.params.blogid))
   .del()
   .then((data) => {
      response.status(200).json(`Number of records deleted: ${data}`);
    })
})

app.patch('/:userid/blog/:blogid', (request, response) => {

   let keys = ['title', 'content'];
   let body = request.body;
   let validRequest = false;

   if(body[keys[0]] || body[keys[1]]) {
      validRequest = true;
   }

   // if(body.title ==='' || body.content ==='') {
   //    validRequest = false;
   // }

   if(validRequest){
      knex('posts')
      .where('id', '=', parseInt(request.params.blogid))
      .update(request.body, keys)
      .then((data) => {
         response.status(200).json(`Number of records updated: ${data}`);
       })

   } else {
      response.status(404).send('Update was not valid');
   }
})

module.exports = app;
