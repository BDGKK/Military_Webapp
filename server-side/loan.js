const express = require("express");
const stream = require('stream');
const multer = require('multer');
const path = require('path');
const { google } = require('googleapis');
const connection = require('../database/connection');
const { GOOGLE_DRIVE_FOLDER_ID } = require('../config');

const router = express.Router();
const upload = multer(); // Initialize upload middleware

const keyFilePath = path.join(__dirname, '..', 'credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

// Authenticate the service account
const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: SCOPES
});

// Prevent user from accessing page if their login details aren't saved
router.get('/loan', (req, res, next) => {
    !req.session.userId ? res.redirect('/user-log') : next();
});
router.use('/loan', express.static('./client-side/loan-page'));

const uploadFileToDrive = async(fileObject, userId) => {
    const bufferStream = new stream.PassThrough(); // bufferStream turns the file into smaller chunks/packages
    bufferStream.end(fileObject.buffer);
    
    // Initialize instance of Google Drive
    const drive = await google.drive({ version: 'v3', auth });

    // Request to upload file stream to google drive 
    const response = await drive.files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream
        },
        requestBody: {
            name: `loan_user${userId}`,
            parents: [GOOGLE_DRIVE_FOLDER_ID]
        },
        fields: "id,name"
    });
    
    const { data } = response;
    console.log(`User ${userId} uploaded ${data.name}`);
}

router.post('/loan/uploadDocument', (req, res) => {
    // 'myFile' is the name of the input from the HTML form
    upload.single('myFile')(req, res, (err) => {
        if (err) throw err;
        
        uploadFileToDrive(req.file, req.session.userId);
        res.status(200).json({
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
        res.status(200).send({message: "Successfully Submitted!"});
    });
});

module.exports = router;