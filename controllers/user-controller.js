'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
	let query = 'SELECT * FROM user WHERE username = ?';

	connection.userType('A').query(query, [ 
		req.body.username 
	], (err, rows) => {
		if(!err){
			//console.log(rows[0]);
			if(rows[0].length != 0){
				bcrypt.compare(req.body.password, rows[0].password, (err, isCorrect) => {
					if(isCorrect){
						req.session.user = {
							id: rows[0].id,
							username: rows[0].username,
							type: rows[0].type
						}
						return res.status(200).send({ 'message' : 'Successfully logged in'});
					} else {
						return res.status(401).json({ 'message' : 'Incorrect password', 'userdata' : rows[0]}).status(401);
					}
				});
			}else{
				return res.status(404).send({ 'message' : 'Username does not exist.'});
			}
		}else{
			console.log(err);
			return res.status(500).send({'message': 'Unknown error.'});
		}
	});
}
exports.register = (req, res) => {
	let insert_query = 'INSERT INTO user (username, password, email, contact, type) values(?, ?, ?, ?, ?)';

	connection.userType('A').query(insert_query, [
		req.body.username,
		req.body.password,
		req.body.email,
		req.body.contact,
		req.body.type
	], (err, rows) => {
		if(!err){
			req.session.user = {
				id: rows.insertId,
				username: req.body.username,
				type: req.body.type
			}

			res.status(200).send(rows);
			return rows;
		}else{
			if (err.code == 'ER_BAD_NULL_ERROR') return res.status(500).send({ 'message' : 'Missing field'});
			else if (err.code == 'ER_DUP_ENTRY') return res.status(500).send({ 'message' : 'Duplicate user' });
			else return res.status(500).send({ 'message': 'Unknown' });
		}
	});
}