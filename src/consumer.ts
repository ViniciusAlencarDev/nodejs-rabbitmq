import amqplib from 'amqplib';

const msg: Array<any> = []

amqplib.connect('amqp://localhost', (err0: any, connection: any) => {
    if (err0) {
        throw err0;
    }

    connection.createChannel(function (err1: any, channel: any) {
        if (err1) {
            throw err1;
        }

        var queue = 'example';

        channel.consume(queue, (msg: any) => {
            console.log("Message Receive:", msg.content.toString());
            msg.push(msg.content.toString())
        }, {
            noAck: true
        });
    });
});

function getMessages(filter: any): Array<any> {
    return msg.filter(filter);
}
