const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/AuthRoutes');
const productRoutes = require('./routes/ProductRoutes');
const cookieSession = require('cookie-session');

const app = express();

app.use(cookieSession({
	name: 'session',
	keys: ['key1', 'key2'],

	maxAge: 24 * 60 * 60 * 1000
}))

var cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use(function(req, res, next) {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);


module.exports = app;
