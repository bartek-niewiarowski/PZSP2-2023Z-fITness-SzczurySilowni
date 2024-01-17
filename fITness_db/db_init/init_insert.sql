-- Sub_plans
INSERT INTO `pzsp2-db`.`Subscription_plans` (
    `subscription_plan_id`,
    `name`,
    `cost`
) VALUES (1, 'Basic', 100),
    (2, 'Gold', 160),
    (3, 'Platinum', 180),
    (4, 'Premium', 300);


-- Users
INSERT INTO `pzsp2-db`.`Users` (
    `user_id`,
    `user_name`,
    `email`,
    `password`,
    `access_rights`,
    `name`,
    `second_name`,
    `surname`,
    `gender`,
    `subscription_plan_id`,
    `subscription_expiration`
) VALUES (1, 'example_user', 'example@email.com', 'hashed_password', 'usr', 'John', 'Middle', 'Doe', 'M', 3, '2024-12-31'),
    (2, 'lorem', 'impsum@email.com', 'hashed_password', 'usr', 'Lorem', 'Impsum', 'Mone', 'K', 1, '2024-09-27'),
    (3, 'Kaykay', 'rap_forever@email.com', 'hashed_password', 'usr', 'Kanye', NULL, 'East', 'M', 4, '2025-01-02');

INSERT INTO `pzsp2-db`.`Users` (
    `user_id`,
    `user_name`,
    `email`,
    `password`,
    `access_rights`,
    `name`,
    `second_name`,
    `surname`,
    `gender`
) VALUES (4, 'Byczek', 'byku@email.com', 'hashed_password', 'trn', 'Stefan', NULL, 'Byczek', 'M'),
    (5, 'Efcia', 'efciunia@email.com', 'hashed_password', 'trn', 'Ewelina', 'Joanna', 'Kwas', 'K'),
    (6, 'PortierMan', 'egirl.uwu@email.com', 'hashed_password', 'prt', 'Bogdan', NULL, 'Kowalski', 'M'),
    (7, 'Szefuncio', 'szefroku@email.com', 'hashed_password', 'mng', 'Aga', 'Maria', 'Zarzadza', 'K');


-- Gyms
INSERT INTO `pzsp2-db`.`Gyms` (
    `gym_id`,
    `name`,
    `address`,
    `description`,
    `mens_lockers`,
    `womans_lockers`,
    `manager`
) VALUES ( 1, 'Fitness Center', '123 Main Street', 'A modern fitness center with state-of-the-art equipment.', 50, 50, 7 ),
    ( 2, 'MacFitness', '17 Burgerowa', 'A modern fitness center with McDonalds indoors.', 50, 50, 7 ),
    ( 3, 'Benchpressers', '234 Strongman Stree', 'An ideal place to benchpress 2 tons.', 50, 50, 7 );


-- Equpiment
INSERT INTO `pzsp2-db`.`Equipments` (
    `equipment_id`,
    `name`,
    `max_weight`,
    `min_weight`,
    `gym`
) VALUES ( 1, 'Treadmill', 200, 200, 1),
    ( 2, 'Treadmill', 200, 200, 1),
    ( 3, 'Treadmill', 200, 200, 1),
    ( 4, 'Dumbbell', 5, 5, 1),
    ( 5, 'Dumbbell', 6, 6, 1),
    ( 6, 'Dumbbell', 8, 8, 1),
    ( 7, 'Dumbbell', 10, 10, 1),
    ( 8, 'Dumbbell', 15, 15, 1),
    ( 9, 'Cabel Machine', 120, 5, 1),
    ( 10, 'Cabel Machine', 100, 5, 1),
    ( 11, 'Rowing Machine', 60, 10, 1),
    ( 12, 'Rowing Machine', 60, 10, 1),

    ( 13, 'Treadmill', 200, 200, 2),
    ( 14, 'Treadmill', 200, 200, 2),
    ( 15, 'Dumbbell', 5, 5, 2),
    ( 16, 'Dumbbell', 6, 6, 2),
    ( 17, 'Dumbbell', 8, 8, 2),
    ( 18, 'Dumbbell', 10, 10, 2),
    ( 19, 'Dumbbell', 15, 15, 2),
    ( 20, 'Cabel Machine', 100, 5, 2),
    ( 21, 'Cabel Machine', 80, 5, 2),
    ( 22, 'Rowing Machine', 60, 10, 2),
    ( 23, 'Squat Rack', 250, 20, 2),

    ( 24, 'Treadmill', 200, 200, 3),
    ( 25, 'Treadmill', 200, 200, 3),
    ( 26, 'Dumbbell', 2, 2, 3),
    ( 27, 'Dumbbell', 4, 4, 3),
    ( 28, 'Dumbbell', 8, 8, 3),
    ( 29, 'Dumbbell', 10, 10, 3),
    ( 30, 'Cabel Machine', 60, 3, 3),
    ( 31, 'Cabel Machine', 100, 5, 3),
    ( 32, 'Squat Rack', 180, 10, 3);



-- Trainings
INSERT INTO `pzsp2-db`.`Trainings` (
    `trainings_id`,
    `gym`,
    `start`,
    `end`,
    `locker_num`,
    `client`
) VALUES (1, 3, '2024-01-17 10:00:00', '2024-01-17 11:30:00', 101, 3),
    (2, 1, '2024-01-18 15:30:00', '2024-01-18 17:00:00', 2, 5),
    (3, 1, '2024-01-20 09:00:00', '2024-01-20 10:30:00', 3, 6),
    (4, 1, '2024-01-22 14:00:00', '2024-01-22 15:30:00', 23, 2),
    (5, 2, '2024-01-25 11:30:00', '2024-01-25 13:00:00', 21, 1),
    (6, 2, '2024-01-28 16:00:00', '2024-01-28 17:30:00', 50, 2),
    (7, 1, '2024-02-02 10:30:00', '2024-02-02 12:00:00', 33, 3),
    (8, 1, '2024-02-05 14:30:00', '2024-02-05 16:00:00', 11, 3),
    (9, 1, '2024-02-08 09:00:00', '2024-02-08 10:30:00', 40, 1),
    (10, 2, '2024-02-11 15:30:00', '2024-02-11 17:00:00', 17, 5),
    (11, 2, '2024-02-14 11:00:00', '2024-02-14 12:30:00', 2, 4),
    (12, 2, '2024-02-17 13:30:00', '2024-02-17 15:00:00', 1, 4),
    (13, 3, '2024-02-20 10:00:00', '2024-02-20 11:30:00', 15, 3),
    (14, 3, '2024-02-23 16:30:00', '2024-02-23 18:00:00', 7, 2),
    (15, 3, '2024-02-26 14:00:00', '2024-02-26 15:30:00', 32, 2),
    (16, 3, '2024-03-01 09:30:00', '2024-03-01 11:00:00', 36, 1),
    (17, 2, '2024-03-04 12:00:00', '2024-03-04 13:30:00', 46, 2),
    (18, 1, '2024-03-07 15:00:00', '2024-03-07 16:30:00', 17, 3),
    (19, 1, '2024-03-10 11:30:00', '2024-03-10 13:00:00', 17, 5),
    (20, 2, '2024-03-13 14:30:00', '2024-03-13 16:00:00', 17, 7);


-- Appointment
INSERT INTO `pzsp2-db`.`Appointments` (
    `appointment_id`,
    `planned_start`,
    `planned_end`,
    `comment`,
    `trainer`,
    `client`,
    `gym`,
    `training`
) VALUES ( 1, '2024-01-17 14:00:00', '2024-01-17 15:00:00', 'Discussion on workout plan', 4, 1, 1, 1 ),
    (2, '2024-01-18 16:30:00', '2024-01-18 18:00:00', 'Workout Session', 4, 1, 2, 2),
    (3, '2024-01-20 10:00:00', '2024-01-20 11:30:00', 'Fitness Assessment', 5, 2, 3, 3),
    (4, '2024-01-22 14:30:00', '2024-01-22 16:00:00', 'Training Plan Review', 4, 1, 1, 4),
    (5, '2024-01-25 11:00:00', '2024-01-25 12:30:00', 'Nutrition Consultation', 5, 3, 2, 5),
    (6, '2024-01-17 14:00:00', '2024-01-17 15:00:00', NULL, 4, 2, 1, 1);


-- Exercises
INSERT INTO `pzsp2-db`.`Exercises` (
    `exercise_id`,
    `name`,
    `training`,
    `equipment`
) VALUES (1, 'Cardio Warm-up', 1, NULL),
    (2, 'Weighted Squats', 1, 8),
    (3, 'Running Intervals', 1, 1),
    (4, 'Bicep Curls', 2, 4),
    (5, 'Plank', 2, 5),
    (6, 'Yoga Stretching', 2, 6),
    (7, 'High-Intensity Interval Training', 3, 7),
    (8, 'Deadlifts', 3, 8),
    (9, 'Jump Rope Cardio', 3, NULL),
    (10, 'Chest Press', 4, 10),
    (11, 'Cycling Session', 4, 11),
    (12, 'Leg Press', 4, 12),
    (13, 'Drills', 4, 13),
    (14, 'TRX Suspension Training', 5, 14),
    (15, 'Kettlebell Swings', 5, 15),
    (16, 'Pilates Core Exercises', 6, 16),
    (17, 'Elliptical Workout', 6, 17),
    (18, 'Battle Ropes', 7, NULL),
    (19, 'Box Jumps', 8, NULL),
    (20, 'Zumba Dance', 9, NULL),
    (21, 'Dumbbell Rows', 10, NULL),
    (22, 'Stair Climbing', 11, NULL),
    (23, 'Medicine Ball Slams', 12, NULL),
    (24, 'Rowing Machine', 13, NULL),
    (25, 'Burpees', 14, NULL),
    (26, 'Sprint Intervals', 15, NULL),
    (27, 'Push-ups', 16, NULL),
    (28, 'Jumping Lunges', 17, 12),
    (29, 'Bicycle Crunches', 18, NULL),
    (30, 'Balance Exercises', 19, NULL);


-- Reps
INSERT INTO `pzsp2-db`.`Reps` (
    `rep_id`,
    `weight`,
    `excecise`
) VALUES (1, 50, 1),
    (2, NULL, 2),
    (3, 40, 3),
    (4, NULL, 4),
    (5, 30, 5),
    (6, NULL, 6),
    (7, 20, 7),
    (8, NULL, 8),
    (9, 25, 9),
    (10, NULL, 10),
    (11, 35, 11),
    (12, NULL, 12),
    (13, 45, 13),
    (14, NULL, 14),
    (15, 55, 15),
    (16, NULL, 16),
    (17, 60, 17),
    (18, NULL, 18),
    (19, 70, 19),
    (20, NULL, 20),
    (21, 80, 21),
    (22, NULL, 22),
    (23, 90, 23),
    (24, NULL, 24),
    (25, 100, 25),
    (26, NULL, 26),
    (27, 110, 27),
    (28, NULL, 28),
    (29, 120, 29),
    (30, NULL, 30),
    (31, 130, 1),
    (32, NULL, 2),
    (33, 140, 3),
    (34, NULL, 4),
    (35, 150, 5),
    (36, NULL, 6),
    (37, 160, 7),
    (38, NULL, 8),
    (39, 170, 9),
    (40, NULL, 10),
    (41, 180, 11),
    (42, NULL, 12),
    (43, 190, 13),
    (44, NULL, 14),
    (45, 200, 15),
    (46, NULL, 16),
    (47, 210, 17),
    (48, NULL, 18),
    (49, 220, 19),
    (50, NULL, 20),
    (51, 230, 21),
    (52, NULL, 22),
    (53, 240, 23),
    (54, NULL, 24),
    (55, 250, 25),
    (56, NULL, 26),
    (57, 260, 27),
    (58, NULL, 28),
    (59, 270, 29),
    (60, NULL, 30);


-- Payments
INSERT INTO `pzsp2-db`.`Payments` (
    `idPayments`,
    `time`,
    `amount`,
    `user`
) VALUES (1, '2024-01-17 16:30:00', 100, 1),
    (2, '2024-01-18 14:15:00', 180, 2),
    (3, '2024-01-19 11:45:00', 300, 3),
    (4, '2024-02-17 09:30:00', 100, 1),
    (5, '2024-01-21 13:00:00', 180, 2),
    (6, '2024-02-22 17:45:00', 300, 3),
    (7, '2024-03-23 15:30:00', 300, 3),
    (8, '2024-02-24 12:15:00', 180, 2),
    (9, '2024-04-25 10:00:00', 100, 3),
    (10, '2024-03-26 14:45:00', 160, 1),
    (11, '2024-04-27 11:15:00', 160, 1),
    (12, '2024-05-28 08:45:00', 300, 3);


-- Gyms_Trainers
INSERT INTO `pzsp2-db`.`Gyms_Trainers` (
    `gym_id`,
    `trainer_id`
) VALUES ( 1, 4 ),
    ( 2, 4 ),
    ( 1, 5 ),
    ( 3, 5 );