// set logging
function consoleLoggerProvider(name) {
    // do something with the name
    return {
        debug: console.debug.bind(console),
        info: console.info.bind(console),
        warn: console.warn.bind(console),
        error: console.error.bind(console)
    };
}

// first configure the logger provider
const kafkaLogging = require('kafka-node/logging');
kafkaLogging.setLoggerProvider(consoleLoggerProvider);

// then require kafka-node and continue as normal
const kafka = require('kafka-node');
var ConsumerGroup = kafka.ConsumerGroup;

var options = {
    kafkaHost: 'localhost:9092', // connect directly to kafka broker (instantiates a KafkaClient)
    batch: undefined, // put client batch settings if you need them
    ssl: true, // optional (defaults to false) or tls options hash
    groupId: 'kafka-cg',
    sessionTimeout: 15000,
    // An array of partition assignment protocols ordered by preference.
    // 'roundrobin' or 'range' string for built ins (see below to pass in custom assignment protocol)
    protocol: ['roundrobin'],
    encoding: 'utf8', // default is utf8, use 'buffer' for binary data

    // Offsets to use for new groups other options could be 'earliest' or 'none' (none will emit an error if no offsets were saved)
    // equivalent to Java client's auto.offset.reset
    fromOffset: 'earliest', // default
    commitOffsetsOnFirstJoin: true, // on the very first time this consumer group subscribes to a topic, record the offset returned in fromOffset (latest/earliest)
    // how to recover from OutOfRangeOffset error (where save offset is past server retention) accepts same value as fromOffset
    outOfRangeOffset: 'earliest', // default
    // Callback to allow consumers with autoCommit false a chance to commit before a rebalance finishes
    // isAlreadyMember will be false on the first connection, and true on rebalances triggered after that
    onRebalance: (isAlreadyMember, callback) => { callback(); } // or null
};

var consumerGroup = new ConsumerGroup(options, 'poc-topic');

consumerGroup.on('message', function (message) {
    console.log(message);
});

consumerGroup.on('error', function (error) {
    console.log(error);
});


consumerGroup.on('connect', function () {
    console.log('connected')
});

console.log('Started---')
