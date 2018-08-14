DROP DATABASE IF EXISTS`ep4h04n005ka2xu7`;
CREATE DATABASE`ep4h04n005ka2xu7`;
USE`ep4h04n005ka2xu7`;

CREATE TABLE IF NOT EXISTS `ep4h04n005ka2xu7`.`user_account` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NULL DEFAULT NULL,
  `lastname` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  `about` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `last_login` DATETIME NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `ep4h04n005ka2xu7`.`sale_event` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `useraccount_id` INT(11) NOT NULL,
  `address` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `zip` VARCHAR(45) NOT NULL,
  `date` DATETIME NOT NULL,
  `start_time` DATETIME NULL,
  `end_time` DATETIME NULL,
  `comments` VARCHAR(255) NULL,
  `photo_url` VARCHAR(255) NULL,
  PRIMARY KEY (`id`, `useraccount_id`, `zip`, `date`),
  INDEX `useraccount_id` (`useraccount_id` ASC),
  CONSTRAINT `sale_event_ibfk_1`
    FOREIGN KEY (`useraccount_id`)
    REFERENCES `ep4h04n005ka2xu7`.`user_account` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `ep4h04n005ka2xu7`.`item` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `sale_event_id` INT(11) NOT NULL,
  `rank` INT(11) NULL DEFAULT NULL,
  `category_name` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `sale_event_id`),
  INDEX `sale_event_id` (`sale_event_id` ASC),
  CONSTRAINT `fk_item_sale_event1`
    FOREIGN KEY (`sale_event_id`)
    REFERENCES `ep4h04n005ka2xu7`.`sale_event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `ep4h04n005ka2xu7`.`photo` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_id` INT(11) NOT NULL,
  `url` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `item_id`),
  INDEX `item_id` (`item_id` ASC),
  CONSTRAINT `photo_ibfk_1`
    FOREIGN KEY (`item_id`)
    REFERENCES `ep4h04n005ka2xu7`.`item` (`id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
