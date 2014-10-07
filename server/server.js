var express = require('express'),
    http    = require('http'),
    path    = require('path');

// Express
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

// HTTP Server
var server = http.createServer(app);

// Servers
server.listen(8080);
