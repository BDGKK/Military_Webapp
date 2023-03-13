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
        regimentName VARCHAR(30),
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

    // Insert the initial data into ranks, regiment and forces tables
    // Create a separate js file containing the data as a JSON object with array of the ranks,
    //  regiments and forces
    const duplicatePrimaryKeyErrorRegex = /(ER_DUP_ENTRY)/;
    const regimentsData = [
        {
            name: 'sri lanka light infantry',
            forceID: 1
        },
        {
            name: 'sri lanka sinha regiment',
            forceID: 1
        },
        {
            name: 'gemunu watch',
            forceID: 1
        },
        {
            name: 'gajaba regiment',
            forceID: 1
        },
        {
            name: 'vijayabahy infantry regiment',
            forceID: 1
        },
        {
            name: 'mechanized infantry regiment',
            forceID: 1
        },
        {
            name: 'executive',
            forceID: 2
        },
        {
            name: 'supply',
            forceID: 2
        },
        {
            name: 'provost',
            forceID: 2
        },
        {
            name: 'engineering',
            forceID: 2
        },
        {
            name: 'electrical',
            forceID: 2
        },
        {
            name: 'legal',
            forceID: 2
        },
        {
            name: 'marine',
            forceID: 2
        },
        {
            name: 'infantry',
            forceID: 2
        },
        {
            name: 'slaf regiment special force',
            forceID: 3
        },
        {
            name: 'slaf special air borne force',
            forceID: 3
        }
    ];
    const forcesInsertionQuery = 'INSERT INTO FORCES (forceID, forceName) VALUES\
        (1, "army"), (2, "navy"), (3, "airforce");';
    
    let regimentsInsertionQuery = 'INSERT INTO REGIMENT (regimentID, regimentName, forceID) VALUES ';
    regimentsInsertionQuery += regimentsData.map((regiment, index) =>
        `(${index+1}, '${regiment.name}', ${regiment.forceID})`).join(',') + ";";
    
    connection.query(forcesInsertionQuery, (err) => {
        if (err) {
            if (duplicatePrimaryKeyErrorRegex.test(err.message)) {
                return;
            } else {
                throw err;
            }
        };
    });

    connection.query(regimentsInsertionQuery, (err) => {
        if (err) {
            if (duplicatePrimaryKeyErrorRegex.test(err.message)) {
                return;
            } else {
                throw err;
            }
        };
    });

    // Space for user_rank table insertion queries
});

module.exports = connection;