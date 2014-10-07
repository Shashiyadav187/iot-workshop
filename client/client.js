var five  = require('johnny-five'),
    Spark = require('spark-io'),
    mqtt  = require('mqtt');

var board = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
    deviceId: process.env.SPARK_DEVICE_ID
  })
});

board.on('ready', function () {
  var client = mqtt.createClient();

  client.subscribe('colors');

  client.on('message', function (topic, payload) {
    console.log(topic, payload);
  });
});
