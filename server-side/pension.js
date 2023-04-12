const express = require("express");
const connection = require('../database/connection')

const multer = require('multer');
const path = require('path');

const router = express.Router();
router.use('/pension', express.static('./client-side/pension-page'));

// Set storage engine for uploaded files
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1 MB file size limit
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myFile'); // 'myFile' is the name of the input field

function checkFileType(file, cb) {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const isExtensionValid = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const isMIMETypeValid = allowedFileTypes.test(file.mimetype);

    if (isExtensionValid && isMIMETypeValid) {
        return cb(null, true);
    } else {
        return cb('Error: Images only!');
    }
}

router.post('/pension/pensionInfo', (req, res) => {
    const totalAmount = req.body.totalAmount;
    const renewDate = req.body.renewDate;
    const userId = req.body.userId;
    
    const insertPensionDataQuery = `
        INSERT INTO pension(totalAmount, renewDate, userID)
        VALUES (${totalAmount}, '${renewDate}', '${userId}')`;
    
    connection.query(insertPensionDataQuery, (err) => {
        if (err) throw err;
        console.log(`User ${userId} applied for a pension`);
        res.status(200).send({message: "Successfully Submitted!"});
    });

    // Add code later to get pension document and upload to Google Drive

});

// Handle file upload
router.post('/pension/fileUpload', (req, res) => {
    upload(req, res, (err) => {
        if (err) throw err;

        if (req.file == undefined) {
            res.status(400).json({ message: 'Error: No file selected!' });
        } else {
            res.status(200).json({
                message: 'File uploaded successfully!',
                file: `uploads/${req.file.filename}`
            });
        }
    });
});

module.exports = router;