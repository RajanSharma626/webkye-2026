-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2024 at 01:57 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `techsoul`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(266) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(2, 'rajansharma.webkye@gmail.com', '7496ccc67f8591128e0e6cb496dbe455'),
(5, 'info@techsoulsolutions.com', '9967613012bccef85f08782d0dd1de9e');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `title` varchar(266) NOT NULL,
  `cover` text NOT NULL,
  `url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `timestamp`, `title`, `cover`, `url`) VALUES
(3, '2024-06-05 09:56:34', 'Transforming Tomorrow: TechSoul Solutions Leading the Tech Revolution', '2153.jpg', 'https://medium.com/@info_86927/transforming-tomorrow-techsoul-solutions-leading-the-tech-revolution-1f63e550ade9'),
(4, '2024-06-05 09:57:17', 'Navigating the 7 Stages of Web Application Development: A Comprehensive Guide', '2644.jpg', 'https://medium.com/@info_86927/navigating-the-7-stages-of-web-application-development-a-comprehensive-guide-b120b58a4c94'),
(5, '2024-06-05 09:57:50', 'Navigating the Seven Stages of Application Development: A Comprehensive Guide', '925.jpg', 'https://medium.com/@info_86927/navigating-the-seven-stages-of-application-development-a-comprehensive-guide-e587570cdfe8');

-- --------------------------------------------------------

--
-- Table structure for table `contact_form`
--

CREATE TABLE `contact_form` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(20) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(266) NOT NULL,
  `company` varchar(266) NOT NULL,
  `services` varchar(266) NOT NULL,
  `message` text NOT NULL,
  `contact_method` varchar(266) NOT NULL,
  `contact_time` varchar(266) NOT NULL,
  `reference` varchar(266) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question`, `answer`) VALUES
(4, 'What are the different types of Custom software development?', 'Custom software development encompasses web, mobile, enterprise solutions tailored to specific needs.'),
(5, 'What is Custom Software Development?', 'Custom software development involves creating unique solutions for organizations or users.'),
(6, 'What is the duration required to build the application?', 'Duration varies based on complexity, ranging from weeks for simple apps to months for complex systems.'),
(7, 'Is it possible to hire a developer on an hourly basis?', 'Yes, developers can be hired hourly for flexibility in resource allocation.'),
(8, 'How much does custom software development cost?', 'Cost varies based on factors like complexity, features, and technology stack.'),
(9, 'Does your custom software development company offer post-development support?', 'Post-development support is provided for maintenance, updates, and technical assistance.'),
(10, 'Can I hire a custom software developer on a full-time basis?', 'Full-time developers can be hired for dedicated project work.'),
(11, 'What types of industries have you served?', 'Industries served include healthcare, finance, retail, manufacturing, education, and more.'),
(12, 'Which coding style and technologies do you implement?', 'Modern coding languages and frameworks like JavaScript, Python, React, and Django are used.'),
(13, ' How do we get started?', 'Get started by contacting us with your project requirements for a consultation.'),
(14, 'Do you provide an NDA Signed Document for my project?', 'Non-disclosure agreements are provided to ensure project confidentiality.'),
(15, 'How will I be getting regular reports and updates about my project?', 'What if I am in a different time zone? - Regular updates are provided through various communication channels to accommodate different time zones.'),
(16, 'How do you ensure the quality of the project delivered?', 'Quality assurance processes ensure project quality through code reviews, testing, and feedback.'),
(17, ' What development process do you follow?', 'Agile methodologies like Scrum or Kanban are followed for efficient, iterative development.'),
(18, 'Did I own the code authority of the project?', 'Upon completion and payment, clients own full code authority and intellectual property rights.');

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `id` int(11) NOT NULL,
  `name` varchar(266) NOT NULL,
  `email` varchar(266) NOT NULL,
  `phone` varchar(266) NOT NULL,
  `position` varchar(266) NOT NULL,
  `resume` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`timestamp`, `id`, `name`, `email`, `phone`, `position`, `resume`) VALUES
('2024-06-05 08:30:12', 1, 'Rajan Sharma', 'dev@wowevents.in', '8468027626', 'React Native', 'uploads/estimatenew.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `job_post`
--

CREATE TABLE `job_post` (
  `id` int(11) NOT NULL,
  `job` varchar(266) NOT NULL,
  `exp` varchar(266) NOT NULL,
  `opening` varchar(266) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_post`
--

INSERT INTO `job_post` (`id`, `job`, `exp`, `opening`) VALUES
(2, 'React Native Developer', '0 to 1+ Year', '1'),
(3, 'React JS Developer', '0 to 1+ Year', '1'),
(4, 'Next JS Developer', '0 to 1+ Year', '1'),
(5, 'BDE Developer', '0 to 1+ Year', '1');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `name` varchar(266) NOT NULL,
  `designation` varchar(266) NOT NULL,
  `profile` text NOT NULL DEFAULT 'default-avatar.jpg',
  `fb` text DEFAULT NULL,
  `insta` text DEFAULT NULL,
  `linkedin` text DEFAULT NULL,
  `wp` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `name`, `designation`, `profile`, `fb`, `insta`, `linkedin`, `wp`) VALUES
(4, 'Dishant Chanchad', 'Founder & CEO', 'default-avatar.jpg', '', 'https://www.instagram.com/dishant_chanchad124/', 'https://www.linkedin.com/in/dishant-chanchad-605a40117?original_referer=http%3A%2F%2Flocalhost%2F', ''),
(5, 'Smit Bhanderi', 'Data Scientists', 'default-avatar.jpg', '', 'https://www.instagram.com/smit_bhanderi3/', 'https://www.linkedin.com/in/smitbhanderi3', '6353636850'),
(6, 'Chirag Vekariya', 'Web & App Developer Experts', 'default-avatar.jpg', '', 'https://www.instagram.com/mr.chirag_vekariya/', 'https://www.linkedin.com/in/chirag-vekariya-269102159/?original_referer=http%3A%2F%2Flocalhost%2F', '9328442730');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(266) NOT NULL,
  `profile` text NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `timestamp`, `name`, `profile`, `comment`) VALUES
(8, '2024-06-05 10:48:28', 'Zain Ullah Muhammad', 'default_profile.png', 'Dear Dishant,\r\n                                        I am so impressed with your passion for your work. You clearly love what you do\r\n                                        and it shows in the quality of your apps. You are always looking for ways to\r\n                                        improve your apps and you are never satisfied with the status quo.'),
(9, '2024-06-05 10:49:11', 'MD Shahbaz Khan', '726shahbaj-khan.jpeg', 'I worked for Android app alteration with Dishant. His\r\n                                        service is nice. Happy to recommend.'),
(10, '2024-06-05 10:49:42', 'Ankit sharma', '135ullah-muhammad.jpeg', 'I recently hired Dishant on Upwork for a mobile\r\n                                        development project, and I am thrilled with the results! He completed the job\r\n                                        successfully and quickly and exceeded my expectations in every way.\r\n                                        From the beginning, Dishant showed a high level of professionalism, expertise,\r\n                                        and communication skills. He took the time to understand the requirements of the\r\n                                        project and provided valuable insights and suggestions to enhance its\r\n                                        functionality and user experience...'),
(11, '2024-06-05 10:50:17', 'Kevin Shah', '946kevin-shah.jpeg', 'Excellent communication and in depth knowledge of\r\n                                        mobile development');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_post`
--
ALTER TABLE `job_post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `job_post`
--
ALTER TABLE `job_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
