var express = require('express');
const config = require('./config');
require('dotenv').config();
var app = express();

app.use(require('cors')());
app.use(require('body-parser').json());

/* ::::::::  EXTRACCION DE LOS ULTIMOS TWITS  ::::::::.  */

// app.get('/tweets', async (req, res) => {
// 	const params = { count: 3, tweet_mode: 'extended' };
// 	const dataTweets = await config.apiClient.get('statuses/home_timeline', params).then((data) => {
// 		console.log(`aquiiii esta la :${data}`);
// 		return data;
// 	});

// 	console.log('Data tweets');
// 	console.log(dataTweets);

// 	res.json({
// 		success: true,
// 		message: 'Tweets Ok',
// 		payload: { tweets: dataTweets }
// 	});
// });

/* ::::::::  EXTRACCION DE LOS TWITS POR PALABRA CLAVE  ::::::::.  */

var textoASubir = [];
var textoASubir = new Array();

app.get('/search/:word', (req, res) => {
	const params = { count: 100, tweet_mode: 'extended', q: req.params.word, result_type: 'recent', lang: 'es' };
	config.apiClient
		.get('search/tweets', params)
		.then((data) => {
			res.send(data.data.statuses.full_text);
			data.data.statuses.forEach((twit) => {
			// console.log('twit: ' + twit.full_text);
			});
			// console.log(data.data.statuses[0].full_text);
			// console.log(data.data.statuses[1].full_text);
      // console.log(data.data.statuses[2].full_text);
      
      textoASubir[0] = data.data.statuses[0].full_text;
      // console.log(  ` comentario 1 ${ textoASubir[0] }`);
       textoASubir[1] = data.data.statuses[1].full_text;
      // console.log( ` comentario 2 ${ textoASubir[1] }` );
       textoASubir[2] = data.data.statuses[2].full_text;
      // console.log( ` comentario 3 ${ textoASubir[2] }` );
      textoASubir[3] += textoASubir[0] + textoASubir[1] + textoASubir[2];
      console.log(textoASubir[3]);

      
      
		})
		.catch((error) => {
			res.send(error);
		});
});



// config.apiClient.get('search/tweets', { q: '#marihuana' }, function(error, tweets, response) {
// 	tweets.statuses.forEach(function(tweet) {
// 		console.log('tweet: ' + tweet.text);
// 	});
// });

/* ::::::::  PALABRAS CLAVE IBM ::::::::.  */

app.get('/resumenes', async (req, res) => {
	const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
	const { IamAuthenticator } = require('ibm-watson/auth');

	const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
		version: '2019-07-12',
		authenticator: new IamAuthenticator({
			apikey: process.env.API_KEY
		}),
		url: process.env.URL
	});

	const analyzeParams1 = {
		url: 'https://twiitgov.herokuapp.com/',
		features: {
			entities: {
				sentiment: true,
				emotion: true,
				limit: 3
			},
			keywords: {
				sentiment: true,
				emotion: true,
				limit: 3
			}
    },

	};

	naturalLanguageUnderstanding
		.analyze(analyzeParams1)
		.then((analysisResults) => {
			res.send(analysisResults);
			console.log(analysisResults.result.keywords[0]);
			console.log(analysisResults.result.keywords[1]);
			console.log(analysisResults.result.keywords[2]);
			// res.json({
			// 	success: true,
			// 	message: 'IBM ANALYZER',
			// 	payload: data.result.keywords
			// });
		})
		.catch((err) => {
			console.log('error:', err);
		});

	/* ::::::::  ENTIDADES IBM ::::::::.  */

	// const NaturalLanguageUnderstandingV2 = require('ibm-watson/natural-language-understanding/v1');
	// const { IamAuthenticator: iam2 } = require('ibm-watson/auth');

	// const naturalLanguageUnderstanding1 = new NaturalLanguageUnderstandingV2({
	// 	version: '2019-07-12',
	// 	//SACAMOS UNA LA LLAVE CON UNA DESESTRUCTURACION Y CAMBIAMOS EL NOMBRE DE LA CONSTANTE.
	// 	authenticator: new iam2({
	// 		apikey: process.env.API_KEY
	// 	}),
	// 	url: process.env.URL
	// });

	// const analyzeParams = {
	// 	url: 'https://twiitgov.mybluemix.net/search/Trump',
	// 	features: {
	// 		entities: {
	// 			sentiment: true,
	// 			limit: 1
	// 		}
	// 	}
	// };

	// naturalLanguageUnderstanding1
	// 	.analyze(analyzeParams)
	// 	.then((analysisResults) => {
	// 		console.log(JSON.stringify(analysisResults, null, 2));
	// 		res.json({
	// 			success: true,
	// 			message: 'IBM ENTITIES',
	// 			payload: data.result.entities
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		console.log('error:', err);
	// 	});
});

/* ::::::::  SENTIMIENTO IBM ::::::::.  */

// const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');

// const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
//   version: '2019-07-12',
//   authenticator: new IamAuthenticator({
//     apikey: process.env.API_KEY,
//   }),
//   url: process.env.URL
// });

// const analyzeParams = {
//   'url': 'https://twiitgov.mybluemix.net/search/AMLO',
//   'features': {
//     'sentiment': {
//       'targets': [
//         'data'
//       ]
//     }
//   }
// };

// naturalLanguageUnderstanding.analyze(analyzeParams)
//   .then(analysisResults => {
//     console.log(JSON.stringify(analysisResults, null, 2));
//   })
//   .catch(err => {
//     console.log('error:', err);
//   });

/* ::::::::  CATEGORIES IBM  ::::::::  */

// const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');

// const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
//   version: '2019-07-12',
//   authenticator: new IamAuthenticator({
//     apikey: process.env.API_KEY,
//   }),
//   url: process.env.URL,
// });

// const analyzeParams = {
//   'url': 'https://twiitgov.mybluemix.net/search/marihuana',
//   'features': {
//     'categories': {
//       'limit': 3
//     }
//   }
// };

// naturalLanguageUnderstanding.analyze(analyzeParams)
//   .then(analysisResults => {
//     console.log(JSON.stringify(analysisResults, null, 2));
//   })
//   .catch(err => {
//     console.log('error:', err);
//   });

/* ::::::::  EMOCIONES IBM ::::::::.  */

// const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
// const { IamAuthenticator } = require('ibm-watson/auth');

// const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
//   version: '2019-07-12',
//   authenticator: new IamAuthenticator({
//     apikey: process.env.API_KEY
//   }),
//   url: process.env.URL
// });

// const analyzeParams = {
//   'url': 'https://twiitgov.mybluemix.net/search/Trump',
//     'features': {
//     'emotion': {
//       'targets': [
//         'data'
//       ]
//     }
//   }
// };

// naturalLanguageUnderstanding.analyze(analyzeParams)
//   .then(analysisResults => {
//     console.log(JSON.stringify(analysisResults, null, 2));
//   })
//   .catch(err => {
//     console.log('error:', err);
//   });

app.listen(config.port, () => {
	console.log(`runing on port ${config.port}`);
});
