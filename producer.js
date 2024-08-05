/*const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:29092' });
const producer = new Producer(client);

producer.on('ready', () => {
  console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (error) => {
  console.error('Kafka Producer error:', error);
});

const produceMessage = (topic, message) => {
  const payloads = [{ topic: topic, messages: JSON.stringify(message) }];
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Error producing message:', err);
    } else {
      console.log('Message produced:', data);
    }
  });
};

module.exports = produceMessage;
*/
const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:29092' });
const producer = new Producer(client);

// Event handler for the producer when it's ready
producer.on('ready', () => {
  console.log('Kafka Producer is connected and ready.');
});

// Event handler for the producer when an error occurs
producer.on('error', (error) => {
  console.error('Kafka Producer error:', error);
});

// Function to produce a message to a specified Kafka topic
const produceMessage = (topic, message) => {
  const payloads = [{ topic: topic, messages: JSON.stringify(message) }];
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Error producing message:', err);
    } else {
      console.log('Message produced:', data);
    }
  });
};

// Export the produceMessage function for use in other modules
module.exports = produceMessage;

