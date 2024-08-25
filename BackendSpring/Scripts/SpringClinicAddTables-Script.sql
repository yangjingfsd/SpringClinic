CREATE DATABASE IF NOT EXISTS `springclinicdatabase`;
USE `springclinicdatabase`;

DROP TABLE IF EXISTS `authorities`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `enabled` tinyint NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `users` VALUES 
('john@smith.com','{noop}test1234',1),
('mary@swift.com','{noop}test1234',1),
('susan@email.com','{noop}test1234',1),
('james@email.com','{noop}test1234',1),
('jimmy@email.com','{noop}test1234',1),
('anne@email.com','{noop}test1234',1);


CREATE TABLE `authorities` (
  `username` varchar(50) NOT NULL,
  `authority` varchar(50) NOT NULL,
  UNIQUE KEY `authorities_idx_1` (`username`,`authority`),
  CONSTRAINT `authorities_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `authorities` VALUES 
('john@smith.com','ROLE_PATIENT'),
('mary@swift.com','ROLE_PATIENT'),
('susan@email.com','ROLE_DOCTOR'),
('james@email.com','ROLE_DOCTOR'),
('jimmy@email.com','ROLE_DOCTOR'),
('anne@email.com','ROLE_DOCTOR');


DROP TABLE IF EXISTS `patients`;
CREATE TABLE `patients` (
  `patid` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `gender` varchar(2) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `birthday` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`patid`),
  FOREIGN KEY (`email`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


INSERT INTO `patients` VALUES 
	(1,'John Smith','M','john@smith.com', '123-456-7890', '10/01/1977', '1 main street, Montreal, QC A1B 2C3'),
	(2,'Mary Swift','F','mary@swift.com', '321-456-7890', '12/01/1987', '5 rain ave, Montreal, QC B1C 2D3');

DROP TABLE IF EXISTS `doctors`;
CREATE TABLE `doctors` (
  `docid` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `gender` varchar(2) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `expertise` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`docid`),
  FOREIGN KEY (`email`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


INSERT INTO `doctors` VALUES 
	(1, 'Susan Vanila', 'F', 'susan@email.com', '234-567-78901', 'family, pediatric, ophthalmology'),
	(2, 'James Bond', 'M', 'james@email.com', '234-567-78901', 'orthopedics, surgical'),
	(3, 'Jimmy Walter', 'M', 'jimmy@email.com', '234-567-78901', 'orthopedics, family'),
	(4, 'Anne Gilbert','F', 'anne@email.com', '234-567-78901', 'pediatric, surgical');
    
    
DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments` (
  `appid` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `docid` BIGINT(20) DEFAULT NULL,
  `patid` BIGINT(20) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  `service` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`appid`),
  FOREIGN KEY (`docid`) REFERENCES `doctors` (`docid`),
  FOREIGN KEY (`patid`) REFERENCES `patients` (`patid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


INSERT INTO `appointments` VALUES 
 	(1, 1, 1, '2025-05-22', '10:00', 'family'),
 	(2, 2, 2, '2024-08-25', '11:00', 'orthopedics'),
 	(3, 3, 1, '2024-09-12', '14:00', 'family'),
 	(4, 1, 1, '2024-09-12', '14:00', 'ophthalmology');
    
UNLOCK TABLES;


USE springclinicdatabase;

INSERT INTO `users` VALUES 
('locus@whoever.com','{noop}test1234',1),
('craig@unknown.com','{noop}test1234',1),
('david@someone.com','{noop}test1234',1);

INSERT INTO `authorities` VALUES 
('locus@whoever.com','ROLE_PATIENT'),
('craig@unknown.com','ROLE_PATIENT'),
('david@someone.com','ROLE_PATIENT');

INSERT INTO `patients` VALUES 
	(3,'Locus Whoever','M','locus@whoever.com', '123-456-7890', '10/01/1977', '1 main street, Montreal, QC A1B 2C3'),
	(4,'Craig Unknown','F','craig@unknown.com', '321-456-7890', '12/01/1987', '5 rain ave, Montreal, QC B1C 2D3'),
	(5,'David Someone','M','david@someone.com', '123-456-7890', '10/01/1977', '1 forest road, Montreal, QC A1B 2C3');


USE springclinicdatabase;

SELECT A.appid, B.name AS docname, C.name as patname, A.date, A.time, A.service FROM appointments AS A INNER JOIN doctors as B ON (A.docid=B.docid) INNER JOIN patients AS C ON (A.patid=C.patid);