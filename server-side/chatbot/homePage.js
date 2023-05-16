const express = require('express');
const chatbotModel = require("./chatbotModel");
const isFeedbackEmailSent = require("../side-functions/sendFeedbackEmail");

const router = express.Router(); // Initialize the Router
router.use('/', express.static('./client-side/home-page'));

let chatbotResponse = {};

// Send response to frontend chatbot
router.get('/chatbot/messages', (req, res) => {
    res.status(200).send(chatbotResponse);
});

// Get input from frontend chatbot
router.post('/chatbot/userinput', (req, res) => {
    const humanMessage = req.body.humanMessage;

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

// Send user feedback to Our Website as an email
router.post('/feedback', async(req, res) => {
    const { name, email, subject, comment } = req.body;

    if (!isFeedbackEmailSent(name, email, subject, comment)) {
        res.status(400).send({message: "Could not send Feedback"});
    } else {
        res.status(200).send({message: "Feedback Sent Successfully"});
    }
});

router.get('/userLoginStatus', (req, res) => {
    res.status(200).send(req.session.userId ? true : false);
});

router.get('/logout', (req, res) => {
    try {
        req.session.destroy();
        res.status(200).send({message: 'Success'});
    } catch (e) {
        res.status(200).send({message: 'Failed'});
    }
});

module.exports = router;