const Twitter = require ('twit');
const port = process.env.PORT || 3000;

const apiClient = new Twitter ({

    consumer_key: 'cl3PlwkI81huelMeqzCbSGhUj',
    consumer_secret: 'dEXyJw2uqWVpsgvidy8zluwekRvQalACoPmiSoz0fdnfjUVS4B',
    access_token: '1167944322710429696-j4XoKJTrppQOaKIFPIw3KyIosnfFqH',
    access_token_secret: 'uaxRZWqB9D1Tl2Q1bugx8HvqbM4bV0TOxYTmVu7NPxoD9'
    
});

module.exports = {
    port,
    apiClient
}