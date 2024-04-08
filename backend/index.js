
const cors = require('cors');
const express = require("express");
const http = require('http');

const app = express();
app.use(cors());

const PORT_ClIENT = 3001;
const PORT_SOCKET = 80;

const socket = require('./server');

app.get('/realTimeTokens', (req, res) => {
    res.json(app.realTimeTokens)
});

app.get('/token1min', (req, res) => {
    res.json(app.token1min)
});

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
});

socket(app, io);

server.listen(PORT_SOCKET, () => { console.log('listening on: 4000'); });