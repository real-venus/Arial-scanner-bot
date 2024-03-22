const websocekt = require('./ws');
const websocektKline = require('./websocket_klines');
const websocketBacktest = require('./backtesting');

let token1min = {};
let realTimeTokens = {}; 
let backTestData = {};
const getData = (data) => {
    token1min = data;
}

const getRealData = (data) => {
    realTimeTokens = data;
}

const getBackTestData = (data) => {
    backTestData = data;
}

websocekt.getRealTimeData(getRealData);
websocektKline.getRealTimeData(getData);
websocketBacktest.getBaskTestDataSeries(getBackTestData);

exports = module.exports = server = (io) => {
    io.on('connection', (socket) => {
        console.log(`--- A socket ${socket.id} connected! ---`);
        
        socket.emit('token1min', token1min);
        socket.emit('backTestData', backTestData);
        setInterval(() => {
            socket.emit('token1min', token1min);
        }, 5000);

        setInterval(() => {
            socket.emit('realTimeData', realTimeTokens);
        }, 1000);
        setInterval(() => {
            socket.emit('backTestData', backTestData);
        }, 5000);

        socket.on('disconnect', () => {
            console.log('disconnected');
        });
    });
}