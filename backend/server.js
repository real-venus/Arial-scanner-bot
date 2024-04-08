const websocekt = require('./ws');
const websocektKline = require('./websocket_klines');
const websocketBacktest = require('./backtesting');

exports = module.exports = server = (app, io) => {
    const getData = (data) => {
        app.token1min = data;
    }

    const getRealData = (data) => {
        app.realTimeTokens = data;
    }

    const getBackTestData = (data) => {
        app.backTestData = data;
    }

    websocekt.getRealTimeData(getRealData);
    websocektKline.getRealTimeData(getData);
    websocketBacktest.getBaskTestDataSeries(getBackTestData);
    io.on('connection', (socket) => {
        console.log(`--- A socket ${socket.id} connected! ---`);

        socket.emit('token1min', app.token1min);
        socket.emit('backTestData', app.backTestData);
        setInterval(() => {
            socket.emit('token1min', app.token1min);
        }, 5000);

        setInterval(() => {
            socket.emit('realTimeData', app.realTimeTokens);
        }, 1000);
        setInterval(() => {
            socket.emit('backTestData', app.backTestData);
        }, 5000);

        socket.on('disconnect', () => {
            console.log('disconnected');
        });
    });
}