
const axios = require('axios');
exports.getBaskTestDataSeries = async (getBackTestData) => {

    var backTestData = [];
    const response = await axios.get('https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=1m&startTime=1648876800000&endTime=1648963200000&limit=1000');
    const tokenData = response.data;
    await Promise.all(
        tokenData.map(async (item) => {
            backTestData.push({
                'openTime' : item[0],
                'openPrice' : item[1],
                'highPrice' : item[2],
                'lowPrice' : item[3],
                'closePrice' : item[4],
                'volume' : item[5],
                'QuoteAssetVolume' : item[7],
                'NumberofTrades' : item[8],
                'TakerBuyBaseAssetVolume' : item[9],
                'TakerBuyQuoteAssetVolume' : item[10]
            });
        })
    ).then(() => {
        getBackTestData({
            'backTestData' : backTestData,
            'status' : 'ok',
        });
    }).catch((error) => {
        getBackTestData({
            'backTestData' : [],
            'status' : 'error',
        })
        console.log('error:', error);
    });

}


// [
//     [
//       1499040000000,      // Kline open time
//       "0.01634790",       // Open price
//       "0.80000000",       // High price
//       "0.01575800",       // Low price
//       "0.01577100",       // Close price
//       "148976.11427815",  // Volume
//       1499644799999,      // Kline Close time
//       "2434.19055334",    // Quote asset volume
//       308,                // Number of trades
//       "1756.87402397",    // Taker buy base asset volume
//       "28.46694368",      // Taker buy quote asset volume
//       "0"                 // Unused field, ignore.
//     ]
//   ]