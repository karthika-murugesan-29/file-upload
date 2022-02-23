'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
var bodyParser = require("body-parser");
var multer = require('multer');

global.__basedir = __dirname + "/..";
const app  = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));


function startServer(){
    server.listen(port, () =>{
        console.log('Server Started in ',port);
    })
}


app.use('/api/csv',require('./routes.js'));
setImmediate(startServer);

module.exports = server;