// Use template literals and pass username to this file
const {DOMAIN_NAME} = require("./config");

const chatbotDataset = {
    "greeting": "Hello! How can I assist you today?",
    "farewell": "Goodbye! Have a great day!",
    "help": "Of course! What can I help you with?",
    "creators": `The creators of this application can be found on the homepage in the About section<br>\
        <a href='${DOMAIN_NAME}/#about-section'>Click here to view</a>`,
    "pensions": "(Describe pensions and how to get it - link to pension page)",
    "loans": "(Describe loans and how to get it - link to loans page)",
    "register": "(Placeholder for registration - link to registration page)",
    "feedback": `(Placeholder for feedback form)<br>\
        <a href='${DOMAIN_NAME}/#feedback-form'>Click here to view</a>`,
    "password-reset": "(Placeholder for password reset help)",
    "get-started": "(Placeholder for website instructions)",
    "account-recovery": "(Placeholder for account recovery help)",
    "account-transfer": "I'm sorry, you cannot transfer your data to another account.<br>\
        It is suggested that you create another account and fill your details from the beginning.",
    "description": "(Placeholder for website description)",
    "no help": "I'm sorry, I am not able to help you with that"
}

const greetingRegex = /(hello|hi|hey|morning|afternoon|evening)\b/i;
const farewellRegex = /(bye|see you later|farewell|adios|night)\b/i;
const helpRegex = /(help|assist|aid|assistance)\b/i;
const creatorsRegex = /(made|created|designed|developed|built)\b(website|page|site|web)?\b/i;
const pensionRegex = /(pension|pensions)\b/i;
const loansRegex = /(loan|loans)\b/i;
const registerRegex = /(sign up|register|registration|registry|enroll)\b/i;
const feedbackRegex = /(feedback|admin|administrator)\b/i;

const getResponse = (message) => {
    let response = "";
    let anyMatch = false;

    if (greetingRegex.test(message)) {
        anyMatch = true;
        response += chatbotDataset["greeting"] + "<br><br>";
    }
    
    if (helpRegex.test(message)) {
        anyMatch = true;
        response += chatbotDataset['help'] + "<br><br>";
    }

    if (creatorsRegex.test(message)) {
        anyMatch = true;
        response += chatbotDataset['creators'] + "<br><br>";
    }

    if (pensionRegex.test(message)) {
        anyMatch = true;
        response += chatbotDataset['pensions'] + "<br><br>";
    }

    if (loansRegex.test(message)) {
        anyMatch = true;
        response += chatbotDataset['loans'] + "<br><br>";
    }

    if (registerRegex.test(message)) {
        anyMatch = true;
        response += chatbotDataset['register'] + "<br><br>";
    }

    if (feedbackRegex.test(message)) {
        anyMatch = true;
        response += chatbotDataset['feedback'] + "<br><br>";
    }

    if (farewellRegex.test(message)) {
        anyMatch = true;
        response += chatbotDataset['farewell'] + "<br><br>";
    }

    if (!anyMatch) {
        response += chatbotDataset['no help'] + "<br><br>";
    }
    return response.slice(0, -8);
}

module.exports = getResponse;