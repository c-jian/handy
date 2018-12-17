-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2018-12-17 15:06:34
-- 服务器版本： 5.7.23
-- PHP 版本： 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `handy`
--

-- --------------------------------------------------------

--
-- 表的结构 `account-info`
--

DROP TABLE IF EXISTS `account-info`;
CREATE TABLE IF NOT EXISTS `account-info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '账号信息id',
  `title` varchar(180) DEFAULT NULL COMMENT '账号平台',
  `username` varchar(120) DEFAULT NULL COMMENT '账号用户名',
  `password` varchar(32) DEFAULT NULL COMMENT '账号密码',
  `url` varchar(250) DEFAULT NULL COMMENT '链接',
  `email` varchar(180) DEFAULT NULL COMMENT '邮箱',
  `other` varchar(1024) DEFAULT NULL COMMENT '其他',
  `addtime` datetime DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `account-info`
--

INSERT INTO `account-info` (`id`, `title`, `username`, `password`, `url`, `email`, `other`, `addtime`) VALUES
(1, '这是一个测试', '测试', '4646', 'https://fanyi.baidu.com/#zh/en/%E8%B4%A6%E5%8F%B7%E4%BF%A1%E6%81%AF', '5445', NULL, NULL),
(2, '万网账号', 'cjian', 'cjian', 'https://blog.csdn.net/booljiaoyu/article/details/58049140', '', NULL, NULL),
(3, '万网账号', 'cjian', 'cjian', 'https://blog.csdn.net/booljiaoyu/article/details/58049140', '', NULL, NULL),
(5, '我的标题', '你的标题', '我的密码', 'fdfd', '逢恶导非', NULL, NULL),
(6, '阿里云', 'cj', 'cj', '', '', NULL, NULL),
(8, '万网账号', 'cjian', 'cjian', 'https://blog.csdn.net/booljiaoyu/article/details/58049140', '', NULL, NULL),
(19, '这是一个测试', '测试', '4646', 'https://fanyi.baidu.com/#zh/en/%E8%B4%A6%E5%8F%B7%E4%BF%A1%E6%81%AF', '5445', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `uname` varchar(52) DEFAULT NULL COMMENT '用户名',
  `password` char(32) DEFAULT NULL COMMENT '用户密码',
  `regtime` datetime DEFAULT NULL COMMENT '注册时间',
  `token` char(40) DEFAULT NULL COMMENT '登录token',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `uname`, `password`, `regtime`, `token`) VALUES
(6, 'cj', '28198b369067e88dab9fefe85484dbf4', '2018-12-14 23:48:36', 'b0a8ce67d28c41d2377aeaf661e927c96e53b5c2');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
