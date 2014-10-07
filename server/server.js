var Primus        = require('primus'),
    PrimusEmitter = require('primus-emitter'),
    express       = require('express'),
    mqtt          = require('mqtt'),
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

  socket.on('color', function (color) {
    console.log(color);
  });
});


// MQTT Server
var mqttServer = mqtt.createServer(function (client) {
  var clients = {};

  client.on('connect', function (packet) {
    client.connack({ returnCode: 0 });
    client.id = packet.clientId;
    clients[client.id] = client;
    console.log(client.id + ' connected');
  });

  client.on('pingreq', function (packet) {
    client.pingresp();
  });

  client.on('subscribe', function (packet) {
    var granted = [];

    for (var i = 0; i < packet.subscriptions.length; i++) {
      granted.push(packet.subscriptions[i].qos);
    }

    client.suback({ granted: granted, messageId: packet.messageId });
    console.log(client.id + ' subscribed');
  });

  client.on('close', function (packet) {
    delete clients[client.id];
    console.log(client.id + ' closed connection');
  });

  client.on('disconnect', function (packet) {
    client.stream.end();
    console.log(client.id + ' disconnected');
  });


  client.on('error', function (packet) {
    if (!clients[client.id]) return;

    delete clients[client.id];
    client.stream.end();
  });

});

// Servers
server.listen(8080);
mqttServer.listen(1883);
