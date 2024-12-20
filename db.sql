/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 10.4.32-MariaDB : Database - registra
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`registra` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;

USE `registra`;

/*Table structure for table `activesessions` */

DROP TABLE IF EXISTS `activesessions`;

CREATE TABLE `activesessions` (
  `sessionId` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`sessionId`),
  KEY `userId` (`userId`),
  CONSTRAINT `activesessions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `activesessions` */

insert  into `activesessions`(`sessionId`,`userId`,`createdAt`,`updatedAt`) values 
('g4i4pp9v7',30,'2024-12-20 17:42:22','2024-12-20 17:42:22'),
('mi7apdslu',1,'2024-12-20 17:40:31','2024-12-20 17:40:31');

/*Table structure for table `availability` */

DROP TABLE IF EXISTS `availability`;

CREATE TABLE `availability` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `availability` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `availability` */

insert  into `availability`(`id`,`availability`) values 
(1,'Disponible'),
(2,'En uso');

/*Table structure for table `cities` */

DROP TABLE IF EXISTS `cities`;

CREATE TABLE `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nameCity` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `cities` */

insert  into `cities`(`id`,`nameCity`) values 
(1,'Mocoa'),
(2,'Sibundoy'),
(3,'Santiago'),
(4,'Villagarzon'),
(5,'Puerto Caicedo'),
(6,'Puerto Asis'),
(7,'Puerto Guzman'),
(8,'Orito'),
(9,'Valle del Guamuez'),
(10,'Puerto Leguizamo'),
(11,'Colon'),
(12,'San Francisco'),
(13,'San Miguel');

/*Table structure for table `condition` */

DROP TABLE IF EXISTS `condition`;

CREATE TABLE `condition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conditionName` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `condition` */

insert  into `condition`(`id`,`conditionName`) values 
(1,'Nuevo'),
(2,'Usado');

/*Table structure for table `elements` */

DROP TABLE IF EXISTS `elements`;

CREATE TABLE `elements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `images` text NOT NULL,
  `elementName` varchar(100) DEFAULT NULL,
  `idElementType` int(11) NOT NULL,
  `material` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `model` varchar(100) DEFAULT NULL,
  `serial` varchar(50) DEFAULT NULL,
  `idCondition` int(11) NOT NULL,
  `idAvailability` int(11) NOT NULL,
  `warranty` varchar(50) DEFAULT NULL,
  `idUser` int(11) NOT NULL,
  `dateCreation` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idElementType` (`idElementType`),
  KEY `idState` (`idCondition`),
  KEY `idUser` (`idUser`),
  KEY `idAvailability` (`idAvailability`),
  CONSTRAINT `elements_ibfk_2` FOREIGN KEY (`idCondition`) REFERENCES `condition` (`id`),
  CONSTRAINT `elements_ibfk_3` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  CONSTRAINT `elements_ibfk_4` FOREIGN KEY (`idElementType`) REFERENCES `elementtypes` (`id`),
  CONSTRAINT `elements_ibfk_5` FOREIGN KEY (`idAvailability`) REFERENCES `availability` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `elements` */

insert  into `elements`(`id`,`images`,`elementName`,`idElementType`,`material`,`color`,`model`,`serial`,`idCondition`,`idAvailability`,`warranty`,`idUser`,`dateCreation`) values 
(15,'uploads/images-1733759082539-819841084.jpg','Iphone 11',1,'Aluminio','Negro','Iphone','IP112019',1,1,'2 Años',1,'2024-11-12 00:00:00'),
(16,'uploads/images-1733759156244-80741329.webp','Apple Macbook Air 2020',1,'Pasta','Gris espacial','Apple 2020','AMB2020',1,1,'1 Año',1,'2024-11-12 00:00:00'),
(17,'uploads/images-1733764175635-529915460.webp','Samsung S24 Ultra',1,'Titanio','Gris Espacial','Samsung','SSU2024',1,1,'1 año',1,'2024-12-03 00:00:00');

/*Table structure for table `elementtypes` */

DROP TABLE IF EXISTS `elementtypes`;

CREATE TABLE `elementtypes` (
  `id` int(11) NOT NULL,
  `elementType` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `elementtypes` */

insert  into `elementtypes`(`id`,`elementType`) values 
(1,'TE001'),
(2,'TE002'),
(3,'TE003'),
(4,'TE004'),
(5,'TE005');

/*Table structure for table `people` */

DROP TABLE IF EXISTS `people`;

CREATE TABLE `people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `idCard` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idCard` (`idCard`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `people` */

insert  into `people`(`id`,`name`,`idCard`,`email`,`phone`,`birthDate`) values 
(1,'camilo','1006934520','camilo@test.com','3123123123','2006-08-24'),
(2,'admin','1006334520','admin@test.com','3123123123',NULL),
(3,'robles','1006134520','robles@test.com','3123123123',NULL),
(4,'shayd','1006834520','shayd@test.com','3123123123',NULL),
(8,'cristian','1123932524','cristian@test.com','3123123123',NULL),
(10,'carlos','1123346522','carlos@test.com','3123123123',NULL),
(14,'Andres','11245984512','andres.cs@hotmail.com','312258796','1996-11-28'),
(15,'Jhon Bastidas','10068965214','jhonb99@gmail.com','3135110236','1992-06-07'),
(16,'Fabio Ordoñez','796053654','fabordoñez@gmail.com','3213524987','1962-12-03'),
(18,'Juan Acosta ','27359864','juantja22@gmail.com','3154799652','1978-03-02'),
(20,'Nessie Risbie','26000844','nrisbie0@dyndns.org','8199947723','1988-04-20'),
(21,'Corie Stow','26863591','cstow1@tripadvisor.com','6363073740','1988-10-07'),
(22,'Janela Pendlington','22403287','jpendlington2@discuz.net','8448706144','1976-07-29'),
(23,'Irv Rudgley','25353481','irudgley3@goo.ne.jp','2979967866','1984-11-24'),
(24,'Mohandis Calway','26370472','mcalway4@list-manage.com','3863289141','1989-07-15'),
(25,'Doyle Galey','20970441','dgaley5@cornell.edu','8451787332','2001-03-08'),
(26,'Thelma Oakes','20982222','toakes6@csmonitor.com','2207801019','1991-12-29'),
(27,'Bertha Rebillard','23150243','brebillard7@harvard.edu','9228287266','1999-11-11'),
(28,'Vaclav Currum','25886663','vcurrum8@livejournal.com','9491305832','1981-01-31'),
(29,'Micky Iori','19084755','miori9@amazon.co.jp','7526874421','1977-01-22'),
(30,'Georg Runnett','21777989','grunnetta@symantec.com','4411563779','2000-01-26'),
(31,'Francyne McElmurray','20993939','fmcelmurrayb@soundcloud.com','5333762821','1975-02-04'),
(32,'Cyrillus Swaile','22577444','cswailec@slate.com','4739974645','1993-02-11'),
(33,'Bastien Millington','25500699','bmillingtond@1688.com','1999291607','1992-01-28'),
(34,'Gill Spenton','23921158','gspentone@clickbank.net','9183442738','1983-09-17'),
(35,'Sam Minghella','20348905','sminghellaf@unblog.fr','1049066108','1993-08-15'),
(36,'Clifford Lindemann','26728327','clindemanng@nasa.gov','8284757531','1996-12-19'),
(37,'Galven Million','22254804','gmillionh@behance.net','9534015551','1990-11-30'),
(38,'Eunice Newbegin','20086132','enewbegini@tripod.com','5197552749','1972-01-09'),
(39,'Lark Trenoweth','23261998','ltrenowethj@moonfruit.com','6852820027','1978-06-12'),
(40,'Kelli De Caville','21077678','kdek@cbslocal.com','9442156194','1984-02-19'),
(41,'Morganica Scoffham','25753478','mscoffhaml@google.ca','7765699539','1976-05-22'),
(42,'Gretta Eloy','19466653','geloym@senate.gov','2943903593','1978-01-16'),
(43,'Travus Grammer','22784445','tgrammern@sitemeter.com','7217528436','1972-05-04'),
(44,'Ileane Lewerenz','25205143','ilewerenzo@merriam-webster.com','9081210425','1999-05-27'),
(45,'Burton Munro','21390878','bmunrop@dell.com','4778379542','2000-10-24'),
(46,'Karie Jostan','23926701','kjostanq@craigslist.org','3398605348','1983-04-08'),
(47,'Essy Taill','19261690','etaillr@marriott.com','5139628763','1980-06-13'),
(48,'Cam Munnings','22314086','cmunningss@webs.com','2517335110','1995-03-30'),
(49,'Humphrey Dight','26411953','hdightt@vk.com','1005378035','1975-04-22'),
(50,'Quintana Boecke','18393331','qboeckeu@booking.com','6144790707','1975-09-21'),
(51,'Alvy Leither','24696686','aleitherv@noaa.gov','8434260387','1989-02-24'),
(52,'Albie Furness','18157586','afurnessw@github.io','5853239596','1993-11-22'),
(53,'Agnesse Fibbens','20480961','afibbensx@so-net.ne.jp','4556244618','1977-07-26'),
(54,'Nerissa Whiles','25311380','nwhilesy@pbs.org','9822237240','1993-01-23'),
(55,'Larissa Berlin','26915177','lberlinz@mlb.com','5766984523','1976-02-20'),
(56,'Susette Riping','26402372','sriping10@imageshack.us','3846422564','1999-12-05'),
(57,'Romona Loadsman','22938992','rloadsman11@yolasite.com','3533404500','1979-11-06'),
(58,'Alysa Oguz','20664437','aoguz12@foxnews.com','7422726157','1981-10-20'),
(59,'Garreth Killingbeck','25672639','gkillingbeck13@vkontakte.ru','5549823939','1974-10-23'),
(60,'Anastasie Hamel','24289120','ahamel14@va.gov','1378595500','1993-11-20'),
(61,'Holt Whilde','22084510','hwhilde15@cargocollective.com','6877443153','1993-05-20'),
(62,'Levey Chadwick','20362986','lchadwick16@yahoo.co.jp','9729710212','1996-09-05'),
(63,'Elsinore Thurman','23591342','ethurman17@kickstarter.com','9166953433','1986-10-15'),
(64,'Ina Askaw','21789184','iaskaw18@youku.com','4363178470','1996-07-29'),
(65,'Lynn Martinuzzi','19540781','lmartinuzzi19@unesco.org','9186695816','1986-02-07'),
(66,'Nicko Greveson','18091155','ngreveson1a@amazon.de','9068155339','2000-03-24'),
(67,'Idaline Simnor','23391734','isimnor1b@aboutads.info','6243156706','1985-04-21'),
(68,'Maria Lipp','22881824','mlipp1c@histats.com','5431569392','1971-12-17'),
(69,'Cammie Whittleton','19028231','cwhittleton1d@istockphoto.com','3108078214','2002-01-12');

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `idRole` int(11) NOT NULL,
  `roleName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idRole`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles` */

insert  into `roles`(`idRole`,`roleName`) values 
(1,'administrador'),
(2,'usuario');

/*Table structure for table `status` */

DROP TABLE IF EXISTS `status`;

CREATE TABLE `status` (
  `idStatus` int(11) NOT NULL,
  `statusName` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `status` */

insert  into `status`(`idStatus`,`statusName`) values 
(1,'activo'),
(2,'inactivo'),
(3,'bloqueado');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPerson` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `idRole` int(11) NOT NULL,
  `idStatus` int(11) DEFAULT NULL,
  `idCity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `idPerson` (`idPerson`),
  KEY `idRole` (`idRole`),
  KEY `idStatus` (`idStatus`),
  KEY `idUser` (`id`),
  KEY `idCity` (`idCity`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`idRole`) REFERENCES `roles` (`idRole`),
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`idStatus`) REFERENCES `status` (`idStatus`),
  CONSTRAINT `users_ibfk_4` FOREIGN KEY (`idCity`) REFERENCES `cities` (`id`),
  CONSTRAINT `users_ibfk_5` FOREIGN KEY (`idPerson`) REFERENCES `people` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`idPerson`,`username`,`password`,`idRole`,`idStatus`,`idCity`) values 
(1,2,'admin','$2a$10$EsjABkQR2118tLfn2Ekp7.r9TYYeLEKZvszybDmKqhGb0oJZEBVsq',1,1,1),
(9,10,'carlos99','$2b$10$GOOgxouZlhm181JqUvk28uBg3jhNqk36tr0EViNYxIh3OWnWHrUbq',1,2,2),
(30,3,'Robles99','$2b$10$O/6vU2T85xm6qzw22iz0K.btT.pkEVZugfXYblDWWFXfcvH6GZonq',2,1,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
