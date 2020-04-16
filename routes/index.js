var express = require('express');
var router = express.Router();
var amqp = require('amqplib/callback_api');

/* GET home page. */
router.get('/', function(req, res, next) {
  amqp.connect('amqp://MTA_Write:ph-lAVfHw7kX@192.168.100.13:5672', function(error0, connection) {
    if (error0) {
      throw error0;
    }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }

        var msg = JSON.stringify(req.body);

        /*
        var exchange = 'test';
        channel.assertExchange(exchange, 'fanout', {
          durable: true
        });
        channel.publish(exchange, '', Buffer.from(msg));
        */

        channel.assertQueue('test1', { durable: false });
        channel.sendToQueue('test1', Buffer.from(msg));

        console.log(" [x] Sent %s", msg);

        setTimeout(function( ) {
          connection.close(); }, 500);
        });
    });
  res.status(200).json('123');
});

module.exports = router;
