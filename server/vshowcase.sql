/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 10.4.22-MariaDB : Database - vshowcase
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`vshowcase` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `vshowcase`;

/*Table structure for table `account_type` */

DROP TABLE IF EXISTS `account_type`;

CREATE TABLE `account_type` (
  `account_type_id` int(3) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`account_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `account_type` */

insert  into `account_type`(`account_type_id`,`type`) values 
(1,'personal'),
(2,'business');

/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `categories` */

insert  into `categories`(`id`,`name`) values 
(1,'Electrónica y Tecnología'),
(2,'Moda y Accesorios'),
(3,'Hogar y Jardín'),
(4,'Salud y Belleza'),
(5,'Deportes y Aire Libre'),
(6,'Libros, Música y Entretenimiento'),
(7,'Automotriz'),
(8,'Alimentos y Bebidas'),
(9,'Electrodomésticos y Electrónicos para el hogar');

/*Table structure for table `conditions` */

DROP TABLE IF EXISTS `conditions`;

CREATE TABLE `conditions` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `conditions` */

insert  into `conditions`(`id`,`name`) values 
(1,'Nuevo'),
(2,'Usado'),
(3,'Reacondicionado');

/*Table structure for table `product_subcategories` */

DROP TABLE IF EXISTS `product_subcategories`;

CREATE TABLE `product_subcategories` (
  `product_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`,`subcategory_id`),
  KEY `product_category_id` (`product_id`),
  KEY `products_category_subcategory_ibfk_2` (`subcategory_id`),
  CONSTRAINT `product_subcategories_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `product_subcategories_ibfk_2` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `product_subcategories` */

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `images` text NOT NULL,
  `name` varchar(200) NOT NULL,
  `stock` varchar(10) NOT NULL,
  `price` varchar(30) NOT NULL,
  `state` int(1) NOT NULL,
  `description` text DEFAULT NULL,
  `condition_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `condition_id` (`condition_id`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`condition_id`) REFERENCES `conditions` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;

/*Data for the table `products` */

/*Table structure for table `saledetails` */

DROP TABLE IF EXISTS `saledetails`;

CREATE TABLE `saledetails` (
  `id` int(11) NOT NULL,
  `sale_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sale_id` (`sale_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `saledetails_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`),
  CONSTRAINT `saledetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `saledetails` */

insert  into `saledetails`(`id`,`sale_id`,`product_id`,`quantity`,`price`,`total_amount`) values 
(0,NULL,NULL,NULL,NULL,NULL),
(1,1,1,10,50.00,30.00),
(2,1,2,3,8.00,24.00),
(3,1,3,2,10.00,20.00);

/*Table structure for table `sales` */

DROP TABLE IF EXISTS `sales`;

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `sale_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sales` */

insert  into `sales`(`id`,`quantity`,`price`,`total_amount`,`sale_date`) values 
(1,3,30000.00,30000.00,NULL);

/*Table structure for table `subcategories` */

DROP TABLE IF EXISTS `subcategories`;

CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_category_id` (`category_id`),
  CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `subcategories` */

insert  into `subcategories`(`id`,`name`,`category_id`) values 
(1,'Computadoras y laptops',1),
(2,'Teléfonos móviles',1),
(3,'Dispositivos electrónicos',1),
(4,'Accesorios tecnológicos',1),
(5,'Ropa para hombres, mujeres y niños',2),
(6,'Calzado',2),
(7,'Accesorios de moda',2),
(8,'Joyería y relojes',2),
(9,'Muebles',3),
(10,'Electrodomésticos',3),
(11,'Decoración del hogar',3),
(12,'Herramientas de jardinería',3),
(13,'Productos de cuidado personal',4),
(14,'Maquillaje y cosméticos',4),
(15,'Equipos de ejercicio',4),
(16,'Suplementos nutricionales',4),
(17,'Ropa deportiva',5),
(18,'Equipamiento deportivo',5),
(19,'Artículos de camping',5),
(20,'Bicicletas y accesorios',5),
(21,'Libros impresos y electrónicos',6),
(22,'Instrumentos musicales',6),
(23,'Películas y música',6),
(24,'Juegos de mesa y juguetes',6),
(25,'Autos y motocicletas',7),
(26,'Piezas de repuesto',7),
(27,'Herramientas automotrices',7),
(28,'Accesorios para vehículos',7),
(29,'Alimentos gourmet',8),
(30,'Bebidas alcohólicas y no alcoholicas',8),
(31,'Productos orgánicos',8),
(32,'Kits de cocina',9),
(33,'Electrodomésticos grandes y pequeños',9),
(34,'Sistemas de seguridad para el hogar',9),
(35,'Dispositivos de automatización del hogar',9);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `account_type_id` int(5) DEFAULT NULL,
  `img_background` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_type_id` (`account_type_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`account_type_id`) REFERENCES `account_type` (`account_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`password`,`email`,`phone`,`account_type_id`,`img_background`) values 
(53,'Cristian Jamioy','$2b$10$u/tXUFvIX51unfkR1eAqteaAHFZuByzO55RMDeKU5NhYwskaIwTcq','test@test.com','3123798206',2,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
