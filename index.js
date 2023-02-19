const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();
require('dotenv').config();

app.use('*', cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
});

app.use(express.json());
app.use(router);

const port = process.env.PORT;
app.listen(port, () => console.log(`http://localhost:${port}`));