const express = require('express');
const cookieSession = require('cookie-session');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

var routes = require('./routes/router');

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
	secret: '4d47666cbf66d966eabbb17277e662f7578a888102f9e7451c72d69e09454671' //sha256 for kfandom
}));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(routes);

app.get('*', function(req, res) {					//if weird yung ininput na url then redirect lang to homepage
  res.redirect('/')
});

app.listen(app.get('port'), function(){
	console.log('Server running at localhost:' +app.get('port'));
});