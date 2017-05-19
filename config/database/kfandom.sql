DROP DATABASE IF EXISTS kfandom;
CREATE DATABASE IF NOT EXISTS kfandom;
USE kfandom;

CREATE TABLE user(
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(20) NOT NULL,
	password VARCHAR(60) NOT NULL,
	email VARCHAR(254) NOT NULL,
	contact VARCHAR(20) NOT NULL,
	type CHAR(1) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE KEY (username)
);

DROP USER 'administrator'@'%';

CREATE USER 'administrator'@'%' IDENTIFIED BY 'password1';

GRANT SELECT, INSERT, DELETE, UPDATE ON kfandom.* TO 'administrator'@'%';
GRANT SELECT ON kfandom.* to 'administrator'@'%';