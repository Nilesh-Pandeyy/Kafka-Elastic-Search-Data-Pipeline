const express = require('express');
const produceMessage = require('./producer');
const { Client } = require('@elastic/elasticsearch');
const app = express();

app.use(express.json());

const client = new Client({
  node: 'http://localhost:9200',
  // Optionally, you can specify additional settings here
  // e.g., headers: { 'Content-Type': 'application/json' }
});
/*
app.post('/ecs-service/create/:username', (req, res) => {
  const username = req.params.username;
  
  // Produce message to Kafka topic
  produceMessage('kapslog-social-media', username);

  res.status(200).send('Profile completed and message produced.');
});
*/

app.post('/ecs-service/create/:username', (req, res) => {
    const username = req.params.username;
    const profilePhotoUrl = req.body.profilePhotoUrl; // Correctly extract profile photo URL from request body
  
    // Produce message to Kafka topic
    produceMessage('kapslog-social-media', { username, profilePhotoUrl }); // Send both username and profile photo URL
  
    res.status(200).send('Profile completed and message produced.');
  });

app.post('/ecs-service/search1/:username', async (req, res) => {
    const { username } = req.params; // Extract username from URL parameters
    
    try {
        console.log("Enter try block");

        // Step 1: Fetch all documents from the index
        const result = await client.search({
            index: 'kapslog-social-media_index',
            body: {
                query: {
                    match_all: {} // Fetch all documents
                }
            }
        });

        // Step 2: Filter the fetched documents based on the username
        const extractedData = result.body.hits.hits
            .map(hit => {
                const message = JSON.parse(hit._source.message);
                return {
                    username: message.username,
                    profilePhotoUrl: message.profilePhotoUrl
                };
            })
            .filter(data => {
                if (username.length === 1) {
                    // Single-letter search: check if the username starts with the single letter
                    return data.username.startsWith(username);
                } else {
                    // Longer search: check if the username matches or partially matches
                    return data.username.includes(username);
                }
            });

        // Send the filtered data as the response
        res.json(extractedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from Elasticsearch');
    }
});







  







app.post('/ecs-service/search/:username', async (req, res) => {
    const username  = req.params.username;
    
    try {
      const { body } = await client.search({
        index: 'kapslog-social-media_index',
        body: {
          query: {
            multi_match: {
              query: username,
              fields: ['message'] // Adjust fields as necessary
            }
          }
        }
      });
  
      res.status(200).json(body.hits.hits);
    } catch (error) {
      console.error('Elasticsearch search error:', error);
      res.status(500).send('Error searching users.');
    }
});

app.get('/ecs-service/all-data', async (req, res) => {
    try {
        const { body } = await client.search({
            index: 'kapslog-social-media_index',
            body: {
                query: {
                    match_all: {}
                },
                _source: true // Fetch all fields
            }
        });

        res.status(200).json(body.hits.hits);
    } catch (error) {
        console.error('Elasticsearch fetch all data error:', error);
        res.status(500).send('Error fetching all data.');
    }
});

app.listen(8100, () => {
  console.log('Server is running on port 8100');
});
