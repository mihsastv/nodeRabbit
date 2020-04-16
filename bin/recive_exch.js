var amqp = require('amqplib/callback_api');

function one () {
    // amqp.connect('amqp://mta_mobile:Mw7-pEJ-8Pm-DSr@192.168.100.13:5672', function(error0, connection) {
    amqp.connect('amqp://mta_mobile:Mw7-pEJ-8Pm-DSr@api.mobility.hyundai.ru:5672', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            const exchange = 'triggers'; // очерь куда конектиться
            // для каждой машинки создается очередь типа devise_logs_$SIM_ID
            // $SIM_ID свой для каждой машины


            channel.assertQueue('', {
                exclusive: true
            }, function(error2, q) {
                if (error2) {
                    throw error2;
                }
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                channel.bindQueue(q.queue, exchange, '');

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
