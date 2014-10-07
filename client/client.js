var mqtt = require('mqtt');

var client = mqtt.createClient();

client.subscribe('colors');

client.on('message', function (topic, payload) {
  console.log(topic, payload);
});
