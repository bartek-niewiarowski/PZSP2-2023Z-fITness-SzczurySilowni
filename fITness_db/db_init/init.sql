-- MySQL Script generated by MySQL Workbench
-- Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pzsp2-db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pzsp2-db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pzsp2-db` DEFAULT CHARACTER SET utf8 ;
USE `pzsp2-db` ;

-- -----------------------------------------------------
-- Table `pzsp2-db`.`Subscription_plans`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pzsp2-db`.`Subscription_plans` (
  `subscription_plan_id` INT NOT NULL,
  `name` VARCHAR(20) NOT NULL,
  `cost` INT NOT NULL,
  PRIMARY KEY (`subscription_plan_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pzsp2-db`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pzsp2-db`.`Users` (
  `user_id` INT NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `access_rights` VARCHAR(3) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `second_name` VARCHAR(45) NULL,
  `surname` VARCHAR(45) NOT NULL,
  `gender` VARCHAR(1) NULL,
  `subscription_plan_id` INT NULL,
  `subscription_expiration` DATE NULL,
  PRIMARY KEY (`user_id`),
  INDEX `sub_plan_idx` (`subscription_plan_id` ASC) VISIBLE,
  CONSTRAINT `sub_plan`
    FOREIGN KEY (`subscription_plan_id`)
    REFERENCES `pzsp2-db`.`Subscription_plans` (`subscription_plan_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pzsp2-db`.`Gyms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pzsp2-db`.`Gyms` (
  `gym_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NULL,
  `description` TINYTEXT NULL,
  `mens_lockers` INT NULL,
  `womans_lockers` INT NULL,
  `manager` INT NULL,
  PRIMARY KEY (`gym_id`),
  INDEX `manager_idx` (`manager` ASC) VISIBLE,
  CONSTRAINT `manager`
    FOREIGN KEY (`manager`)
    REFERENCES `pzsp2-db`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pzsp2-db`.`Equipments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pzsp2-db`.`Equipments` (
  `equipment_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `max_weight` INT NOT NULL,
  `min_weight` INT NOT NULL,
  `gym` INT NULL,
  PRIMARY KEY (`equipment_id`),
  INDEX `gym_id_idx` (`gym` ASC) VISIBLE,
  CONSTRAINT `gym_id`
    FOREIGN KEY (`gym`)
    REFERENCES `pzsp2-db`.`Gyms` (`gym_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pzsp2-db`.`Trainings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pzsp2-db`.`Trainings` (
  `trainings_id` INT NOT NULL,
  `start` DATETIME NOT NULL,
  `end` DATETIME NULL,
  `locker_num` INT NULL,
  `client` INT NOT NULL,
  PRIMARY KEY (`trainings_id`),
  INDEX `client_idx` (`client` ASC) VISIBLE,
  CONSTRAINT `client`
    FOREIGN KEY (`client`)
    REFERENCES `pzsp2-db`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pzsp2-db`.`Appointments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pzsp2-db`.`Appointments` (
  `appointment_id` INT NOT NULL,
  `planned_start` DATETIME NOT NULL,
  `planned_end` DATETIME NOT NULL,
  `comment` VARCHAR(500) NULL,
  `trainer` INT NOT NULL,
  `client` INT NOT NULL,
  `gym` INT NOT NULL,
  `training` INT NULL,
  PRIMARY KEY (`appointment_id`),
  INDEX `traning_idx` (`training` ASC) VISIBLE,
  INDEX `trainer_appoint_idx` (`trainer` ASC) VISIBLE,
  INDEX `client_appoint_idx` (`client` ASC) VISIBLE,
  INDEX `gym_appoint_idx` (`gym` ASC) VISIBLE,
  CONSTRAINT `traning_appoint`
    FOREIGN KEY (`training`)
    REFERENCES `pzsp2-db`.`Trainings` (`trainings_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `trainer_appoint`
    FOREIGN KEY (`trainer`)
    REFERENCES `pzsp2-db`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `client_appoint`
    FOREIGN KEY (`client`)
    REFERENCES `pzsp2-db`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `gym_appoint`
    FOREIGN KEY (`gym`)
    REFERENCES `pzsp2-db`.`Gyms` (`gym_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pzsp2-db`.`Exercises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pzsp2-db`.`Exercises` (
  `exercise_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `training` INT NULL,
  `equipment` INT NULL,
  PRIMARY KEY (`exercise_id`),
  INDEX `training_idx` (`training` ASC) VISIBLE,
  INDEX `equipment_idx` (`equipment` ASC) VISIBLE,
  CONSTRAINT `training`
    FOREIGN KEY (`training`)
    REFERENCES `pzsp2-db`.`Trainings` (`trainings_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `equipment`
    FOREIGN KEY (`equipment`)
    REFERENCES `pzsp2-db`.`Equipments` (`equipment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pzsp2-db`.`Reps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pzsp2-db`.`Reps` (
  `rep_id` INT NOT NULL,
  `weight` INT NULL,
  `excecise` INT NULL,
  PRIMARY KEY (`rep_id`),
  INDEX `excercise_idx` (`excecise` ASC) VISIBLE,
  CONSTRAINT `excercise`
    FOREIGN KEY (`excecise`)
    REFERENCES `pzsp2-db`.`Exercises` (`exercise_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pzsp2-db`.`Payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pzsp2-db`.`Payments` (
  `idPayments` INT NOT NULL,
  `time` DATETIME NOT NULL,
  `amount` INT NOT NULL,
  `user` INT NOT NULL,
  PRIMARY KEY (`idPayments`),
  INDEX `fk_Payments_Users1_idx` (`user` ASC) VISIBLE,
  CONSTRAINT `fk_Payments_Users1`
    FOREIGN KEY (`user`)
    REFERENCES `pzsp2-db`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pzsp2-db`.`Gyms_Trainers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pzsp2-db`.`Gyms_Trainers` (
  `gym_id` INT NOT NULL,
  `trainer_id` INT NOT NULL,
  PRIMARY KEY (`gym_id`, `trainer_id`),
  INDEX `fk_Gyms_has_Users_Users1_idx` (`trainer_id` ASC) VISIBLE,
  INDEX `fk_Gyms_has_Users_Gyms1_idx` (`gym_id` ASC) VISIBLE,
  CONSTRAINT `fk_Gyms_has_Users_Gyms1`
    FOREIGN KEY (`gym_id`)
    REFERENCES `pzsp2-db`.`Gyms` (`gym_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Gyms_has_Users_Users1`
    FOREIGN KEY (`trainer_id`)
    REFERENCES `pzsp2-db`.`Users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
