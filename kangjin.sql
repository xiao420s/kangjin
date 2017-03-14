-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-03-14 11:30:08
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `kangjin`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin_user`
--

CREATE TABLE IF NOT EXISTS `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `admin_user`
--

INSERT INTO `admin_user` (`id`, `account`, `password`, `hash`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '88468d8478342c7b664e011062129a10');

-- --------------------------------------------------------

--
-- 表的结构 `content`
--

CREATE TABLE IF NOT EXISTS `content` (
  `c_id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `cate_id` int(12) NOT NULL,
  `content` text NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author` varchar(255) NOT NULL,
  `views` int(12) NOT NULL,
  PRIMARY KEY (`c_id`),
  KEY `cate_id` (`cate_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `content`
--

INSERT INTO `content` (`c_id`, `title`, `subtitle`, `cate_id`, `content`, `img_url`, `time`, `author`, `views`) VALUES
(2, '是', '是', 2, '<p>是是是</p>', '/product/1.png', '2017-03-14 14:50:03', '是', 0);

-- --------------------------------------------------------

--
-- 表的结构 `contentimg`
--

CREATE TABLE IF NOT EXISTS `contentimg` (
  `i_id` int(12) NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) NOT NULL,
  `c_id` int(12) NOT NULL,
  PRIMARY KEY (`i_id`),
  KEY `c_id` (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `content_cates`
--

CREATE TABLE IF NOT EXISTS `content_cates` (
  `cate_id` int(12) NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(255) NOT NULL,
  PRIMARY KEY (`cate_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `content_cates`
--

INSERT INTO `content_cates` (`cate_id`, `cate_name`) VALUES
(1, '最新公告'),
(2, '公司新闻'),
(3, '行业动态');

-- --------------------------------------------------------

--
-- 表的结构 `health`
--

CREATE TABLE IF NOT EXISTS `health` (
  `c_id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author` varchar(255) NOT NULL,
  `views` int(12) NOT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `health`
--

INSERT INTO `health` (`c_id`, `title`, `subtitle`, `content`, `img_url`, `time`, `author`, `views`) VALUES
(3, '', '', '', '', '2017-03-14 15:09:41', '', 0),
(4, 'dddd', '', '<p><br></p>', '', '2017-03-14 15:53:42', '', 0),
(5, '', '', '', '', '2017-03-14 15:53:50', '', 0),
(6, '', '', '', '', '2017-03-14 15:53:54', '', 0);

-- --------------------------------------------------------

--
-- 表的结构 `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `m_id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`m_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `message`
--

INSERT INTO `message` (`m_id`, `name`, `email`, `phone`, `time`, `content`) VALUES
(2, '张', '1', '13222222222', '2017-03-14 18:12:27', '时尚'),
(3, '宋', 'q', '12345543', '2017-03-14 18:12:27', '少时诵诗少时诵诗书少时诵诗书水水水水少时诵诗书水水水水');

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `ename` varchar(255) NOT NULL,
  `thumb` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `fun` varchar(255) NOT NULL,
  `fun_content` text NOT NULL,
  `fun_e_content` text NOT NULL,
  `cate_id` int(12) NOT NULL,
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cate_id` (`cate_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`id`, `name`, `ename`, `thumb`, `title`, `subtitle`, `fun`, `fun_content`, `fun_e_content`, `cate_id`, `content`) VALUES
(2, '豆腐2s', 'TOFU2', '/product/1.png', '4SPECIAL FOOD.', 'EVERY FAMILY HAS ITS OWN', '营养功效', '油泼豆腐特点是颜色洁白、原汁原味，咸鲜适口、香滑味美，营养丰富。s', 'Youpo tofu is characterized by white color, flavor, salty taste, delicious fragrance, rich nutrition.s', 2, '<p>&nbsp; 1.准备好炒菜所用食材，把泡发好的黄豆兑入700ml的清水倒入料理机中，用高\n速搅打两分钟，使之成浓浆，在小锅上放好\n过滤网搅打好的浓浆倒入其中过筛，滤掉豆粕。点火把豆浆烧开&nbsp;</p><p>&nbsp; 2.准备好炒菜所用食材，把泡发好的黄豆兑入700ml的清水倒入料理机中，用高\n速搅打两分钟，使之成浓浆，在小锅上放好\n过滤网搅打好的浓浆倒入其中过筛，滤掉豆粕。点火把豆浆烧开&nbsp;</p><p>&nbsp; 3.准备好炒菜所用食材，把泡发好的黄豆兑入700ml的清水倒入料理机中，用高\n速搅打两分钟，使之成浓浆，在小锅上放好\n过滤网搅打好的浓浆倒入其中过筛，滤掉豆粕。点火把豆浆烧开</p>'),
(4, '', '', '', '', '', '', '', '', 1, '');

-- --------------------------------------------------------

--
-- 表的结构 `product_cates`
--

CREATE TABLE IF NOT EXISTS `product_cates` (
  `cate_id` int(12) NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(255) NOT NULL,
  PRIMARY KEY (`cate_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `product_cates`
--

INSERT INTO `product_cates` (`cate_id`, `cate_name`) VALUES
(1, '豆浆'),
(2, '传统豆制品'),
(3, '卤制品'),
(5, '豆芽菜');

-- --------------------------------------------------------

--
-- 表的结构 `product_img`
--

CREATE TABLE IF NOT EXISTS `product_img` (
  `i_id` int(12) NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) NOT NULL,
  `c_id` int(12) NOT NULL,
  PRIMARY KEY (`i_id`),
  KEY `c_id` (`c_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=30 ;

--
-- 转存表中的数据 `product_img`
--

INSERT INTO `product_img` (`i_id`, `img_url`, `c_id`) VALUES
(1, '/product/1.png', 2),
(2, '/product/2.png', 2),
(29, '/product/0cc2f19f013e9db33c5b8f892b8203cd.png', 2);

-- --------------------------------------------------------

--
-- 表的结构 `recruit`
--

CREATE TABLE IF NOT EXISTS `recruit` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `job` varchar(255) NOT NULL,
  `num` int(12) NOT NULL,
  `demand` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `recruit`
--

INSERT INTO `recruit` (`id`, `job`, `num`, `demand`) VALUES
(2, '前端工程师', 2, '长得帅');

--
-- 限制导出的表
--

--
-- 限制表 `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `content_ibfk_1` FOREIGN KEY (`cate_id`) REFERENCES `content_cates` (`cate_id`);

--
-- 限制表 `contentimg`
--
ALTER TABLE `contentimg`
  ADD CONSTRAINT `contentimg_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `content` (`c_id`);

--
-- 限制表 `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`cate_id`) REFERENCES `product_cates` (`cate_id`);

--
-- 限制表 `product_img`
--
ALTER TABLE `product_img`
  ADD CONSTRAINT `product_img_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `product` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
