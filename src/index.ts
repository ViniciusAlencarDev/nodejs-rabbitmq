import amqplib from 'amqplib';

amqplib.connect('amqp://localhost', (err0: any, connection: any) => {
    if (err0) {
        throw err0;
    }

    connection.createChannel(function (err1: any, channel: any) {
        if (err1) {
            throw err1;
        }

        var queue = 'example';
        var msg = 'New message';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log("Message Sent:", msg);

        channel.consume(queue, (msg: any) => {
            console.log("Message Receive:", msg.content.toString());
        }, {
            noAck: true
        });
    });
});
