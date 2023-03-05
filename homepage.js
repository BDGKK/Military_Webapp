const express = require('express');
const chatbot = require("./chatbot");
require('dotenv').config();

// Initialize the Router and display the frontend at the root URL (localhost:<port>/)
const router = express.Router();
router.use('/', express.static('./home-page'));

let chatbotResponse = {};

// Message to send to the frontend
router.get('/homepage/messages', (req, res) => {
    res.status(200).send(chatbotResponse);
});

// Message to get from the frontend
router.post('/homepage/userinput', async(req, res) => {
    humanMessage = req.body.humanMessage;

    if (!humanMessage) {
        res.status(404).send({
            message: 'Please enter a message'
        });
    }

    chatbotResponse = {message: chatbot(humanMessage)};

    res.status(200).send({
        message: "Posted successfully"
    });
});

module.exports = router;