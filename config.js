const Twitter = require ('twit');
const port = process.env.PORT || 3003;

const apiClient = new Twitter ({

    consumer_key: 'RjQ6b3ejorTC1HDTLyUIabVDD',
    consumer_secret: '1TFu9jICyxDYz22ysOcrLlQIVqug29mYZhxWqBLEV3E8PCoJxQ',
    access_token: '1167944322710429696-63X6qSTQeSqPnWVaMVlN3aLT6Kq2Y3',
    access_token_secret: 'j5t88S0rELYHqAohyQ3f0wK5orFcbzo1D3W4EhZo65Su0'
    
});

module.exports = {
    port,
    apiClient
}