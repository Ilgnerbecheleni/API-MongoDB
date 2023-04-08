const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//conecta ao banco
mongoose.connect(config.connectionString);

//carrega os Models
const Product = require('./Models/Product')
const customer = require('./Models/Customer')
const Order = require('./Models/Order')

//carrega rotas
const index = require('../routes/index');
const productRoute = require('../routes/Product.js');
const customerRoute = require('../routes/Customer');
const orderRoute = require('../routes/Order');


//app
app.use('/', index);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app
