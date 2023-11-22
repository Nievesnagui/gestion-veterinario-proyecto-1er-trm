-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: database:3306
-- Tiempo de generación: 22-11-2023 a las 12:33:00
-- Versión del servidor: 8.1.0
-- Versión de PHP: 8.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_veterinario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `id` bigint NOT NULL,
  `id_veterinario` bigint NOT NULL,
  `id_mascota` bigint NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`id`, `id_veterinario`, `id_mascota`, `fecha`) VALUES
(77, 118, 82, '2023-07-18 09:45:52'),
(78, 122, 80, '2020-02-23 12:32:58'),
(80, 121, 77, '2023-02-03 17:11:28'),
(81, 119, 79, '2020-04-09 23:57:13'),
(82, 126, 76, '2022-08-25 10:46:36'),
(83, 119, 78, '2020-06-05 02:09:50'),
(84, 118, 77, '2023-04-11 12:12:51'),
(85, 123, 77, '2020-05-05 19:19:29'),
(86, 119, 74, '2021-02-15 22:59:58'),
(87, 122, 80, '2022-04-07 05:43:45'),
(88, 124, 73, '2020-04-01 05:01:50'),
(89, 119, 76, '2023-11-09 10:58:13'),
(90, 120, 76, '2023-11-19 11:26:54'),
(91, 124, 77, '2023-11-30 11:27:46'),
(92, 124, 78, '2023-11-16 11:28:42'),
(93, 121, 77, '2023-11-30 11:31:01'),
(94, 123, 78, '2023-11-29 11:31:47'),
(95, 123, 78, '2023-11-16 11:32:43'),
(96, 124, 78, '2023-11-23 11:40:33'),
(97, 123, 78, '2023-11-11 11:39:29'),
(98, 126, 81, '2023-11-30 11:39:53'),
(99, 126, 74, '2023-11-19 11:42:26'),
(100, 123, 78, '2023-11-18 11:43:39'),
(101, 123, 75, '2023-11-18 11:45:33'),
(102, 126, 79, '2023-11-19 11:50:02'),
(103, 121, 79, '2023-11-30 16:11:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascota`
--

CREATE TABLE `mascota` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `chip` bigint NOT NULL,
  `propietario` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mascota`
--

INSERT INTO `mascota` (`id`, `name`, `chip`, `propietario`, `phone`, `email`) VALUES
(72, 'Bollito', 12345678, 'Pepe', '647512369', 'mail@correo.es'),
(73, 'Micho', 12345678, 'Juan', '647512369', 'mail@correo.es'),
(74, 'Miaumilton', 1234568, 'Esther Lozano', '625413285', 'MiaEst0@ausiasmarch.net'),
(75, 'Bollito', 1234568, 'Esperanza Jimenez', '625413285', 'BolEsp1@ausiasmarch.net'),
(76, 'Michuelo', 1234568, 'María Palomero', '625413285', 'MicMar2@ausiasmarch.net'),
(77, 'Albaricoque', 1234568, 'Esperanza Aguilar', '625413285', 'AlbEsp3@ausiasmarch.net'),
(78, 'Bollito', 1234568, 'Aurora Jimenez', '625413285', 'BolAur4@ausiasmarch.net'),
(79, 'Jaboncillo', 1234568, 'Aurora Cuesta', '625413285', 'JabAur5@ausiasmarch.net'),
(80, 'Magdaleno', 1234568, 'María Díaz', '625413285', 'MagMar6@ausiasmarch.net'),
(81, 'Magdaleno', 1234568, 'Esperanza Díaz', '625413285', 'MagEsp7@ausiasmarch.net'),
(82, 'Albaricoque', 1234568, 'Gabriel Díaz', '625413285', 'AlbGab8@ausiasmarch.net'),
(83, 'Miaumilton', 1234568, 'Juan Díaz', '625413285', 'MiaJua9@ausiasmarch.net'),
(84, 'sfsdf', 12334, 'fsfdsf', '65413325', 'ffds@ds.ds'),
(85, 'Jaboncillo', 1234568, 'Gabriel Aguilar', '625413285', 'JabGab0@ausiasmarch.net'),
(86, 'Bollito', 1234568, 'Esperanza Aguilar', '625413285', 'BolEsp1@ausiasmarch.net'),
(87, 'Magdaleno', 1234568, 'Aurora Jimenez', '625413285', 'MagAur2@ausiasmarch.net'),
(88, 'Michuelo', 1234568, 'Cristina Palomero', '625413285', 'MicCri3@ausiasmarch.net'),
(89, 'Michuelo', 1234568, 'Aurora Palomero', '625413285', 'MicAur4@ausiasmarch.net'),
(90, 'Miaumilton', 1234568, 'Aurora Díaz', '625413285', 'MiaAur5@ausiasmarch.net'),
(91, 'Magdaleno', 1234568, 'Juan Cuesta', '625413285', 'MagJua6@ausiasmarch.net'),
(92, 'Albaricoque', 1234568, 'María Dominguez', '625413285', 'AlbMar7@ausiasmarch.net'),
(93, 'Michuelo', 1234568, 'Esperanza Lozano', '625413285', 'MicEsp8@ausiasmarch.net'),
(94, 'Michuelo', 1234568, 'Esperanza Cuesta', '625413285', 'MicEsp9@ausiasmarch.net');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `veterinario`
--

CREATE TABLE `veterinario` (
  `id` bigint NOT NULL,
  `name` varchar(250) NOT NULL,
  `surname` varchar(250) NOT NULL,
  `email` varchar(55) NOT NULL,
  `password` varchar(250) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `username` varchar(25) NOT NULL,
  `role` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `veterinario`
--

INSERT INTO `veterinario` (`id`, `name`, `surname`, `email`, `password`, `phone`, `dni`, `username`, `role`) VALUES
(118, 'Admin', 'Apellido', 'mail@mail.com', 'e2cac5c5f7e52ab03441bb70e89726ddbd1f6e5b683dde05fb65e0720290179e', '658945123', '32569874A', 'useradmin', 0),
(119, 'User', 'Apellido', 'mail@mail.com', 'e2cac5c5f7e52ab03441bb70e89726ddbd1f6e5b683dde05fb65e0720290179e', '658945123', '32569874A', 'useruser', 1),
(120, 'Aurora', 'Aguilar', 'AurAgu0@ausiasmarch.net', 'unapasswordsegura123455677899765430', '648956235', '32323232r', 'Aurgu0', 1),
(121, 'Esperanza', 'Cuesta', 'EspCue1@ausiasmarch.net', 'unapasswordsegura123455677899765431', '648956235', '32323232r', 'Espue1', 1),
(122, 'Aurora', 'Díaz', 'AurDía2@ausiasmarch.net', 'unapasswordsegura123455677899765432', '648956235', '32323232r', 'Auria2', 1),
(123, 'Aurora', 'Molina', 'AurCue3@ausiasmarch.net', 'unapasswordsegura123455677899765433', '648956235', '32323232r', 'Aurue3', 1),
(124, 'María', 'Lozano', 'MarLoz4@ausiasmarch.net', 'unapasswordsegura123455677899765434', '648956235', '32323232r', 'Maroz4', 1),
(125, 'Esperanza', 'Lozano', 'EspLoz5@ausiasmarch.net', 'unapasswordsegura123455677899765435', '648956235', '32323232r', 'Espoz5', 1),
(126, 'Esperanza', 'Jimenez', 'EspJim6@ausiasmarch.net', 'unapasswordsegura123455677899765436', '648956235', '32323232r', 'Espim6', 1),
(127, 'Aurora', 'Jimenez', 'AurJim7@ausiasmarch.net', 'unapasswordsegura123455677899765437', '648956235', '32323232r', 'Aurim7', 1),
(128, 'Aurora', 'Dominguez', 'AurDom8@ausiasmarch.net', 'unapasswordsegura123455677899765438', '648956235', '32323232r', 'Aurom8', 1),
(129, 'Cristina', 'Dominguez', 'CriDom9@ausiasmarch.net', 'unapasswordsegura123455677899765439', '648956235', '32323232r', 'Criom9', 1),
(130, 'Cristina', 'Cuesta', 'CriCue0@ausiasmarch.net', 'unapasswordsegura123455677899765430', '648956235', '32323232r', 'Criue0', 1),
(131, 'Esther', 'Lozano', 'EstLoz1@ausiasmarch.net', 'unapasswordsegura123455677899765431', '648956235', '32323232r', 'Estoz1', 1),
(132, 'Cristina', 'Aguilar', 'CriAgu2@ausiasmarch.net', 'unapasswordsegura123455677899765432', '648956235', '32323232r', 'Crigu2', 1),
(133, 'Cristina', 'Aguilar', 'CriAgu3@ausiasmarch.net', 'unapasswordsegura123455677899765433', '648956235', '32323232r', 'Crigu3', 1),
(134, 'Esperanza', 'Aguilar', 'EspAgu4@ausiasmarch.net', 'unapasswordsegura123455677899765434', '648956235', '32323232r', 'Espgu4', 1),
(135, 'Juan', 'Dominguez', 'JuaDom5@ausiasmarch.net', 'unapasswordsegura123455677899765435', '648956235', '32323232r', 'Juaom5', 1),
(136, 'Gabriel', 'Dominguez', 'GabDom6@ausiasmarch.net', 'unapasswordsegura123455677899765436', '648956235', '32323232r', 'Gabom6', 1),
(137, 'Esther', 'Palomero', 'EstPal7@ausiasmarch.net', 'unapasswordsegura123455677899765437', '648956235', '32323232r', 'Estal7', 1),
(138, 'María', 'Díaz', 'MarDía8@ausiasmarch.net', 'unapasswordsegura123455677899765438', '648956235', '32323232r', 'Maria8', 1),
(139, 'Gabriel', 'Díaz', 'GabDía9@ausiasmarch.net', 'unapasswordsegura123455677899765439', '648956235', '32323232r', 'Gabia9', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `veterinario`
--
ALTER TABLE `veterinario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT de la tabla `mascota`
--
ALTER TABLE `mascota`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT de la tabla `veterinario`
--
ALTER TABLE `veterinario`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
