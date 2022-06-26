const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

require('./configs/mongoose.configs');
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/img/', express.static(__dirname + '/uploads'));
require('./routes/supply_drop.routes')(app);
require('dotenv').config();

const port = 8000;

app.listen(port, () => console.log(`Listening on port: ${port}`));
