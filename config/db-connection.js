'use strict'

const connection1 = require('./../config/db-admin-connection.js');

exports.userType = (type) => {
	switch(type){
		case 'A':
			return connection1;
		//default:
			//return connection2;				//for guest
	}
}