const express = require('express');
// const cookieParser = require('cookie-parser');

const app = express();

var cors = require('cors');

app.use(cors());

app.use(express.json());
// app.use(cookieParser());

app.use(function(req, res, next) {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});


// app.use('/api/v1/auth', authRoutes);


module.exports = app;
