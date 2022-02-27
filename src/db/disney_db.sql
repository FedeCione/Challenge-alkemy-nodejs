-- MariaDB dump 10.19  Distrib 10.4.21-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: disney_db
-- ------------------------------------------------------
-- Server version	10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `generos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `imagen_genero` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Acción','1644961503700_img_.png'),(2,'Animación','1644961706149_img_.png'),(3,'Ciencia Ficción','1644961722480_img_.png'),(4,'Comedia','1644961744617_img_.png'),(5,'Documental','1644961760252_img_.png'),(6,'Drama','1644961786848_img_.png'),(7,'Fantasía','1644961821329_img_.png'),(8,'Historia','1644961871319_img_.png'),(9,'Musical','1644961886399_img_.png'),(10,'Romantica','1644961907688_img_.png'),(11,'Suspenso','1644961924127_img_.png'),(12,'Terror','1644961932456_img_.png');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pelicula_serie`
--

DROP TABLE IF EXISTS `pelicula_serie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pelicula_serie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `calificacion` int(11) NOT NULL,
  `imagen_pelicula_serie` varchar(100) NOT NULL,
  `id_genero` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `genero_idx` (`id_genero`),
  CONSTRAINT `genero` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pelicula_serie`
--

LOCK TABLES `pelicula_serie` WRITE;
/*!40000 ALTER TABLE `pelicula_serie` DISABLE KEYS */;
INSERT INTO `pelicula_serie` VALUES (4,'Toy Story','1996-03-14',5,'1645936055799_img_.png',2);
/*!40000 ALTER TABLE `pelicula_serie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personajes`
--

DROP TABLE IF EXISTS `personajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personajes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `edad` int(11) NOT NULL,
  `peso` int(11) NOT NULL,
  `historia` mediumtext NOT NULL,
  `imagen_personaje` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personajes`
--

LOCK TABLES `personajes` WRITE;
/*!40000 ALTER TABLE `personajes` DISABLE KEYS */;
INSERT INTO `personajes` VALUES (11,'Woody',4,10,'Su carácter se ha desarrollado mucho desde la primera película. En Toy Story, la primera vez que se reúne con Buzz, está muy intimidado por su apariencia más moderna del guardián espacial en comparación con su aspecto de trapo. Pronto una vez que su celo se empieza a manifestar, realiza un esquema para ocultar a Buzz de Andy para que pueda ser recordado. Sin embargo, cuando las cosas van mal y Buzz caen por la ventana en un arbusto, Woody aprende a pensar dos veces antes de realizar sus pequeños esquemas.','1645936187936_img_.png'),(12,'Buzz Lightyear',6,5,'En las películas Buzz es un juguete con forma de guerrero espacial, el cual llega hasta las manos de Andy, un niño con una gran colección de juguetes. En casa de Andy conocerá al resto de juguetes como son Woody, el Sr. Patata o Rex, entre otros. En las películas, los juguetes Buzz Lightyear cuentan con su propia serie de dibujos, en la cual Buzz vela por la seguridad del universo. Su enemigo es el Emperador Zurg. Al principio el creía que era el verdadero Buzz Lightyear, pero gracias a su mejor amigo Woody, sacó este pensamiento erróneo y adoptó el pensamiento de un juguete. Está enamorado de Jessie.','1645936259785_img_.png');
/*!40000 ALTER TABLE `personajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personajes_peliculas_series_pivot`
--

DROP TABLE IF EXISTS `personajes_peliculas_series_pivot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personajes_peliculas_series_pivot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_personaje` int(11) NOT NULL,
  `id_pelicula_serie` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `pelicula_serie_idx` (`id_pelicula_serie`),
  KEY `personaje_idx` (`id_personaje`),
  CONSTRAINT `pelicula_serie` FOREIGN KEY (`id_pelicula_serie`) REFERENCES `pelicula_serie` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `personaje` FOREIGN KEY (`id_personaje`) REFERENCES `personajes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personajes_peliculas_series_pivot`
--

LOCK TABLES `personajes_peliculas_series_pivot` WRITE;
/*!40000 ALTER TABLE `personajes_peliculas_series_pivot` DISABLE KEYS */;
INSERT INTO `personajes_peliculas_series_pivot` VALUES (30,12,4),(31,11,4);
/*!40000 ALTER TABLE `personajes_peliculas_series_pivot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(70) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-27  2:28:22
