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

// Register: storing name, email and passwd and redirecting to blog
// page of all the blogs i have created

app.post("/users", (request, response, next) => {
    bcrypt.hash(request.body.password, saltRounds)
    .then(hashedPassword => {
       return knex("users").insert({
          firstname: request.body.firstname,
          lastname: request.body.lastname,
          email: request.body.email,
          password: hashedPassword
       })
       .returning(["id", "email"])
       .then(users => {
          response.json(users[0])
       })
       .catch(error => next(error))
    })
 })

 app.post("/signin", (request, response, next) => {
    knex("users")
    .where({email: request.body.email})
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

app.get('/authors', (request, response) => {
    console.log(`servicing GET for /authors`);
    knex('app_authors')
        .select('*')
        .then(authorRecords => {
            let responseData = authorRecords.map(author => ({ firstName: author.first_name, lastName: author.last_name}));
            response.status(200).send(responseData)
        })

})

module.exports = app;
