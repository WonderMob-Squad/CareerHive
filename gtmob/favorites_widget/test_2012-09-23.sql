# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.27)
# Database: test
# Generation Time: 2012-09-24 03:40:35 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table attendants
# ------------------------------------------------------------

DROP TABLE IF EXISTS `attendants`;

CREATE TABLE `attendants` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `company_id` int(11) NOT NULL,
  `booth` varchar(11) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `attendants` WRITE;
/*!40000 ALTER TABLE `attendants` DISABLE KEYS */;

INSERT INTO `attendants` (`id`, `start_date`, `end_date`, `company_id`, `booth`)
VALUES
	(1,'2012-11-29 19:08:17','2012-11-30 18:00:00',1,'A1'),
	(2,'2012-11-29 19:08:20','2012-11-30 18:00:00',2,'A2'),
	(3,'2012-11-29 19:31:59','2012-11-30 18:00:00',3,'A3');

/*!40000 ALTER TABLE `attendants` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table attendants_degree_levels
# ------------------------------------------------------------

DROP TABLE IF EXISTS `attendants_degree_levels`;

CREATE TABLE `attendants_degree_levels` (
  `attendant_id` int(11) unsigned NOT NULL,
  `degree_levels_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`attendant_id`,`degree_levels_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `attendants_degree_levels` WRITE;
/*!40000 ALTER TABLE `attendants_degree_levels` DISABLE KEYS */;

INSERT INTO `attendants_degree_levels` (`attendant_id`, `degree_levels_id`)
VALUES
	(1,1),
	(1,2),
	(2,1),
	(2,2),
	(2,3);

/*!40000 ALTER TABLE `attendants_degree_levels` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table attendants_job_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `attendants_job_types`;

CREATE TABLE `attendants_job_types` (
  `attendant_id` int(11) unsigned NOT NULL,
  `job_type_id` int(11) unsigned NOT NULL,
  `domestic` tinyint(1) NOT NULL,
  PRIMARY KEY (`attendant_id`,`job_type_id`,`domestic`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `attendants_job_types` WRITE;
/*!40000 ALTER TABLE `attendants_job_types` DISABLE KEYS */;

INSERT INTO `attendants_job_types` (`attendant_id`, `job_type_id`, `domestic`)
VALUES
	(1,1,0),
	(1,1,1),
	(1,2,0),
	(1,3,0),
	(2,1,0),
	(2,2,0),
	(2,2,2),
	(2,3,0);

/*!40000 ALTER TABLE `attendants_job_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table attendants_majors
# ------------------------------------------------------------

DROP TABLE IF EXISTS `attendants_majors`;

CREATE TABLE `attendants_majors` (
  `attendant_id` int(11) unsigned NOT NULL,
  `major_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`attendant_id`,`major_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `attendants_majors` WRITE;
/*!40000 ALTER TABLE `attendants_majors` DISABLE KEYS */;

INSERT INTO `attendants_majors` (`attendant_id`, `major_id`)
VALUES
	(1,1),
	(1,2),
	(1,3),
	(1,4),
	(2,1),
	(2,2);

/*!40000 ALTER TABLE `attendants_majors` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table attendants_work_auth_levels
# ------------------------------------------------------------

DROP TABLE IF EXISTS `attendants_work_auth_levels`;

CREATE TABLE `attendants_work_auth_levels` (
  `attendant_id` int(11) unsigned NOT NULL,
  `work_auth_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`attendant_id`,`work_auth_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `attendants_work_auth_levels` WRITE;
/*!40000 ALTER TABLE `attendants_work_auth_levels` DISABLE KEYS */;

INSERT INTO `attendants_work_auth_levels` (`attendant_id`, `work_auth_id`)
VALUES
	(1,1),
	(1,2),
	(1,3),
	(2,1),
	(2,2);

/*!40000 ALTER TABLE `attendants_work_auth_levels` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table companies
# ------------------------------------------------------------

DROP TABLE IF EXISTS `companies`;

CREATE TABLE `companies` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;

INSERT INTO `companies` (`id`, `name`)
VALUES
	(1,'3D Systems'),
	(2,'Adobe'),
	(3,'Microsoft'),
	(4,'Airwatch'),
	(5,'Google');

/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table degree_levels
# ------------------------------------------------------------

DROP TABLE IF EXISTS `degree_levels`;

CREATE TABLE `degree_levels` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(5) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `degree_levels` WRITE;
/*!40000 ALTER TABLE `degree_levels` DISABLE KEYS */;

INSERT INTO `degree_levels` (`id`, `name`)
VALUES
	(1,'BS'),
	(2,'MS'),
	(3,'BA'),
	(4,'PhD');

/*!40000 ALTER TABLE `degree_levels` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table favorites
# ------------------------------------------------------------

DROP TABLE IF EXISTS `favorites`;

CREATE TABLE `favorites` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `attendant_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;

INSERT INTO `favorites` (`id`, `user_id`, `attendant_id`)
VALUES
	(1,1,1),
	(2,1,2),
	(3,2,3);

/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table job_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `job_types`;

CREATE TABLE `job_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `job_types` WRITE;
/*!40000 ALTER TABLE `job_types` DISABLE KEYS */;

INSERT INTO `job_types` (`id`, `name`)
VALUES
	(1,'Co-op'),
	(2,'Internship'),
	(3,'Full-time'),
	(4,'Part-time'),
	(5,'Contractor');

/*!40000 ALTER TABLE `job_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table majors
# ------------------------------------------------------------

DROP TABLE IF EXISTS `majors`;

CREATE TABLE `majors` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `majors` WRITE;
/*!40000 ALTER TABLE `majors` DISABLE KEYS */;

INSERT INTO `majors` (`id`, `name`)
VALUES
	(1,'Computer Science'),
	(2,'Aerospace Engineering'),
	(3,'Biology'),
	(4,'Industrial Engineering'),
	(5,'Mechanical Engineering'),
	(6,'Civil Engineering'),
	(7,'Business Administration'),
	(8,'Computer Engineering');

/*!40000 ALTER TABLE `majors` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`)
VALUES
	(1,'sarahub@gmail.com'),
	(2,'sagarsavla@gmail.com');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table work_authorization_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `work_authorization_types`;

CREATE TABLE `work_authorization_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `work_authorization_types` WRITE;
/*!40000 ALTER TABLE `work_authorization_types` DISABLE KEYS */;

INSERT INTO `work_authorization_types` (`id`, `name`)
VALUES
	(1,'H-1 Visa'),
	(2,'US Citizen'),
	(3,'Permanent Resident'),
	(4,'Valid Employment Authorization Document');

/*!40000 ALTER TABLE `work_authorization_types` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
