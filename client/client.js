var mqtt = require('mqtt');

var client = mqtt.createClient();

client.subscribe('colors');
