var Primus        = require('primus'),
    PrimusEmitter = require('primus-emitter'),
    express       = require('express'),
    http          = require('http'),
    path          = require('path');

// Express
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

// HTTP Server
var server = http.createServer(app);

// WebSockets
var primus = new Primus(server);
primus.use('emitter', PrimusEmitter);

primus.on('connection', function (socket) {
  console.log(socket);
});

// Servers
server.listen(8080);
