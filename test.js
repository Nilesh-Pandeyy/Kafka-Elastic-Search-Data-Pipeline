const searchResults = {
    "took": 1,
    "timed_out": false,
    "_shards": {
      "total": 1,
      "successful": 1,
      "skipped": 0,
      "failed": 0
    },
    "hits": {
      "total": {
        "value": 2,
        "relation": "eq"
      },
      "max_score": 1.0,
      "hits": [
        {
          "_index": "kapslog-social-media_index",
          "_type": "_doc",
          "_id": "a80VE5EBPwLidaLIcknm",
          "_score": 1.0,
          "_source": {
            "message": "{\"username\":\"redis_builder\",\"profilePhotoUrl\":\"http://example.com/himnshu_photo12.jpg\"}",
            "@version": "1",
            "@timestamp": "2024-08-02T12:34:17.893Z"
          }
        },
        {
          "_index": "kapslog-social-media_index",
          "_type": "_doc",
          "_id": "mM0WE5EBPwLidaLIkknr",
          "_score": 1.0,
          "_source": {
            "message": "{\"username\":\"nilesh\",\"profilePhotoUrl\":\"http://example.com/himnshu_photo12.jpg\"}",
            "@version": "1",
            "@timestamp": "2024-08-02T12:35:32.086Z"
          }
        }
      ]
    }
  };
  
  // Extract usernames and profile photo URLs
  const extractedData = searchResults.hits.hits.map(hit => {
    const message = JSON.parse(hit._source.message);
    return {
      username: message.username,
      profilePhotoUrl: message.profilePhotoUrl
    };
  });
  
  console.log(extractedData);
  