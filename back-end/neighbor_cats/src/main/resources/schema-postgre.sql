-- neighborcats.address definition

CREATE TABLE `address` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `depth1` varchar(255) DEFAULT NULL,
  `depth2` varchar(255) DEFAULT NULL,
  `depth3` varchar(255) DEFAULT NULL,
  `depth4` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


-- neighborcats.cat_kind definition

CREATE TABLE `cat_kind` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- neighborcats.img_file definition

CREATE TABLE `img_file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `created_at` datetime(6) DEFAULT NULL COMMENT '저장일',
  `ext` varchar(255) DEFAULT NULL COMMENT '확장자명',
  `file_name` varchar(255) DEFAULT NULL COMMENT '파일명',
  `file_path` varchar(255) DEFAULT NULL COMMENT '파일 저장 경로',
  `url` varchar(255) DEFAULT NULL COMMENT '파일 접근 URL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='이미지 파일 저장 정보';


-- neighborcats.keep definition

CREATE TABLE `keep` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `feed_id` bigint(20) DEFAULT NULL,
  `servant_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- neighborcats.question definition

CREATE TABLE `question` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `conetent` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- neighborcats.`role` definition

CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


-- neighborcats.tag definition

CREATE TABLE `tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


-- neighborcats.basic_img_file definition

CREATE TABLE `basic_img_file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `img_file_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_1q2tmv4xnq6v59f52owxkvosy` (`type`),
  KEY `FKfycv6iwo6jj11afd583t9k4wg` (`img_file_id`),
  CONSTRAINT `FKfycv6iwo6jj11afd583t9k4wg` FOREIGN KEY (`img_file_id`) REFERENCES `img_file` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- neighborcats.question_img definition

CREATE TABLE `question_img` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `img_file_id` bigint(20) DEFAULT NULL,
  `question_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3xu8s1ps87xtlumyg2p4l4smc` (`img_file_id`),
  KEY `FK4wb2fr6n0al7yvg1tp5ovnjfe` (`question_id`),
  CONSTRAINT `FK3xu8s1ps87xtlumyg2p4l4smc` FOREIGN KEY (`img_file_id`) REFERENCES `img_file` (`id`),
  CONSTRAINT `FK4wb2fr6n0al7yvg1tp5ovnjfe` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- neighborcats.question_tag definition

CREATE TABLE `question_tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `question_id` bigint(20) DEFAULT NULL,
  `tag_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK44ydihbi2qk8k96175quf5q63` (`question_id`),
  KEY `FKnacet7y1n8llxvrbmm3xdq13j` (`tag_id`),
  CONSTRAINT `FK44ydihbi2qk8k96175quf5q63` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`),
  CONSTRAINT `FKnacet7y1n8llxvrbmm3xdq13j` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- neighborcats.servant definition

CREATE TABLE `servant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `email` varchar(255) DEFAULT NULL COMMENT '이메일',
  `nickname` varchar(255) DEFAULT NULL COMMENT '별명',
  `password` varchar(255) DEFAULT NULL COMMENT '비밀번호',
  `phone_number` varchar(255) DEFAULT NULL COMMENT '휴대폰 번호',
  `postcode` varchar(255) DEFAULT NULL COMMENT '우편번호(주소정보)',
  `name` varchar(20) DEFAULT NULL,
  `is_servant` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `address_id` bigint(20) NOT NULL,
  `profile_img_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjb0s35tyf1dp7jfx2hg6ux2ji` (`profile_img_id`),
  KEY `FKqkjrmkaakcy0xwh61q0lyp3vs` (`address_id`),
  CONSTRAINT `FKjb0s35tyf1dp7jfx2hg6ux2ji` FOREIGN KEY (`profile_img_id`) REFERENCES `img_file` (`id`),
  CONSTRAINT `FKqkjrmkaakcy0xwh61q0lyp3vs` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COMMENT='집사(유저정보)';


-- neighborcats.servant_roles definition

CREATE TABLE `servant_roles` (
  `servant_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`servant_id`,`role_id`),
  KEY `FKq788v9q4kff4wtrywj01iupik` (`role_id`),
  CONSTRAINT `FK9y6k2a1kxtnqq4bdn531bin8k` FOREIGN KEY (`servant_id`) REFERENCES `servant` (`id`),
  CONSTRAINT `FKq788v9q4kff4wtrywj01iupik` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- neighborcats.cat definition

CREATE TABLE `cat` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `birthday` date DEFAULT NULL,
  `features` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `kind_id` bigint(20) DEFAULT NULL,
  `servant_id` bigint(20) DEFAULT NULL,
  `neutralized` int(11) DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `profile_img_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9j3cdikk37rhf56uhd7olxax4` (`profile_img_id`),
  KEY `FKsum9phnrh1dhbo4a45awujueb` (`servant_id`),
  KEY `FK757jv4qsaiwf94033fbg8ckao` (`kind_id`),
  CONSTRAINT `FK757jv4qsaiwf94033fbg8ckao` FOREIGN KEY (`kind_id`) REFERENCES `cat_kind` (`id`),
  CONSTRAINT `FK9j3cdikk37rhf56uhd7olxax4` FOREIGN KEY (`profile_img_id`) REFERENCES `img_file` (`id`),
  CONSTRAINT `FKsum9phnrh1dhbo4a45awujueb` FOREIGN KEY (`servant_id`) REFERENCES `servant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;


-- neighborcats.cat_profile_img definition

CREATE TABLE `cat_profile_img` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cat_id` bigint(20) DEFAULT NULL,
  `img_file_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo1yrlidfyeip745w492h0x5y0` (`cat_id`),
  KEY `FK54vksk7drbpxj85cmmq9w8e4k` (`img_file_id`),
  CONSTRAINT `FK54vksk7drbpxj85cmmq9w8e4k` FOREIGN KEY (`img_file_id`) REFERENCES `img_file` (`id`),
  CONSTRAINT `FKo1yrlidfyeip745w492h0x5y0` FOREIGN KEY (`cat_id`) REFERENCES `cat` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- neighborcats.feed definition

CREATE TABLE `feed` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `content` varchar(255) DEFAULT NULL COMMENT '글 본문',
  `created_at` datetime(6) DEFAULT NULL COMMENT '작성일',
  `updated_at` datetime(6) DEFAULT NULL COMMENT '최근수정일',
  `author_id` bigint(20) DEFAULT NULL COMMENT '작성자 식별자',
  `cat_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb5ujrily4d09yj4hipox70st4` (`author_id`),
  KEY `FKhtr7l2kjkmwc6uq3e39ae6fcy` (`cat_id`),
  CONSTRAINT `FKb5ujrily4d09yj4hipox70st4` FOREIGN KEY (`author_id`) REFERENCES `servant` (`id`),
  CONSTRAINT `FKhtr7l2kjkmwc6uq3e39ae6fcy` FOREIGN KEY (`cat_id`) REFERENCES `cat` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='피드 글';


-- neighborcats.feed_activity definition

CREATE TABLE `feed_activity` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `feed_id` bigint(20) DEFAULT NULL,
  `me_id` bigint(20) DEFAULT NULL,
  `other_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjdk5op4087l3bp8usw3tev2fr` (`feed_id`),
  KEY `FK3axger2kegae2h4ftahl14ojq` (`me_id`),
  KEY `FKl90a8pfmytqymvfkxsgt3vj4q` (`other_id`),
  CONSTRAINT `FK3axger2kegae2h4ftahl14ojq` FOREIGN KEY (`me_id`) REFERENCES `servant` (`id`),
  CONSTRAINT `FKjdk5op4087l3bp8usw3tev2fr` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`id`),
  CONSTRAINT `FKl90a8pfmytqymvfkxsgt3vj4q` FOREIGN KEY (`other_id`) REFERENCES `servant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- neighborcats.feed_comment definition

CREATE TABLE `feed_comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `created_date_time` datetime(6) DEFAULT NULL,
  `updated_date_time` datetime(6) DEFAULT NULL,
  `author_id` bigint(20) DEFAULT NULL,
  `feed_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcev7j46ksdv9ecdr7jlplaqsk` (`author_id`),
  KEY `FKg554m92domilyknftfwsxeq17` (`feed_id`),
  CONSTRAINT `FKcev7j46ksdv9ecdr7jlplaqsk` FOREIGN KEY (`author_id`) REFERENCES `servant` (`id`),
  CONSTRAINT `FKg554m92domilyknftfwsxeq17` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- neighborcats.feed_comment_like definition

CREATE TABLE `feed_comment_like` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date_time` datetime(6) DEFAULT NULL,
  `updated_date_time` datetime(6) DEFAULT NULL,
  `feed_comment_id` bigint(20) DEFAULT NULL,
  `servant_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp0d1pmt34asxsac52g0a7xfkv` (`feed_comment_id`),
  KEY `FKcc5nc9cb6mhqq58291odt99dt` (`servant_id`),
  CONSTRAINT `FKcc5nc9cb6mhqq58291odt99dt` FOREIGN KEY (`servant_id`) REFERENCES `servant` (`id`),
  CONSTRAINT `FKp0d1pmt34asxsac52g0a7xfkv` FOREIGN KEY (`feed_comment_id`) REFERENCES `feed_comment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- neighborcats.feed_img definition

CREATE TABLE `feed_img` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `feed_id` bigint(20) DEFAULT NULL,
  `img_file_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1yiv7c4w1dhwaxkmi5rkvyg7l` (`feed_id`),
  KEY `FKl8kvnj38racral2nordedpkpg` (`img_file_id`),
  CONSTRAINT `FK1yiv7c4w1dhwaxkmi5rkvyg7l` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`id`),
  CONSTRAINT `FKl8kvnj38racral2nordedpkpg` FOREIGN KEY (`img_file_id`) REFERENCES `img_file` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;


-- neighborcats.feed_keep definition

CREATE TABLE `feed_keep` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '식별자',
  `created_at` datetime(6) DEFAULT NULL COMMENT '보관 생성일',
  `feed_id` bigint(20) DEFAULT NULL COMMENT '보관할 피드 식별자',
  `servant_id` bigint(20) DEFAULT NULL COMMENT '보관하는 집사 식별자',
  PRIMARY KEY (`id`),
  KEY `FKlgexuhuqwywaflvw4hpw4q8jc` (`feed_id`),
  KEY `FKdgk7c3jbv3qkdtg7e8ulg9k6i` (`servant_id`),
  CONSTRAINT `FKdgk7c3jbv3qkdtg7e8ulg9k6i` FOREIGN KEY (`servant_id`) REFERENCES `servant` (`id`),
  CONSTRAINT `FKlgexuhuqwywaflvw4hpw4q8jc` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='피드 보관 정보';


-- neighborcats.feed_like definition

CREATE TABLE `feed_like` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `feed_id` bigint(20) DEFAULT NULL,
  `servant_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgurobtyio3jh1vn4n8tmqt842` (`feed_id`),
  KEY `FKa3g6s1b6dhks3tgro0tecfulj` (`servant_id`),
  CONSTRAINT `FKa3g6s1b6dhks3tgro0tecfulj` FOREIGN KEY (`servant_id`) REFERENCES `servant` (`id`),
  CONSTRAINT `FKgurobtyio3jh1vn4n8tmqt842` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- neighborcats.feed_reply definition

CREATE TABLE `feed_reply` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `created_date_time` datetime(6) DEFAULT NULL,
  `updated_date_time` datetime(6) DEFAULT NULL,
  `author_id` bigint(20) DEFAULT NULL,
  `feed_comment_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkg72334drd06ycl6nwdietu1h` (`author_id`),
  KEY `FKlfsi38x1nb123utsnngfgnuiq` (`feed_comment_id`),
  CONSTRAINT `FKkg72334drd06ycl6nwdietu1h` FOREIGN KEY (`author_id`) REFERENCES `servant` (`id`),
  CONSTRAINT `FKlfsi38x1nb123utsnngfgnuiq` FOREIGN KEY (`feed_comment_id`) REFERENCES `feed_comment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- neighborcats.feed_tag definition

CREATE TABLE `feed_tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `feed_id` bigint(20) DEFAULT NULL,
  `tag_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK62bjxf2ug56taebkuhhyqch85` (`feed_id`),
  KEY `FKsvdflgl0mnqvpirg0yc8dmcn6` (`tag_id`),
  CONSTRAINT `FK62bjxf2ug56taebkuhhyqch85` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`id`),
  CONSTRAINT `FKsvdflgl0mnqvpirg0yc8dmcn6` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


-- neighborcats.friend definition

CREATE TABLE `friend` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `me_id` bigint(20) DEFAULT NULL,
  `other_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKljhj04nrcg4ncoot0bcf402uw` (`me_id`),
  KEY `FKijlo0y43hxqmweu904euj5h1r` (`other_id`),
  CONSTRAINT `FKijlo0y43hxqmweu904euj5h1r` FOREIGN KEY (`other_id`) REFERENCES `servant` (`id`),
  CONSTRAINT `FKljhj04nrcg4ncoot0bcf402uw` FOREIGN KEY (`me_id`) REFERENCES `servant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- neighborcats.friend_request definition

CREATE TABLE `friend_request` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `me_id` bigint(20) DEFAULT NULL,
  `other_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK16dck8t83tgvowjrggb2jt7ml` (`me_id`),
  KEY `FKbxvtbutgnvqp5sbctiy5jrxwy` (`other_id`),
  CONSTRAINT `FK16dck8t83tgvowjrggb2jt7ml` FOREIGN KEY (`me_id`) REFERENCES `servant` (`id`),
  CONSTRAINT `FKbxvtbutgnvqp5sbctiy5jrxwy` FOREIGN KEY (`other_id`) REFERENCES `servant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- neighborcats.question_comment definition

CREATE TABLE `question_comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `created_date_time` datetime(6) DEFAULT NULL,
  `updated_date_time` datetime(6) DEFAULT NULL,
  `author_id` bigint(20) DEFAULT NULL,
  `question_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt1pcgx6r1r3i2l9sh23vqueer` (`author_id`),
  KEY `FKgatho66t7ix04m6dothg6jaqh` (`question_id`),
  CONSTRAINT `FKgatho66t7ix04m6dothg6jaqh` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`),
  CONSTRAINT `FKt1pcgx6r1r3i2l9sh23vqueer` FOREIGN KEY (`author_id`) REFERENCES `servant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;