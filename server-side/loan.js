//The Express web framework for creating the server and defining routes.
const express = require("express");
//The built-in Node.js module for streaming data.
const stream = require('stream');
//A middleware for handling file uploads.
const multer = require('multer');
//The built-in Node.js module for working with file paths.
const path = require('path');
//The official Node.js client library for Google APIs.
const { google } = require('googleapis');
//A module for establishing a connection to the database.
const connection = require('../database/connection');
//A constant storing the Google Drive folder ID.
const { GOOGLE_DRIVE_FOLDER_ID } = require('../config');

const router = express.Router();
const upload = multer(); // Initialize upload middleware

//variable is defined, specifying the path to the service account credentials file.
const keyFilePath = path.join(__dirname, '..', 'credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/drive']; //defines the necessary scopes for accessing Google Drive.

//An instance of 'google.auth.GoogleAuth' is created to authenticate the service account using the provided 'keyfile' and 'scopes'.
const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: SCOPES
});

// Prevent user from accessing page if their login details aren't saved
router.get('/loan', (req, res, next) => {
    !req.session.userId ? res.redirect('/user-log') : next();
});
//The static files for the loan page are served using express.static() middleware, mapping the /loan route to the ./client-side/loan-page directory.
router.use('/loan', express.static('./client-side/loan-page'));

//takes a 'fileObject' and 'userId' as input
const uploadFileToDrive = async (fileObject, userId) => {
    const bufferStream = new stream.PassThrough(); // bufferStream turns the file into smaller chunks/packages
    bufferStream.end(fileObject.buffer);

    // Initialize instance of Google Drive and sends a request to upload the file stream to Google Drive.
    const drive = await google.drive({ version: 'v3', auth });

    // Request to upload file stream to google drive 
    const response = await drive.files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream
        },
        //The file is associated with the user by specifying the parent folder ID
        requestBody: {
            name: `loan_user${userId}`,
            parents: [GOOGLE_DRIVE_FOLDER_ID]
        },
        fields: "id,name"
    });

    const { data } = response;
    console.log(`User ${userId} uploaded ${data.name}`);
}

//A route handler is defined for the '/loan/uploadDocument' route, which expects a 'POST' request. 
router.post('/loan/uploadDocument', (req, res) => {
    //'upload.single()' middleware to handle the file upload
    // 'myFile' is the name of the input from the HTML form
    upload.single('myFile')(req, res, (err) => {
        if (err) throw err;
        //'uploadFileToDrive' function is called with the uploaded file and the user ID stored in the session.
        uploadFileToDrive(req.file, req.session.userId);
        res.status(200).json({
            //JSON response is sent indicating the successful file upload.
            message: 'File uploaded successfully',
        });
    });
});

router.post('/loan/loanInfo', (req, res) => {
    const amount = req.body.amount;
    const interestRate = req.body.interestRate;
    const timePeriod = req.body.timePeriod;
    const partonName = req.body.partonName;
    const userId = req.session.userId;

    const insertLoanDataQuery = `
        INSERT INTO loan(amount, interestRate, timePeriod, partonName, userID)
        VALUES (${amount}, ${interestRate}, ${timePeriod}, '${partonName}', '${userId}')`;

    connection.query(insertLoanDataQuery, (err) => {
        if (err) throw err;
        console.log(`User ${userId} applied for a loan`);
        res.status(200).send({ message: "Successfully Submitted!" });
    });
});

module.exports = router;