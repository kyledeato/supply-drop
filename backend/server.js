const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const cookieParser = require('cookie-parser');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
// const io = new Server(server);
const jwt = require('jsonwebtoken');

require('./configs/mongoose.configs');
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/img/', express.static(__dirname + '/uploads'));
require('./routes/supply_drop.routes')(app);
require('dotenv').config();
require('./routes/socketChat')(io);

const port = 8000;

// app.listen(port, () => console.log(`Listening on port: ${port}`));
server.listen(port, () => console.log(`Listening on port: ${port}`));
