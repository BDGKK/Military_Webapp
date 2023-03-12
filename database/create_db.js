const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = require('../config');
const mysql = require('mysql');

const createTableIfNotExistQuery = 'CREATE TABLE IF NOT EXISTS';
const userRankTableQuery = `
    ${createTableIfNotExistQuery} USER_RANK(
        rank_ID INT,
        rank_Name CHAR(20),
        CONSTRAINT pk_RANK PRIMARY KEY(rank_ID));
`;
const forcesTableQuery = `
    ${createTableIfNotExistQuery} FORCES(
        force_ID INT,
        force_Name CHAR(20),
        CONSTRAINT pk_FORCES PRIMARY KEY(force_ID));
`;
const userTableQuery = `
    ${createTableIfNotExistQuery} USER_TABLE(
        user_ID INT,
        first_Name CHAR(20),
        last_name CHAR(30),
        permanent_address CHAR(50),
        postal_code_permanent INT,
        temporary_address CHAR(50),
        postal_code_temporary INT,
        DOB DATE,
        mobile_phone CHAR(10),
        phone_land CHAR(10),
        NIC CHAR(15),
        email CHAR(30),
        solider_number INT,
        pword CHAR(12),
        salary FLOAT,
        recruited_date DATE,
        years_of_service CHAR(15),
        retirment_date DATE,
        rank_id INT,
        force_id INT,
        CONSTRAINT pk_USER PRIMARY KEY(user_ID))`;/*,
        CONSTRAINT fk_UserRank FOREIGN KEY(rank_id) REFERENCES user_rank(rank_id),
        CONSTRAINT fk_UserForce FOREIGN KEY(force_id) REFERENCES FORCES(force_id));
`;*/
const regimentTableQuery = `
    ${createTableIfNotExistQuery} REGIMENT (
        regiment_ID INT,
        regiment_Name CHAR(20),
        force_ID INT,
        CONSTRAINT pk_REGIMENT PRIMARY KEY(regiment_ID),
        CONSTRAINT fk_FORCE FOREIGN KEY(force_ID) REFERENCES FORCES(force_ID));
`;
const pensionTableQuery = `
    ${createTableIfNotExistQuery} PENSION(
        pension_ID INT,
        total_amount FLOAT,
        renewDate DATE,
        user_ID INT,
        CONSTRAINT pk_PENSION PRIMARY KEY(pension_ID),
        CONSTRAINT fk_USER FOREIGN KEY(user_ID) REFERENCES USER_TABLE(user_ID));
`;
const adminTableQuery = `
    ${createTableIfNotExistQuery} ADMIN(
        email CHAR(30),
        password CHAR(20),
        CONSTRAINT pk_ADMIN PRIMARY KEY(email));
`;
const feedbackTableQuery = `
    ${createTableIfNotExistQuery} FEEDBACK(
        feedback_id INT, 
        name CHAR(20),
        email CHAR(30),
        subject CHAR(50),
        user_id INT,
        adminEmail CHAR(30),
        CONSTRAINT pk_FEEDBACK PRIMARY KEY(feedback_id),
        CONSTRAINT fk_U FOREIGN KEY(user_id) REFERENCES USER_TABLE(user_id),
        CONSTRAINT fk_ADMIN FOREIGN KEY(adminEmail) REFERENCES ADMIN(email));
`;

const dbTables = [userRankTableQuery, forcesTableQuery, userTableQuery, regimentTableQuery,
    pensionTableQuery, adminTableQuery, feedbackTableQuery];

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT
});

connection.connect((err) => {
    if (err) throw err;
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