-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 15, 2025 at 06:40 AM
-- Server version: 8.0.30
-- PHP Version: 8.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lufion_course`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `price` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `schedule` datetime NOT NULL,
  `created_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `price`, `image`, `schedule`, `created_by`) VALUES
(45, 'kelas crypto', 'btc naik', 2000000, 'https://cdn1-production-images-kly.akamaized.net/7rixbkcssusniguVHCdzK29aZ5M=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/5028255/original/089063500_1732871319-fotor-ai-2024112916722.jpg', '2025-08-28 00:09:00', 7),
(47, 'hvm', 'cara menjadi pria yang berkualitas', 2000000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq3VI4B7LIFz_5kBqRV-ouYuvZp9-W9YZ09A&s', '2025-07-23 22:01:00', 6),
(55, 'financial freedom', 'sangat enak menjadi kaya kalo beli tidak lihat harga', 1200000, 'https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-saving-money-2d-vector-isolated-illustration-concept-invest-banner-vector-png-image_47658278.jpg', '2025-07-31 10:54:00', 6);

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `enrolled_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`id`, `user_id`, `course_id`, `enrolled_at`) VALUES
(16, 7, 45, '2025-07-13 14:43:59'),
(23, 6, 45, '2025-07-14 07:11:04'),
(24, 6, 47, '2025-07-14 10:23:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(6, 'nuropik', 'rofiqcrb@gmail.com', '$2y$12$nWyKZgdn.Ey5zT/kb/zjVOOvjRh9T785t4fC9f31LpKytpOBc6XBu', 'admin'),
(7, 'cika', 'cika@gmail.com', '$2y$12$9lARMDObP8vOgHernZ.9zuYxgng2upQqbtjj/G8ucJRqPwqoX4M4G', 'admin'),
(13, 'bray', 'bray@gmail.com', '$2y$12$Q1dt3mTuN.ijTdLvafzbJeALi.dREK4/XxwuGLifyEV262JrZQfX.', 'admin'),
(14, 'ofi', 'ofi@gmail.com', '$2y$12$fywHdj8pVBS2zR2YW2JQeuU7N1aNUn9hoLjJoYT16hEwAq1lhL/u6', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
