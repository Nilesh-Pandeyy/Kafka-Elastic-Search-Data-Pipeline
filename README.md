# Kafka-Elastic-Search-Data-Pipeline
This repository contains a Node.js Express application designed to interact with Elasticsearch to perform search operations. It also includes a data pipeline setup using Kafka, Logstash, and Elasticsearch for efficient data ingestion and processing.

Project Structure :

server.js: Main application file containing the Express server setup and the API endpoint for searching usernames.

Dockerfile: Optimized Dockerfile for building the application image.

kafka: Configuration and setup files for Kafka.

logstash: Configuration files for Logstash to process and forward data to Elasticsearch.

elasticsearch: Configuration files for Elasticsearch setup


Data Pipeline :

The data pipeline consists of the following components:

Kafka: Acts as the message broker, ingesting data from various sources.

Logstash: Processes the data from Kafka, applying transformations and filters before forwarding it to Elasticsearch.

Elasticsearch: Stores the processed data and provides search and analytics capabilities.

API Endpoint :
POST /ecs-service/search1/your-username

Parameters:

username (URL parameter):
The username or prefix to search for.

Description: Searches for usernames in Elasticsearch, returning all usernames starting with the provided prefix or matching exactly.


Create Username

Endpoint: POST /ecs-service/create

Parameters:

Body Parameters:
username (string): The username to create.
profilePhotoUrl (string): The URL of the profile photo.


