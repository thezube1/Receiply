CREATE DATABASE Receiply;
CREATE TABLE Receiply.Accounts (
	USER_ID varchar(36),
    EMAIL varchar(200),
    USERNAME varchar(200),
    PASS varchar(200),
    FIRST_NAME varchar(200),
    LAST_NAME varchar(200)
    FAMILY varchar(36)
);

CREATE TABLE Receiply.Recipes ( 
    RECIPE_ID varchar(36), 
    CREATOR_ID varchar(36), 
    FAMILY_ID varchar(36), 
    RECIPE_NAME varchar(200), 
    RECIPE_DESC mediumtext, 
    RECIPE_STEPS varchar(36), 
    ECIPE_DATE_CREATED varchar(100), 
    RECIPE_INVENTOR varchar(200)
);

CREATE TABLE Receiply.Families (
    FAMILY_ID varchar(36), 
    FAMILY_NAME varchar(100), 
    FAMILY_DESCRIPTION longtext, 
    FAMILY_CREATED varchar(100)
);

CREATE TABLE Receiply.Invites (
    INVITE_ID varchar(36), 
    INVITE_TO varchar(36),
    TIME_CREATED varchar(100),
    WHICH_TABLE varchar(100)
);