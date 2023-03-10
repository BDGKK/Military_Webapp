const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = require('../config');
const mysql = require('mysql');

const createTableIfNotExistQuery = 'CREATE TABLE IF NOT EXISTS';
const userRankTableQuery = `
    ${createTableIfNotExistQuery} USER_RANK(
        rankID INT,
        rankName VARCHAR(20),
        CONSTRAINT pk_RANK PRIMARY KEY(rankID));
`;
const forcesTableQuery = `
    ${createTableIfNotExistQuery} FORCES(
        forceID INT,
        forceName VARCHAR(20),
        CONSTRAINT pk_FORCES PRIMARY KEY(forceID));
`;
const adminTableQuery = `
    ${createTableIfNotExistQuery} ADMIN(
        email VARCHAR(30),
        password VARCHAR(20),
        CONSTRAINT pk_ADMIN PRIMARY KEY(email));
`;
const regimentTableQuery = `
    ${createTableIfNotExistQuery} REGIMENT (
        regimentID INT,
        regimentName VARCHAR(20),
        forceID INT,
        CONSTRAINT pk_REGIMENT PRIMARY KEY(regimentID),
        CONSTRAINT fk_FORCE FOREIGN KEY(forceID) REFERENCES FORCES(forceID));
`;
const userTableQuery = `
    ${createTableIfNotExistQuery} USER_TABLE(
        userID INT,
        firstName VARCHAR(20),
        lastName VARCHAR(30),
        gender VARCHAR(10),
        permanentAddress VARCHAR(50),
        permanentPostCode INT,
        temporaryAddress VARCHAR(50),
        temporaryPostCode INT,
        dateOfBirth DATE,
        mobileNumber VARCHAR(10),
        landNumber VARCHAR(10),
        NIC VARCHAR(15),
        emailAddr VARCHAR(30),
        soldierNumber VARCHAR(20),
        salary FLOAT,
        recruitedDate DATE,
        yearsOfService INT,
        retirement_date DATE,
        rankID INT,
        regimentID INT,
        CONSTRAINT pk_USER PRIMARY KEY(userID),
        CONSTRAINT fk_UserRank FOREIGN KEY(rankID) REFERENCES user_rank(rankID),
        CONSTRAINT fk_Reg FOREIGN KEY(regimentID ) REFERENCES REGIMENT(regimentID))
`;
const pensionTableQuery = `
    ${createTableIfNotExistQuery} PENSION(
        pensionID INT,
        totalAmount FLOAT,
        renewDate DATE,
        userID INT,
        CONSTRAINT pk_PENSION PRIMARY KEY(pensionID),
        CONSTRAINT fk_USER FOREIGN KEY(userID) REFERENCES USER_TABLE(userID));
`;
const feedbackTableQuery = `
    ${createTableIfNotExistQuery} FEEDBACK(
        feedbackID INT,
        name VARCHAR(20),
        email VARCHAR(30),
        subject VARCHAR(50),
        userID INT,
        adminEmail VARCHAR(30),
        CONSTRAINT pk_FEEDBACK PRIMARY KEY(feedbackID),
        CONSTRAINT fk_U FOREIGN KEY(userID) REFERENCES USER_TABLE(userID),
        CONSTRAINT fk_ADMIN FOREIGN KEY(adminEmail) REFERENCES ADMIN(email));
`;
const loanTableQuery = `
        ${createTableIfNotExistQuery} LOAN(
        loanID INT,
        amount FLOAT,
        interestRate FLOAT,
        timePeriod INT, 
        partonName VARCHAR(20),
        userID INT, 
        CONSTRAINT pk_LOAN PRIMARY KEY(loanID),
        CONSTRAINT fk_UT FOREIGN KEY(userID) REFERENCES USER_TABLE(userID));
`;

const dbTables = [userRankTableQuery, forcesTableQuery,
    adminTableQuery, regimentTableQuery, userTableQuery,
    pensionTableQuery, feedbackTableQuery, loanTableQuery];

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT
});

connection.connect((err) => {
    if (err) {
        const mysqlNotConnectedRegexp = /(connect)*(econnrefused)\b/i;

        if (mysqlNotConnectedRegexp.test(err.message)) {
            console.log("MySQL not Connected!");
            return;
        } else {
            throw err;
        }
    };
    console.log("MySQL connected...");

    connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err) => {
        if (err) throw err;
    });
    
    connection.changeUser({database: DB_NAME}, (err) => {
        if (err) throw err;
    }); // Select database name for connection
    
    // Create All Database tables
    dbTables.map((table) => {
        connection.query(table, (err) => {
            if (err) throw err;
        });
    });
});

module.exports = connection;