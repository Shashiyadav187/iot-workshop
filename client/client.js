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

  var led = new five.Led.RGB({
    pins: {
      red: 'A5',
      green: 'A6',
      blue: 'A7'
    }
  });

  client.subscribe('colors');

  client.on('message', function (topic, payload) {
    if (topic === 'colors') {
      var color = payload;
      led.color(color);
    }
  });
});
