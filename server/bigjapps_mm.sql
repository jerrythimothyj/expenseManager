-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 16, 2016 at 05:02 PM
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
  `expense_types_other` text CHARACTER SET utf8 NOT NULL,
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
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `expense_types`
--

INSERT INTO `expense_types` (`sl`, `type`, `eg`, `status`) VALUES
(1, 'food', NULL, 1),
(2, 'snacks', NULL, 1),
(3, 'clothing', NULL, 1),
(4, 'entertainment', NULL, 1),
(5, 'electricity', NULL, 1),
(6, 'water', NULL, 1),
(7, 'wage', NULL, 1),
(8, 'travel', NULL, 1),
(9, 'construction', NULL, 1),
(10, 'others', NULL, 1),
(11, 'groceries', NULL, 1),
(12, 'phone', NULL, 1),
(13, 'emi', NULL, 1),
(14, 'debt', NULL, 1),
(15, 'toys', NULL, 1),
(16, 'furnitures', NULL, 1),
(17, 'household', NULL, 1),
(18, 'rent', NULL, 1),
(19, 'donation', NULL, 1),
(20, 'pets', NULL, 1),
(21, 'tv', NULL, 1),
(22, 'internet', NULL, 1),
(23, 'hobby', NULL, 1),
(24, 'jewels', NULL, 1),
(25, 'electronics', NULL, 1),
(26, 'electricals', NULL, 1),
(27, 'baby', NULL, 1),
(28, 'medication', NULL, 1),
(29, 'trainings', NULL, 1),
(30, 'grooming', NULL, 1),
(31, 'moving', NULL, 1),
(32, 'bank', NULL, 1),
(33, 'creditcard', NULL, 1),
(34, 'gifts', NULL, 1),
(35, 'debitcard', NULL, 1),
(36, 'othercards', NULL, 1),
(37, 'photography', NULL, 1),
(38, 'decoration', NULL, 1),
(39, 'painting', NULL, 1),
(40, 'labor', NULL, 1),
(41, 'service', NULL, 1),
(42, 'sales', NULL, 1),
(43, 'vehicle', NULL, 1),
(44, 'advertising', NULL, 1),
(45, 'alcohol', NULL, 1),
(46, 'cylindergases', NULL, 1),
(47, 'hospitality', NULL, 1),
(48, 'gasoline', NULL, 1),
(49, 'forms', NULL, 1),
(50, 'postage', NULL, 1),
(51, 'safety', NULL, 1),
(52, 'tax', NULL, 1),
(53, 'meetings', NULL, 1),
(54, 'personal', NULL, 1),
(55, 'petrol', NULL, 1),
(56, 'fuel', NULL, 1),
(57, 'tuition', NULL, 1);

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
  MODIFY `sl` bigint(20) NOT NULL AUTO_INCREMENT;
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
  MODIFY `sl` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users_log`
--
ALTER TABLE `users_log`
  MODIFY `sl` bigint(20) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
