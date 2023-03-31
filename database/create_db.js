const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = require('../config');
const columnData = require('../columnData');
const encryptPassword = require('../server-side/side-functions/encryptPassword');
const mysql = require('mysql');

const createTableIfNotExistQuery = 'CREATE TABLE IF NOT EXISTS';
const forcesTableQuery = `
    ${createTableIfNotExistQuery} FORCES(
        forceID VARCHAR(10),
        forceName VARCHAR(20),
        CONSTRAINT pk_FORCES PRIMARY KEY(forceID));
`;
const userRankTableQuery = `
    ${createTableIfNotExistQuery} USER_RANK(
        rankID VARCHAR(10),
        rankName VARCHAR(30),
        forceID VARCHAR(10),
        CONSTRAINT pk_RANK PRIMARY KEY(rankID),
        CONSTRAINT fk_FR FOREIGN KEY(forceID) REFERENCES FORCES(forceID));
`;
const adminTableQuery = `
    ${createTableIfNotExistQuery} ADMIN(
        email VARCHAR(35),
        password VARCHAR(60),
        CONSTRAINT pk_ADMIN PRIMARY KEY(email));
`;
const regimentTableQuery = `
    ${createTableIfNotExistQuery} REGIMENT (
        regimentID VARCHAR(10),
        regimentName VARCHAR(50),
        forceID VARCHAR(10),
        CONSTRAINT pk_REGIMENT PRIMARY KEY(regimentID),
        CONSTRAINT fk_FORCE FOREIGN KEY(forceID) REFERENCES FORCES(forceID));
`;
const userTableQuery = `
    ${createTableIfNotExistQuery} USER_TABLE(
        userID VARCHAR(10),
        firstName VARCHAR(20),
        lastName VARCHAR(30),
        gender VARCHAR(10),
        permanentAddress VARCHAR(80),
        permanentPostCode INT,
        temporaryAddress VARCHAR(80),
        temporaryPostCode INT,
        dateOfBirth DATE,
        mobileNumber VARCHAR(10),
        landNumber VARCHAR(10),
        NIC VARCHAR(15),
        emailAddr VARCHAR(30),
        password VARCHAR(60),
        soldierNumber VARCHAR(20),
        salary FLOAT,
        recruitedDate DATE,
        yearsOfService INT,
        retirement_date DATE,
        rankID VARCHAR(10),
        regimentID VARCHAR(10),
        CONSTRAINT pk_USER PRIMARY KEY(userID),
        CONSTRAINT fk_UserRank FOREIGN KEY(rankID) REFERENCES user_rank(rankID),
        CONSTRAINT fk_Reg FOREIGN KEY(regimentID) REFERENCES REGIMENT(regimentID))
`;
const pensionTableQuery = `
    ${createTableIfNotExistQuery} PENSION(
        pensionID VARCHAR(10),
        totalAmount FLOAT,
        renewDate DATE,
        userID VARCHAR(10),
        CONSTRAINT pk_PENSION PRIMARY KEY(pensionID),
        CONSTRAINT fk_USER FOREIGN KEY(userID) REFERENCES USER_TABLE(userID));
`;
const loanTableQuery = `
        ${createTableIfNotExistQuery} LOAN(
        loanID VARCHAR(10),
        amount FLOAT,
        interestRate FLOAT,
        timePeriod INT, 
        partonName VARCHAR(20),
        userID VARCHAR(10), 
        CONSTRAINT pk_LOAN PRIMARY KEY(loanID),
        CONSTRAINT fk_UT FOREIGN KEY(userID) REFERENCES USER_TABLE(userID));
`;

const dbTables = [forcesTableQuery, userRankTableQuery,
    adminTableQuery, regimentTableQuery, userTableQuery,
    pensionTableQuery, loanTableQuery];

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT
});

connection.connect(async(err) => {
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
    }); // Set database for connection
    
    // Create All Database tables
    dbTables.map((table) => {
        connection.query(table, (err) => {
            if (err) throw err;
        });
    });

    // Insert the initial data into ranks, regiment and forces tables
    const duplicatePrimaryKeyErrorRegex = /(ER_DUP_ENTRY)/;

    let forcesInsertionQuery = 'INSERT INTO FORCES (forceID, forceName) VALUES ';
    forcesInsertionQuery += columnData.forces.map((force) =>
        `('${force.id}', '${force.name}')`).join(',') + ";";
    
    let regimentsInsertionQuery = 'INSERT INTO REGIMENT (regimentID, regimentName, forceID) VALUES ';
    regimentsInsertionQuery += columnData.regiments.map((regiment) =>
        `('${regiment.id}', '${regiment.name}', '${regiment.forceID}')`).join(',') + ";";

    let ranksInsertionQuery = 'INSERT INTO USER_RANK (rankID, rankName, forceID) VALUES ';
    ranksInsertionQuery += columnData.ranks.map((rank) =>
        `('${rank.id}', '${rank.name}', '${rank.forceID}')`).join(',') + ";";

    const adminEmail = "militarysaluteweb2023@gmail.com";
    const adminPassword = "Th!$!S@dm!N";
    const adminInsertionQuery = `INSERT INTO ADMIN (email, password) VALUES \
        ("${adminEmail}", "${await encryptPassword(adminPassword)}")`;

    [adminInsertionQuery, forcesInsertionQuery, regimentsInsertionQuery, ranksInsertionQuery].map((insertionQuery) => {
        connection.query(insertionQuery, (err) => {
            if (err) {
                if (duplicatePrimaryKeyErrorRegex.test(err.message)) {
                    return;
                } else {
                    throw err;
                }
            }
        });
    });
});

module.exports = connection;