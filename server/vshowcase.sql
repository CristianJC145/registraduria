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

insert  into `product_subcategories`(`product_id`,`subcategory_id`) values 
(80,1),
(82,2),
(83,4),
(84,1),
(85,1),
(87,2),
(88,4),
(89,2),
(90,2),
(91,2);

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `images` text NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `stock` varchar(10) NOT NULL,
  `price` double NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;

/*Data for the table `products` */

insert  into `products`(`id`,`images`,`product_name`,`stock`,`price`,`state`,`description`,`condition_id`,`user_id`,`category_id`) values 
(80,'uploads/images-1700720737096-125337296.webp,uploads/images-1700720737096-836092445.webp,uploads/images-1700720737097-614696910.webp,uploads/images-1700720737098-837837531.webp','Portátil gamer Asus TUF Gaming F15 FX506HC eclipse gray 15.6\", Intel Core i5 11400H 16GB de RAM 1512GB SSD, NVIDIA GeForce RTX 3050 144 Hz 1920x1080px Windows 10 Home','3',3999900,1,'<h2>Descripción</h2><p>Disfruta de la perfecta combinación de rendimiento y diseño con este ordenador Asus TUF Gaming F15 FX506HC. Encontrarás en él una excelente herramienta para tus trabajos de todos los días y para tus momentos de entretenimiento. Aprovecha la experiencia extraordinaria que la marca tiene para ofrecerte y optimiza la calidad de tus imágenes y videos.<br><br>Pantalla con gran impacto visual<br>Su pantalla IPS de 15.6\" y 1920x1080&nbsp;px de resolución te brindará colores más vivos y definidos. Tus películas y series preferidas cobrarán vida, ya que ganarán calidad y definición en cada detalle.<br><br>Eficiencia a tu alcance<br>Su procesador Intel Core i5 de 6 núcleos, está pensado para aquellas personas generadoras y consumidoras de contenidos. Con esta unidad central, la máquina llevará a cabo varios procesos de forma simultánea, desde edición de videos hasta retoques fotográficos con programas profesionales.<br><br>Potente disco sólido<br>El disco sólido de 1512 GB hace que el equipo funcione a gran velocidad y por lo tanto te brinda mayor agilidad para operar con diversos programas.<br><br>Un procesador exclusivo para los gráficos<br>Su tarjeta gráfica NVIDIA GeForce RTX 3050 convierte a este dispositivo en una gran herramienta de trabajo para cualquier profesional del diseño. Te permitirá lograr una gran performance en todos tus juegos y en otras tareas cotidianas que impliquen procesamiento gráfico.</p>',1,53,1),
(82,'uploads/images-1701815903143-887766809.webp,uploads/images-1701815903143-865343089.webp,uploads/images-1701815903143-524326411.webp,uploads/images-1701815903143-540059903.webp,uploads/images-1701815903144-339626474.webp','Apple iPhone 14 Pro (128 GB) - Negro espacial','5',5096200,1,'<p>El iPhone 14 Pro te permite captar detalles increíbles gracias a su cámara gran angular de 48 MP. Además, trae la Dynamic Island y una pantalla siempre activa, para que puedas interactuar con tu iPhone de una forma completamente nueva. Y viene con Detección de Choques(1), una funcionalidad de seguridad que pide ayuda cuando no estás en condiciones de hacerlo.<br><br>Aviso legal<br>(1) La funcionalidad Emergencia SOS usa conexión celular o llamadas por Wi-Fi.<br>(2) La pantalla tiene las esquinas redondeadas. Si se mide en forma de rectángulo, la pantalla tiene 6.69 pulgadas en diagonal. El área real de visualización es menor.<br>(3) La duración de la batería varía según el uso y la configuración.<br>(4) Se requiere un plan de datos. 5G está disponible en algunos mercados y a través de operadores específicos. Las velocidades varían según las condiciones del lugar y el operador.<br>(5) El iPhone 14 Pro es resistente a las salpicaduras, al agua y al polvo, y fue probado en condiciones de laboratorio controladas, con una clasificación IP68 según la norma IEC 60529 (hasta 30 minutos a una profundidad máxima de 6 metros). La resistencia a las salpicaduras, al agua y al polvo no es una condición permanente, y podría disminuir como consecuencia del uso normal. No intentes cargar un iPhone mojado; consulta el manual del usuario para ver las instrucciones de limpieza y secado. La garantía no cubre daños producidos por líquidos.<br>(6) Algunas funcionalidades podrían no estar disponibles en todos los países o áreas.</p>',1,57,1),
(83,'uploads/images-1700774714619-842549275.webp,uploads/images-1700774714619-949871470.webp,uploads/images-1700774714619-480667874.webp','Apple AirPods Pro (2ª generación) 1.1','6',999999,1,'<h2>Descripción</h2><p>Los AirPods Pro vienen con hasta 2 veces más Cancelación Activa de Ruido(1), modo Ambiente adaptable y audio espacial personalizado con seguimiento dinámico de la cabeza para que disfrutes un sonido inmersivo(2). Y ahora con distintos tamaños de almohadillas (XS, S, M, L) y hasta 6 horas de reproducción de audio(3).<br><br>Aviso legal<br>(1) En comparación con los AirPods Pro (primera generación).<br>(2) El audio espacial funciona con películas, programas de TV y videos en apps compatibles. Se requiere un iPhone con cámara TrueDepth para crear un perfil personalizado.<br>(3) La duración de la batería varía según el uso y la configuración.<br>(4) Los AirPods Pro y el estuche de carga son resistentes al agua y al sudor al hacer ejercicio o practicar deportes no acuáticos, y tienen una clasificación IPX4. La resistencia al agua y al sudor no es una condición permanente.<br>(5) Siri puede no estar disponible en todos los idiomas y áreas, y las funcionalidades pueden variar según el área. Se requiere acceso a Internet. Puede estar sujeto a cargos por uso de datos celulares.<br>(6) Requiere una cuenta de iCloud y un dispositivo Apple compatible con la última versión del software del sistema operativo.<br>(7) Funciona con el iPhone 8 o posterior y el iPod touch (séptima generación) con la última versión de iOS; y el iPad Pro de 12.9 pulgadas (segunda generación o posterior), iPad Pro de 11 pulgadas, iPad Pro de 10.5 pulgadas, iPad (quinta generación o posterior), iPad Air (tercera generación o posterior) y iPad mini (quinta generación o posterior) con la última versión de iPadOS.<br>(8) La funcionalidad Encontrar requiere iOS 16 o posterior, y estará disponible para iPadOS y macOS más adelante.</p>',1,57,1),
(84,'uploads/images-1700776156803-54816681.webp,uploads/images-1700776156803-938568041.webp,uploads/images-1700776156804-919510732.webp','Apple Macbook Air (13 pulgadas, 2020, Chip M1, 256 GB de SSD, 8 GB de RAM) - Gris espacial','5',3872000,1,'<h2>Descripción</h2><p>La notebook más delgada y ligera de Apple viene con los superpoderes del chip M1. Termina todos tus proyectos mucho más rápido con el CPU de 8 núcleos y disfruta como nunca antes de apps y juegos con gráficos avanzados gracias al GPU de hasta 8 núcleos. Además, el Neural Engine de 16 núcleos se encarga de acelerar todos los procesos de aprendizaje automático. Todo en un diseño silencioso sin ventilador que te ofrece la mayor duración de batería en una MacBook Air: hasta 18 horas. (1) Portátil como siempre, más poderosa que nunca.<br><br><br>Avisos Legales<br>No todos los recursos y configuraciones están disponibles en todos los países.<br>(1) La duración de la batería varía según el uso y la configuración.<br>(2) Comparado con la generación anterior.<br>(3) El tamaño de la pantalla se mide en diagonal.</p>',1,57,1),
(85,'uploads/images-1700775584774-475123963.webp,uploads/images-1700775584774-347856784.webp,uploads/images-1700775584774-252517149.webp','Portátil Asus Rog/g513rc-hn057w/amd Ryzen 7 6800h/15.3/fhd/','7',5527900,1,'<h2>Descripción</h2><p>La CPU AMD RyzenTM 9 6900HX y la GPU NVIDIA® 3080 para portátiles con TGP máximo de 150 W y MUX Switch forman la columna vertebral del flamante Strix G de 2022. La memoria DDR5 de última generación permite que la CPU ofrezca la mejor respuesta y la compatibilidad con unidades SSD PCIe® 4.0 evita que tengas que esperar a las transferencias de archivos o a que carguen los juegos.</p>',1,53,1),
(87,'uploads/images-1701815135076-334412793.webp,uploads/images-1701815135077-265182180.webp,uploads/images-1701815135078-283476278.webp,uploads/images-1701815135079-856793143.webp,uploads/images-1701815135079-79209868.webp','Asus ROG Phone 6 Dual SIM 512 GB phantom black 16 GB RAM','5',4274999,1,'<h2>Descripción</h2><p>Fotografía profesional en tu bolsillo<br>Descubre infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo. Pon a prueba tu creatividad y juega con la iluminación, diferentes planos y efectos para obtener grandes resultados.<br><br>Además, el dispositivo cuenta con cámara frontal de 12 Mpx para que puedas sacarte divertidas selfies o hacer videollamadas.<br><br>Experiencia visual increíble<br>Mira tus series y películas favoritas con la mejor definición a través de su pantalla AMOLED de 6.78\". Disfruta de colores brillantes y detalles precisos en todos tus contenidos.<br><br>Capacidad y eficiencia<br>Con su potente procesador y memoria RAM de 16 GB tu equipo alcanzará un alto rendimiento con gran velocidad de transmisión de contenidos y ejecutará múltiples aplicaciones a la vez sin demoras.<br><br>Desbloqueo facial y dactilar<br>Máxima seguridad para que solo tú puedas acceder al equipo. Podrás elegir entre el sensor de huella dactilar para habilitar el teléfono en un toque, o el reconocimiento facial que permite un desbloqueo hasta un 30% más rápido.<br><br>Batería de duración superior<br>¡Desenchúfate! Con la súper batería de 6000 mAh tendrás energía por mucho más tiempo para jugar, ver series o trabajar sin necesidad de realizar recargas.</p>',1,53,1),
(88,'uploads/images-1701815422947-478507126.webp,uploads/images-1701815422961-880234785.webp,uploads/images-1701815422961-461264840.webp,uploads/images-1701815422962-177792159.webp,uploads/images-1701815422962-525982602.webp','Tarjeta Grafica Asus Rog-strix-rx6600xt-o8g-ga Para Juegos','8',2974549,1,'<h2>Descripción</h2><p>Tarjeta gráfica para juegos ASUS ROG Strix AMD Radeon RX 6600 XT OC Edition (AMD RDNA 2, PCIe 4.0, GDDR6 de 8 GB, HDMI 2.1, DisplayPort 1.4a, Axial-Tech Fan Design, Super Alloy Power II, GPU Tweak II) Tarjeta gráfica<br><br>La ROG Strix Radeon RX 6600 XT amplifica las velocidades de cuadro Full HD para satisfacer las demandas de las últimas pantallas de alta velocidad. Los ventiladores de tecnología dual Axial expulsan aire de manera eficiente a través de un gran disipador térmico para mantener la GPU refrigerada, y los condensadores, bobinas y MOSFET de primera calidad ofrecen la cantidad perfecta de energía limpia.</p>',1,53,1),
(89,'uploads/images-1701815697094-370592947.webp,uploads/images-1701815697095-274190380.webp,uploads/images-1701815697095-879750726.webp,uploads/images-1701815697095-909787692.webp,uploads/images-1701815697095-790892931.webp','Apple iPhone 14 Pro Max (256 GB) - Morado oscuro','5',6099999,1,'<h2>Descripción</h2><p>El iPhone 14 Pro Max te permite captar detalles increíbles gracias a su cámara gran angular de 48 MP. Además, trae la Dynamic Island y una pantalla siempre activa, para que puedas interactuar con tu iPhone de una forma completamente nueva. Y viene con Detección de Choques(1), una funcionalidad de seguridad que pide ayuda cuando no estás en condiciones de hacerlo.<br><br>Aviso legal<br>&nbsp;<br>(1) La funcionalidad Emergencia SOS usa conexión celular o llamadas por Wi-Fi.<br>(2) La pantalla tiene las esquinas redondeadas. Si se mide en forma de rectángulo, la pantalla tiene 6.69 pulgadas en diagonal. El área real de visualización es menor.<br>(3) La duración de la batería varía según el uso y la configuración.<br>(4) Se requiere un plan de datos. 5G está disponible en algunos mercados y a través de operadores específicos. Las velocidades varían según las condiciones del lugar y el operador.<br>(5) El iPhone 14 Pro Max es resistente a las salpicaduras, al agua y al polvo, y fue probado en condiciones de laboratorio controladas, con una clasificación IP68 según la norma IEC 60529 (hasta 30 minutos a una profundidad máxima de 6 metros). La resistencia a las salpicaduras, al agua y al polvo no es una condición permanente, y podría disminuir como consecuencia del uso normal. No intentes cargar un iPhone mojado; consulta el manual del usuario para ver las instrucciones de limpieza y secado.&nbsp;La garantía no cubre daños producidos por líquidos.<br>(6) Algunas funcionalidades podrían no estar disponibles en todos los países o áreas.</p>',1,57,1),
(90,'uploads/images-1701816098589-380747407.webp,uploads/images-1701816098589-786024212.webp,uploads/images-1701816098589-548571365.webp','Samsung Galaxy S23 Ultra Dual SIM 256 GB lavender 12 GB RAM','7',4398000,1,'<h2>Descripción</h2><p>Fotografía profesional en tu bolsillo<br>Descubre infinitas posibilidades para tus fotos con las 4 cámaras principales de tu equipo. Pon a prueba tu creatividad y juega con la iluminación, diferentes planos y efectos para obtener grandes resultados.<br><br>Experiencia visual increíble<br>Mira tus series y películas favoritas con la mejor definición a través de su pantalla AMOLED de 6.8\". Disfruta de colores brillantes y detalles precisos en todos tus contenidos.<br><br>Capacidad y eficiencia<br>Con su potente procesador y memoria RAM de 12 GB tu equipo alcanzará un alto rendimiento con gran velocidad de transmisión de contenidos y ejecutará múltiples aplicaciones a la vez sin demoras.<br><br>Desbloqueo facial y dactilar<br>Máxima seguridad para que solo tú puedas acceder al equipo. Podrás elegir entre el sensor de huella dactilar para habilitar el teléfono en un toque, o el reconocimiento facial que permite un desbloqueo hasta un 30% más rápido.<br><br>Batería de duración superior<br>¡Desenchúfate! Con la súper batería de 5000 mAh tendrás energía por mucho más tiempo para jugar, ver series o trabajar sin necesidad de realizar recargas.<br>&nbsp;</p>',1,59,1),
(91,'uploads/images-1701816351292-238016424.webp,uploads/images-1701816351293-574382918.webp,uploads/images-1701816351293-827044068.webp,uploads/images-1701816351294-400322932.webp,uploads/images-1701816351294-678836834.webp','50 Neo Qled 4k Qn90c Gaming Tv','3',2819060,1,'<h2>Descripción</h2><p>Samsung es reconocida a nivel mundial como una empresa líder en la industria tecnológica. Todos sus productos son diseñados con una calidad superior y pensados para contribuir a un futuro mejor. Por eso, hará que disfrutes de una experiencia incomparable.<br><br>Con el Smart TV QN50QN90CAK accederás a diferentes contenidos a través de las aplicaciones. Además, podrás navegar por Internet, interactuar en redes sociales y divertirte con videojuegos.<br><br>Descubre la tecnología QLED<br>La pantalla con puntos cuánticos ofrece un volumen de color muy superior a cualquier LED del mercado, lo que significa que puede hacer que todos los colores del espectro disponible sean más brillantes sin perder saturación. Además, se distingue por ofrecer un mejor ángulo de visión sin perder calidad desde ninguna posición.<br><br>Vive en 4K<br>La cantidad de pixeles que ofrece es 4 veces mayor que la Full HD, ¿el resultado? Escenas mucho más realistas y con un nivel de detalle increíble. Ahora conocerás una aventura de inmersión que no va a dejar de sorprenderte.<br><br>Un sonido que te envuelve<br>Sentirás que proviene desde todas las direcciones posibles, lo cual enriquece la percepción del mismo. Los diálogos de las series de fin de semana o la música de los cantantes que escuches cobrarán otro significado.</p>',1,59,1);

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
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`password`,`email`,`phone`,`account_type_id`,`img_background`) values 
(53,'ASUS','$2b$10$u/tXUFvIX51unfkR1eAqteaAHFZuByzO55RMDeKU5NhYwskaIwTcq','test@test.com','3123798206',2,NULL),
(56,'Test cliente','$2b$10$Tuo32v68jiEzMz6Hc0c.RuAbVpn4iEEfV7Bk8objqTp43wWP2pIy2','test@cliente.com','32132132',1,NULL),
(57,'Apple','$2b$10$4G50evDFrLwMEOgA/IAlvencPFwP4ST7kmMs0qZVFb.86RxSTIKXG','test@apple.com','12332112',2,NULL),
(58,'Adidas','$2b$10$IjwQrUDEkwK/eSRI7G5oTOsuLuNXTaI6bHWHLyRfy8IHT3OuZlGqi','test@adidas.com','123456789',2,NULL),
(59,'Samsung','$2b$10$RLxOsvuOSLbsEtEzSDLnGOV9SKhLprkwlaA/oQ8aJKARS2Vdj2RNW','test@samsung','3123798206',2,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
