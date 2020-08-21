CREATE DATABASE Receiply;
CREATE TABLE Receiply.Accounts
(
    USER_ID varchar(36),
    EMAIL varchar(200),
    USERNAME varchar(200),
    PASS varchar(200),
    FIRST_NAME varchar(200),
    LAST_NAME varchar(200),
    FAMILY varchar(36),
    FAMILY_AUTH varchar(100)
);

CREATE TABLE Receiply.Recipes
(
    RECIPE_ID varchar(36),
    RECIPE_IDENTIFIER varchar(36),
    CREATOR_ID varchar(36),
    FAMILY_ID varchar(36),
    DATE_CREATED date,
    TTM varchar(36),
    RECIPE_NAME varchar(200),
    DESCRIPTION varchar(2000),
    INGREDIENTS json,
    PREP_INSTRUCTIONS json,
    COOKING_INSTRUCTIONS json,
    TAGS json,
    PUBLISH_STATE varchar(50),
    PHOTO_NAME varchar(200),
    LIKES int
);

CREATE TABLE Receiply.Families
(
    FAMILY_ID varchar(36),
    FAMILY_IDENTIFIER varchar(5),
    FAMILY_NAME varchar(100),
    FAMILY_CREATED varchar(100),
    FAMILY_CREATOR varchar(200)
);

CREATE TABLE Receiply.Comments
(
    COMMENT_ID varchar(36),
    COMMENTER_ID varchar(36),
    RECIPE varchar(36),
    COMMENT_CONTENT text,
    LIKES int
);

CREATE TABLE Receiply.Likes
(
    LIKE_ID varchar(36),
    USER_ID varchar(36),
    LIKE_TYPE varchar(100),
    ITEM varchar(36)
)

CREATE TABLE Receiply.Comments
(
    COMMENT_ID varchar(36),
    RECIPE_ID varchar(36),
    COMMENTER varchar(36),
    COMMENT_CONTENT varchar(2000),
    COMMENT_DATE date,
    LIKES int
)