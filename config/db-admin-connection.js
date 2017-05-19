'use strict'

const mysql = require('mysql');
const DBHOST = process.env.DBHOST === undefined ? 'localhost' : process.env.DBHOST;

const connection = mysql.createConnection({
	host: DBHOST,
	user: 'administrator',
	password: 'password1',
	db: 'kfandom',
	dateStrings: true
});

connection.connect((err) => {
	if(!err){
		console.log('Admin database connected.');
	}else{
		console.log('Error in admin database connection.');
	}
});

connection.query('USE kfandom');
module.exports = connection;
