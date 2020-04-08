const kafka = require('kafka-node');
const bodyParser = require('body-parser');
// const config = require('./config');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

try {
    // console.log(this._opts)
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient('localhost:9092');
    const producer = new Producer(client, { partitionerType: 3 });
    // const kafka_topic = 'example';

    //   rest api endpoint//

    app.post('/sendToKafkaProducer', (req, res) => {

        console.log("((((((((((((((((((((((((((")
        // var key =  JSON.stringify(req.body.)

        try {

            let payload = [{
                topic: 'poc-topic',
                messages: JSON.stringify(req.body),
                key: req.body.empId
            }]
            console.log(payload, req.body)

            producer.send(payload, (err, data) => {
                console.log("data", data)
                if (err) {
                    res.status(500).send({
                        success: false,
                        data: null,
                        error: err
                    })
                }
                else {
                    res.status(200).send({
                        success: true,
                        data: "Sent to consumer!",
                        error: null
                    })
                }
            })

        }
        catch (e) {

            res.status(500).send({
                success: false,
                data: null,
                error: e
            })

        }


    })
}
catch (e) {
    console.log(e);
}


app.listen(4588, () => {
    console.log('app is listening to port 4588')
})


//********************************************* */