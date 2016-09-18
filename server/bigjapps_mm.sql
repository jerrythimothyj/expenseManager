-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2016 at 09:32 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bigjapps_mm`
--

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE `calendar` (
  `sl` bigint(20) NOT NULL,
  `users_sl` bigint(20) NOT NULL,
  `date_yyyy` int(11) NOT NULL,
  `date_mm` int(11) NOT NULL,
  `date_dd` int(11) NOT NULL,
  `hours` int(11) NOT NULL,
  `minutes` int(11) NOT NULL,
  `reminder` text NOT NULL,
  `ip` text NOT NULL,
  `time` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `db_errors`
--

CREATE TABLE `db_errors` (
  `sl` bigint(20) NOT NULL,
  `users_sl` bigint(20) NOT NULL,
  `file_name` text CHARACTER SET utf8 NOT NULL,
  `query` text CHARACTER SET utf8 NOT NULL,
  `error` text CHARACTER SET utf8 NOT NULL,
  `ip` text CHARACTER SET utf8 NOT NULL,
  `time` text CHARACTER SET utf8 NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `sl` bigint(20) NOT NULL,
  `users_sl` bigint(20) NOT NULL,
  `date_yyyy` int(11) NOT NULL,
  `date_mm` int(11) NOT NULL,
  `date_dd` int(11) NOT NULL,
  `spendings_types_sl` bigint(20) NOT NULL,
  `expense_types_sl` bigint(20) NOT NULL,
  `comments` text CHARACTER SET utf8 NOT NULL,
  `amount` bigint(20) NOT NULL,
  `ip` text NOT NULL,
  `time` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `expense_types`
--

CREATE TABLE `expense_types` (
  `sl` bigint(20) NOT NULL,
  `type` text NOT NULL,
  `eg` text,
  `color` varchar(10) NOT NULL DEFAULT '6502fe',
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `expense_types`
--

INSERT INTO `expense_types` (`sl`, `type`, `eg`, `color`, `status`) VALUES
(1, 'food', NULL, '6502fe', 1),
(2, 'snacks', NULL, 'f6be0c', 1),
(3, 'clothing', NULL, 'f25533', 1),
(4, 'entertainment', NULL, '3fcccc', 1),
(5, 'electricity', NULL, '97b321', 1),
(6, 'water', NULL, '60ffc1', 1),
(7, 'wage', NULL, '8af73f', 1),
(8, 'travel', NULL, '2384e8', 1),
(9, 'construction', NULL, 'dcb799', 1),
(10, 'others', NULL, '80cded', 1),
(11, 'groceries', NULL, 'cccc3f', 1),
(12, 'phone', NULL, 'cccccc', 1),
(13, 'emi', NULL, '8521a3', 1),
(14, 'debt', NULL, '11fb5f', 1),
(15, 'toys', NULL, '967ae9', 1),
(16, 'furnitures', NULL, 'bb2d57', 1),
(17, 'household', NULL, 'e90756', 1),
(18, 'rent', NULL, '01f089', 1),
(19, 'donation', NULL, '46e4fa', 1),
(20, 'pets', NULL, '634496', 1),
(21, 'tv', NULL, '7fa9c2', 1),
(22, 'internet', NULL, '27adb9', 1),
(23, 'hobby', NULL, '4b4ce0', 1),
(24, 'jewels', NULL, 'e7650c', 1),
(25, 'electronics', NULL, 'b9d9ef', 1),
(26, 'electricals', NULL, '54b0b9', 1),
(27, 'baby', NULL, 'c3136b', 1),
(28, 'medication', NULL, 'd06be3', 1),
(29, 'trainings', NULL, 'a7616a', 1),
(30, 'grooming', NULL, 'e0a1b9', 1),
(31, 'moving', NULL, 'ddba5b', 1),
(32, 'bank', NULL, '6140ff', 1),
(33, 'creditcard', NULL, 'f6b448', 1),
(34, 'gifts', NULL, '78ea05', 1),
(35, 'debitcard', NULL, '4df67e', 1),
(36, 'othercards', NULL, '64a608', 1),
(37, 'photography', NULL, 'd07bca', 1),
(38, 'decoration', NULL, 'b5e4e5', 1),
(39, 'painting', NULL, 'cf937e', 1),
(40, 'labor', NULL, '32f664', 1),
(41, 'service', NULL, 'c3aec9', 1),
(42, 'sales', NULL, '56f94c', 1),
(43, 'vehicle', NULL, 'f4924e', 1),
(44, 'advertising', NULL, 'b9bd21', 1),
(45, 'alcohol', NULL, '08c6a0', 1),
(46, 'cylindergases', NULL, '5fa184', 1),
(47, 'hospitality', NULL, '5ee180', 1),
(48, 'gasoline', NULL, 'e2d666', 1),
(49, 'forms', NULL, '9fe603', 1),
(50, 'postage', NULL, '49c8f3', 1),
(51, 'safety', NULL, 'fcb67e', 1),
(52, 'tax', NULL, 'fdcef7', 1),
(53, 'meetings', NULL, 'accf92', 1),
(54, 'personal', NULL, 'e50ef7', 1),
(55, 'petrol', NULL, 'fadc84', 1),
(56, 'fuel', NULL, 'f9174c', 1),
(57, 'tuition', NULL, 'f0f54d', 1);

-- --------------------------------------------------------

--
-- Table structure for table `spending_types`
--

CREATE TABLE `spending_types` (
  `sl` bigint(20) NOT NULL,
  `type` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `spending_types`
--

INSERT INTO `spending_types` (`sl`, `type`, `status`) VALUES
(1, 'earnings', 1),
(2, 'spending', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `sl` bigint(20) NOT NULL,
  `email` text CHARACTER SET utf8 NOT NULL,
  `password` text CHARACTER SET utf8 NOT NULL,
  `ip` text NOT NULL,
  `time` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`sl`, `email`, `password`, `ip`, `time`) VALUES
(1, 'jerrythimothy@gmail.com', 'qwer4321', '::1', 'Saturday 17th of September 2016 06:42:24 PM');

-- --------------------------------------------------------

--
-- Table structure for table `users_log`
--

CREATE TABLE `users_log` (
  `sl` bigint(20) NOT NULL,
  `users_sl` bigint(20) NOT NULL,
  `ip` text NOT NULL,
  `time` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_log`
--

INSERT INTO `users_log` (`sl`, `users_sl`, `ip`, `time`) VALUES
(1, 1, '::1', 'Saturday 17th of September 2016 06:42:39 PM'),
(2, 1, '::1', 'Saturday 17th of September 2016 08:13:08 PM'),
(3, 1, '::1', 'Sunday 18th of September 2016 07:57:38 AM'),
(4, 1, '::1', 'Sunday 18th of September 2016 08:12:07 AM');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `calendar`
--
ALTER TABLE `calendar`
  ADD PRIMARY KEY (`sl`);

--
-- Indexes for table `db_errors`
--
ALTER TABLE `db_errors`
  ADD PRIMARY KEY (`sl`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`sl`);

--
-- Indexes for table `expense_types`
--
ALTER TABLE `expense_types`
  ADD PRIMARY KEY (`sl`);

--
-- Indexes for table `spending_types`
--
ALTER TABLE `spending_types`
  ADD PRIMARY KEY (`sl`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`sl`);

--
-- Indexes for table `users_log`
--
ALTER TABLE `users_log`
  ADD PRIMARY KEY (`sl`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
  MODIFY `sl` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `db_errors`
--
ALTER TABLE `db_errors`
  MODIFY `sl` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `sl` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `expense_types`
--
ALTER TABLE `expense_types`
  MODIFY `sl` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT for table `spending_types`
--
ALTER TABLE `spending_types`
  MODIFY `sl` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `sl` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users_log`
--
ALTER TABLE `users_log`
  MODIFY `sl` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
