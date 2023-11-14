/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 10.4.28-MariaDB : Database - vshowcase
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`vshowcase` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;

USE `vshowcase`;

/*Table structure for table `accounttype` */

DROP TABLE IF EXISTS `accounttype`;

CREATE TABLE `accounttype` (
  `id` int(11) NOT NULL,
  `description` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `accounttype` */

insert  into `accounttype`(`id`,`description`) values 
(1,'business'),
(2,'personal');

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `images` text DEFAULT NULL,
  `name_product` varchar(100) NOT NULL,
  `stock` varchar(10) NOT NULL,
  `price` varchar(30) NOT NULL,
  `state` int(1) NOT NULL,
  `description` text DEFAULT NULL,
  `product_category_id` int(11) NOT NULL,
  `condition_product` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_category_id` (`product_category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`product_category_id`) REFERENCES `products_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `products` */

insert  into `products`(`id`,`images`,`name_product`,`stock`,`price`,`state`,`description`,`product_category_id`,`condition_product`) values 
(6,'[object Object]','test product','4','1231212312',1,'<p>test description</p>',2,NULL),
(7,'[object Object]','test product','4','1231212312',1,'<p>test description</p>',2,NULL),
(8,'function values() { [native code] }','test product','4','1231212312',1,'<p>test description</p>',2,NULL),
(9,'function values() { [native code] }','test product','4','1231212312',1,'<p>test description</p>',2,NULL),
(10,'[object Object]','test product','4','1231212312',1,'<p>test description</p>',2,NULL),
(11,'[object Object]','test product','4','1231212312',1,'<p>test description</p>',2,NULL),
(12,'[object Object]','test product','4','1231212312',1,'<p>test description</p>',2,NULL),
(13,'[object Object]','test product','4','1231212312',1,'<p>test description</p>',2,NULL);

/*Table structure for table `products_category` */

DROP TABLE IF EXISTS `products_category`;

CREATE TABLE `products_category` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `products_category` */

insert  into `products_category`(`id`,`name`) values 
(1,'Electrónica y Tecnología'),
(2,'Moda y Accesorios'),
(3,'Hogar y Jardín'),
(4,'Salud y Belleza'),
(5,'Deportes y Aire Libre'),
(6,'Libros, Música y Entretenimiento'),
(7,'Automotriz'),
(8,'Alimentos y Bebidas'),
(9,'Electrodomésticos y Electrónicos para el hogar');

/*Table structure for table `products_category_subcategory` */

DROP TABLE IF EXISTS `products_category_subcategory`;

CREATE TABLE `products_category_subcategory` (
  `id` int(11) NOT NULL,
  `product_category_id` int(11) NOT NULL,
  `product_subcategory_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_category_id` (`product_category_id`),
  KEY `products_category_subcategory_ibfk_2` (`product_subcategory_id`),
  CONSTRAINT `products_category_subcategory_ibfk_1` FOREIGN KEY (`product_category_id`) REFERENCES `products_category` (`id`),
  CONSTRAINT `products_category_subcategory_ibfk_2` FOREIGN KEY (`product_subcategory_id`) REFERENCES `products_subcategory` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `products_category_subcategory` */

insert  into `products_category_subcategory`(`id`,`product_category_id`,`product_subcategory_id`) values 
(0,2,6),
(1,1,1),
(2,1,2),
(3,1,3),
(4,1,4),
(5,2,5),
(7,2,7),
(8,2,8),
(9,3,9),
(10,3,10),
(11,3,11),
(12,3,12),
(13,4,13),
(14,4,14),
(15,4,15),
(16,4,16),
(17,5,17),
(18,5,18),
(19,5,19),
(20,5,20),
(21,6,21),
(22,6,22),
(23,6,23),
(24,6,24),
(25,7,25),
(26,7,26),
(27,7,27),
(28,7,28),
(29,8,29),
(30,8,30),
(31,8,31),
(32,8,32),
(33,9,33),
(34,9,34),
(35,9,35);

/*Table structure for table `products_subcategory` */

DROP TABLE IF EXISTS `products_subcategory`;

CREATE TABLE `products_subcategory` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `products_subcategory` */

insert  into `products_subcategory`(`id`,`name`) values 
(1,'Computadoras y laptops'),
(2,'Teléfonos móviles'),
(3,'Dispositivos electrónicos'),
(4,'Accesorios tecnológicos'),
(5,'Ropa para hombres, mujeres y niños'),
(6,'Calzado'),
(7,'Accesorios de moda'),
(8,'Joyería y relojes'),
(9,'Muebles'),
(10,'Electrodomésticos'),
(11,'Decoración del hogar'),
(12,'Herramientas de jardinería'),
(13,'Productos de cuidado personal'),
(14,'Maquillaje y cosméticos'),
(15,'Equipos de ejercicio'),
(16,'Suplementos nutricionales'),
(17,'Ropa deportiva'),
(18,'Equipamiento deportivo'),
(19,'Artículos de camping'),
(20,'Bicicletas y accesorios'),
(21,'Libros impresos y electrónicos'),
(22,'Instrumentos musicales'),
(23,'Películas y música'),
(24,'Juegos de mesa y juguetes'),
(25,'Autos y motocicletas'),
(26,'Piezas de repuesto'),
(27,'Herramientas automotrices'),
(28,'Accesorios para vehículos'),
(29,'Alimentos gourmet'),
(30,'Bebidas alcohólicas y no alcoholicas'),
(31,'Productos orgánicos'),
(32,'Kits de cocina'),
(33,'Electrodomésticos grandes y pequeños'),
(34,'Sistemas de seguridad para el hogar'),
(35,'Dispositivos de automatización del hogar');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `account_type_id` int(1) DEFAULT NULL,
  `img_background` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `account_type_id` (`account_type_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`account_type_id`) REFERENCES `accounttype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`password`,`email`,`phone`,`account_type_id`,`img_background`) values 
(22,'Cristian','$2b$10$NslTZFl0J7iGVsu7TDr.NOpuvkUyWJKS4VLY2H8QCFYu.Jn57CjB6','alex.chris4200165@gmail.com','3123798206',2,NULL),
(23,'test','$2b$10$0EQf/d8IDP3VsY/180DN6ui2yMWs3QsYzCiHgL8s6pD14nNzpkTRO','test@test.com','31231123123',2,NULL),
(25,'Lilibeth','$2b$10$/GuMMQx5gLpKtPkksvjWz.SsgNr1kT7t1fzGDqbP.9zL/QjuUV0eG','test@test.com','3135005658',2,NULL),
(26,'test empresa','$2b$10$xoc/b0o3Mrw4Zv99MBjNH.oUyc/e1R5xwYJScn7aGm0qDE2T4BqJ.','empresa@test.com','3123123123123123',1,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
