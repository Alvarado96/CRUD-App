const express = require('express');
const cors = require('cors');
const app = express();

//Bcrypt code may go here??
//var db = require('../models');
var bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors());

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

// Register: storing name, email and passwd and redirecting to blog
// page of all the blogs i have created

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const pwHash = await bcrypt.hash(password, saltRounds)
    console.log(pwHash);
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
