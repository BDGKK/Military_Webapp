const { Configuration, OpenAIApi } = require("openai");
const path = require('path');
const express = require('express');
require('dotenv').config();

// Initialize the Router and display the frontend at the root URL (localhost:<port>/)
const router = express.Router();

// Not sure why this didn't work without WiFi
// It worked on localhost:<port> on home WiFi
//router.use(express.static('./client'));

router.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/client/home_page.html'));
});

// Initialize the openai instance
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let humanMessage = {};
let aiMessage = {};

// Message to send to the frontend
router.get('/messages', (req, res) => {
    res.status(200).send(aiMessage);
});

// Message to get from the frontend
router.post('/userinput', async(req, res) => {
    humanMessage = req.body.humanMessage;

    if (!humanMessage) {
        res.status(404).send({
            message: 'Please enter a message'
        });
    }

    // Input the user's message to the AI and get the AI's response
    const prompt = "The following is a conversation with an AI assistant. " +
        `The assistant gives basic responses to basic input.\n\nHuman: ${humanMessage}\nAI:`;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 450,
        temperature: 0.5
    });
    
    aiMessage = {message: response.data.choices[0].text};

    res.status(200).send({
        message: "Posted successfully"
    });
});

module.exports = router;