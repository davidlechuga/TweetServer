var express = require('express');
const config = require ('./config')
require('dotenv').config()
var app = express();

app.use(require('cors')());
app.use(require('body-parser').json());


app.get('/tweets',async (req,res) => {

    const params = {count:1, tweet_mode: 'extended' };
    const dataTweets = await config.apiClient.get('statuses/home_timeline', params)
    .then((data)=>{
        console.log(data)
        return data;
    }
    )

    console.log('Data tweets')
    console.log(dataTweets)

    res.json({
            success: true,
            message: "Tweets Ok",
            payload: {tweets: dataTweets}

    })

    const {tweets} = payload;
    const {data} = tweets;
    console.log(data)

    // .then(timeline => {
    //     console.log(timeline.data)
    //     res.json({
    //         success: true,
    //         message: "Tweets Ok",
    //         payload: {tweets: timeline}
    //     })
    // })
    // .catch(error => {
    //     res.send(error)
    // })
});

app.get('/search/:word',(req,res) => {

    const params = {count:1, tweet_mode: 'extended', q: req.params.word, result_type: 'recent', lang: 'es'};
    config.apiClient.get('search/tweets', params)
    .then(results => {
        res.send(results)
    })
    .catch(error => {
        res.send(error)
    })
});



const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2019-07-12',
  authenticator: new IamAuthenticator({
    apikey: process.env.API_KEY,
  }),
  url: process.env.URL
});

const analyzeParams = {
  'url': 'https://api.twitter.com/1.1/search/tweets',
  'features': {
    'sentiment': {
      
    }
  }
};

naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });






app.listen(config.port,() => {

    console.log(`runing on port ${config.port}`);
    

});