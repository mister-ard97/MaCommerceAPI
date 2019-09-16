-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: macommerce_db
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `small` int(11) DEFAULT '0',
  `medium` int(11) DEFAULT '0',
  `large` int(11) DEFAULT '0',
  `xlarge` int(11) DEFAULT '0',
  `price` int(11) NOT NULL,
  `total_price` int(11) NOT NULL DEFAULT '0',
  `userId` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,2,0,3,4,0,200000,1400000,2,1),(2,3,0,1,1,0,250000,500000,2,1),(3,4,0,1,0,1,200000,400000,2,1),(4,7,0,0,1,0,200000,200000,2,1),(5,5,0,0,1,0,300000,300000,2,1),(6,6,1,0,0,0,250000,250000,2,1),(7,2,0,1,0,0,200000,200000,2,1),(8,3,0,1,0,0,250000,250000,2,1),(9,2,0,6,0,0,200000,1200000,2,1);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `categoryImage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_constraint_parentId_idx` (`parentId`),
  CONSTRAINT `id_constraint_parentId` FOREIGN KEY (`parentId`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Men',NULL,'/category/MaCommerce-1567724599183.jpeg'),(2,'T-Shirt',1,NULL),(3,'Pants',1,NULL),(4,'Women',NULL,'/category/MaCommerce-1567724645166.jpg'),(5,'Skirt',4,NULL),(6,'Dress',4,NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `subcategoryId` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `description` mediumtext NOT NULL,
  `coverImage` varchar(255) NOT NULL,
  `popularCount` int(11) DEFAULT NULL,
  `date_created` datetime NOT NULL,
  `is_deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Western',4,5,150000,'Western Skirt','/product/MaCommerceProduct-1567892301227.jpg',0,'2019-09-08 04:38:21',1),(2,'Yellow Skirt',4,5,200000,'Yellow Skirt','/product/MaCommerceProduct-1567908591709.jpg',0,'2019-09-08 09:09:52',0),(3,'Black Pants',1,3,250000,'Black Pants Product For Men','/product/MaCommerceProduct-1567908644748.jpg',0,'2019-09-08 09:10:45',0),(4,'Kombat Green T-Shirt',1,2,200000,'Kombat Green T-Shirt, Product for Men','/product/MaCommerceProduct-1567908700173.jpg',0,'2019-09-08 09:11:40',0),(5,'Black Pants with Red Stripe',1,3,300000,'Black Pants with Red Stripe, Product for Men','/product/MaCommerceProduct-1567908769463.jpg',0,'2019-09-08 09:12:50',0),(6,'White T-Shirt',1,2,250000,'White T-Shirt, Product for Men ','/product/MaCommerceProduct-1567908818130.jpg',0,'2019-09-08 09:13:38',0),(7,'Glossys Skirt',4,5,200000,'Glossy Skirt, Product for Women','/product/MaCommerceProduct-1567908876106.jpg',0,'2019-09-08 09:15:09',0);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imagePath` varchar(255) NOT NULL,
  `productId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (3,'/product/MaCommerceProduct-1567892301330.jpg',1),(4,'/product/MaCommerceProduct-1567892301339.jpg',1),(5,'/product/MaCommerceProduct-1567908591741.jpg',2),(6,'/product/MaCommerceProduct-1567908591759.jpg',2),(7,'/product/MaCommerceProduct-1567908644754.jpg',3),(8,'/product/MaCommerceProduct-1567908644769.jpg',3),(9,'/product/MaCommerceProduct-1567908700183.jpg',4),(10,'/product/MaCommerceProduct-1567908700288.jpg',4),(11,'/product/MaCommerceProduct-1567908769478.jpg',5),(12,'/product/MaCommerceProduct-1567908769496.jpg',5),(13,'/product/MaCommerceProduct-1567908818134.jpg',6),(14,'/product/MaCommerceProduct-1567908818138.jpg',6),(15,'/product/MaCommerceProduct-1567908876122.jpg',7),(16,'/product/MaCommerceProduct-1567908876122.jpg',7);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockproduct`
--

DROP TABLE IF EXISTS `stockproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stockproduct` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `small` int(11) NOT NULL,
  `medium` int(11) NOT NULL,
  `large` int(11) NOT NULL,
  `xlarge` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockproduct`
--

LOCK TABLES `stockproduct` WRITE;
/*!40000 ALTER TABLE `stockproduct` DISABLE KEYS */;
INSERT INTO `stockproduct` VALUES (1,0,12,12,0,1),(2,1,1,1,1,1),(3,0,1,7,0,2),(4,0,7,4,0,3),(5,0,7,3,3,4),(6,0,8,2,0,5),(7,-3,9,9,10,6),(8,0,6,9,0,7);
/*!40000 ALTER TABLE `stockproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kodeTransaksi` varchar(100) NOT NULL,
  `transactionImage` varchar(100) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `is_deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,'MaCommerce1568335679968',NULL,2,0,'2019-09-13 07:58:00',0),(2,'MaCommerce1568336326163',NULL,2,0,'2019-09-13 08:08:46',0),(3,'MaCommerce1568336708970',NULL,2,0,'2019-09-13 08:15:09',0);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_detail`
--

DROP TABLE IF EXISTS `transaction_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `small` int(11) DEFAULT '0',
  `medium` int(11) DEFAULT '0',
  `large` int(11) DEFAULT '0',
  `xlarge` int(11) DEFAULT '0',
  `price` int(11) NOT NULL,
  `total_price` int(11) NOT NULL DEFAULT '0',
  `transactionId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_detail`
--

LOCK TABLES `transaction_detail` WRITE;
/*!40000 ALTER TABLE `transaction_detail` DISABLE KEYS */;
INSERT INTO `transaction_detail` VALUES (1,3,0,0,1,0,250000,250000,1,2,0),(2,3,0,1,0,0,250000,250000,2,2,0),(3,2,0,0,2,0,200000,400000,3,2,0);
/*!40000 ALTER TABLE `transaction_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `password` varchar(65) NOT NULL,
  `email` varchar(45) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `address` longtext NOT NULL,
  `status` varchar(12) NOT NULL,
  `LastLogin` datetime NOT NULL,
  `UserImage` varchar(255) DEFAULT NULL,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'adminMa1997','7b24718bd586fb2cb9757822d359a8fbdfb0a804e2af474b68a0ae29ec3d384b','rezardiansyah1997@gmail.com','Reza','Ardiansyah','tangerang','Verified','2019-08-30 20:24:12',NULL,'Admin'),(2,'user123','70c7f533f04ec32bb092efc88854934cbcbc1f35fa1476f507324721b65b003c','rezamusashi@gmail.com','Reza','Ardiansyah','tangerang','Verified','2019-08-30 20:25:44','/users/images/MaCommerce-1567171543697.jpg','User');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-13  8:08:32
