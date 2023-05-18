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
router.get('/pension', (req, res, next) => {
    !req.session.userId ? res.redirect('/user-log') : next();
});
router.use('/pension', express.static('./client-side/pension-page'));

const uploadFileToDrive = async (fileObject, userId) => {
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
            name: `pension_user${userId}`,
            parents: [GOOGLE_DRIVE_FOLDER_ID]
        },
        fields: "id,name"
    });

    const { data } = response;
    console.log(`User ${userId} uploaded ${data.name}`);
}

router.post('/pension/uploadDocument', (req, res) => {
    // 'myFile' is the name of the input from the HTML form
    upload.single('myFile')(req, res, (err) => {
        if (err) throw err;

        uploadFileToDrive(req.file, req.session.userId);
        res.status(200).json({
            message: 'File uploaded successfully',
        });
    });
});

router.post('/pension/pensionInfo', (req, res) => {
    const totalAmount = req.body.totalAmount;
    const renewDate = req.body.renewDate;
    const userId = req.session.userId;

    const insertPensionDataQuery = `
        INSERT INTO pension(totalAmount, renewDate, userID)
        VALUES (${totalAmount}, '${renewDate}', '${userId}')`;

    connection.query(insertPensionDataQuery, (err) => {
        if (err) throw err;
        console.log(`User ${userId} applied for a pension`);
        res.status(200).send({ message: "Successfully Submitted!" });
    });
});

module.exports = router;