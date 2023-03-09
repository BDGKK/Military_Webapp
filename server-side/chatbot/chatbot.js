const express = require('express');
const chatbotModel = require("./chatbotModel");

// Initialize the Router and display the frontend at the root URL (localhost:<port>/)
const router = express.Router();
router.use('/', express.static('./client-side/home-page'));

let chatbotResponse = {};

// Message to send to the frontend
router.get('/chatbot/messages', (req, res) => {
    res.status(200).send(chatbotResponse);
});

// Message to get from the frontend
router.post('/chatbot/userinput', async(req, res) => {
    humanMessage = req.body.humanMessage;

    if (!humanMessage) {
        res.status(404).send({
            message: 'Please enter a message'
        });
    }

    chatbotResponse = {message: chatbotModel(humanMessage)};

    res.status(200).send({
        message: "Posted successfully"
    });
});

module.exports = router;