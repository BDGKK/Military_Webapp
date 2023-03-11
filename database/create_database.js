const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = require('../config');
const mysql = require('mysql');

const connectionWithoutDB = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT
});

connectionWithoutDB.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected...");

    connectionWithoutDB.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err) => {
        if (err) throw err;
    });

    connectionWithoutDB.database = DB_NAME;
    /*
    // Reset the connection but add the database name - important if database was just created
    connectionWithoutDB = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'kenichi12345',
        database: dbName
    });

    // Create the table if it doesn't exist in the database
    let createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (student_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, ` + 
    "first_name VARCHAR(200), last_name VARCHAR(200), DOB DATE, phone VARCHAR(200))";

    connectionWithoutDB.query(createTableQuery, (err) => {
        if (err) throw err;
    });
    */
});

module.exports = connectionWithoutDB;