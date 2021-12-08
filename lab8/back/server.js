const path = require('path');
const express = require('express');
const cors = require('cors');

// Database
const monk = require('monk');
const db = monk('localhost:27017/agensydb');

const productRouter = require('./routes/products');


const app = express();

app.use(cors());

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/products', productRouter);


const host = "localhost";
const port = "3000";
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`)
});

module.exports = app;
