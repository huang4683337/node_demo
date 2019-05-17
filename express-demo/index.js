const express = require('express');

const server = express();
server.engine('html', require('express-art-template'));

var bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

const router = require('./router');
server.use(router)



server.listen(3000, ()=>{
    console.log("http://localhost:3000")
} )