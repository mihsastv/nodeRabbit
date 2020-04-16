var amqp = require('amqplib/callback_api');

function one () {
    amqp.connect('amqp://MTA_Write:ph-lAVfHw7kX@192.168.100.13:5672', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            /*var exchange = 'logs'
            channel.assertExchange(exchange, 'fanout', {
                durable: false
            });*/

            channel.assertQueue('test1', {durable: false}, function(error2, q) {
                if (error2) {
                    throw error2;
                }

                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                // channel.bindQueue(q.queue, exchange, 'test');
                channel.consume(q.queue, function(msg) {
                    if(msg.content) {
                        console.log(" [x] %s", msg.content.toString());
                    }
                }, {
                    noAck: true
                });
            });
        });
    });
}
one();
