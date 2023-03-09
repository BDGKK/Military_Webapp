// Use template literals and pass username to this file
const { DOMAIN_NAME } = require("./config");

const chatbotDataset = {
    "greeting": "Hello! How can I assist you today?",

    "farewell": "Goodbye! Have a great day!",

    "help": "Of course! What can I help you with?",

    "creators": "The creators of this application can be found on the homepage in the About section. "+
        "Please click on the link below to see the website authors<br>"+
        `<a href='${DOMAIN_NAME}/#about-section'>Click here</a>`,
    
    "pensions": "The pension is a retirement plan that gives income to military members after "+
        "they have retired. Click the link below to move to the pensions page<br>(link to pension page)",
    
    "loans": "The loan is the amount of money that the military leaver has borrowed that must be "+
        "repaid with interest. Click the link below to move to the loans page<br>(link to loans page)",
    
    "register": "To register, please click the link below to move the registration page. Please fill in "+
        "your details and submit the form to register<br>(link to registration page)",
    
    "feedback": "To submit feedback or contact customer support, please click on the link below to move "+
        "to the feedback form. Please fill in the boxes and submit the form to send your request.<br>"+
        `<a href='${DOMAIN_NAME}/#feedback-form'>Click here</a>`,
    
    "get-started": "1. Complete the registration process, {0}<br><br>"+
        "2. Explore your pension options, {1}<br><br>"+
        "3. Check out our loans page, {2}<br><br>"+
        "4. (Additional instructions to enter - still in development)",

    "chatbot-tasks": "I am a chatbot designed to assist in any of the following requests.<br><br>"+
        "1. Give information on the website authors<br>"+
        "2. Help you with pensions<br>"+
        "3. Help you with loans<br>"+
        "4. Help you with registration<br>"+
        "5. Help you contact customer support<br>"+
        "6. Help you get started with this website<br>"+
        "7. Help you with transferring account details<br><br>"+
        "If you need any assistance, please let me know and I'll do my best to help!",

    "account-transfer": "I'm sorry, you cannot transfer your data to another account.<br>"+
        "It is suggested that you create another account and fill your details from the beginning.",
    
    "description": "Our website is dedicated to help military retirees and leavers transition smoothly into civilian life. "+
        "We provide support for pensions, loans and accomodations to ensure a comfortable and stress-free retirement.",

    "thanks": "Your welcome! I'm glad to help :)",

    "no help": "I'm sorry, I'm unable to respond to that."
}

const greetingRegex = /(hello|hi|hey|morning|afternoon|evening|yo|greetings|greeting|what's up)\b/i;
const farewellRegex = /(bye|see you later|farewell|adios|night)\b/i;
const helpRegex = /(help|assist|aid)\b/i;
const creatorsRegex = /(made|created|creator|creators|designed|developed|built)\b(website|page|site|web)?\b/i;
const pensionRegex = /(pension|pensions)\b/i;
const loansRegex = /(loan|loans)\b/i;
const registerRegex = /(sign up|register|registration|registry|enroll)\b/i;
const feedbackRegex = /(feedback|admin|administrator|customer (support|service))\b/i;
const getStartedRegex = /(get started|begin|tutorial|start)\b(started|app|site|platform|software)?/i;
const chatbotTasksRegex = /((who are|what are)|capabilities|task|commands|chatbot|what (can|do) you do)(you|talk|answer)?/i;
const accountTransferRegex = /(transfer|move|account)/i;
const descriptionRegex = /((what is|what's|what does)|purpose|explain|website|service|function|tell|describe|description|goal)\b(do|about|web|app|software|site|page)?\b/i;
const thanksRegex = /(thank|appreciate|grateful)/i;

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

    if (getStartedRegex.test(message)) {
        anyMatch = true;

        response += chatbotDataset['get-started']
        .replace('{0}', chatbotDataset['register'])
        .replace('{1}', chatbotDataset['pensions'])
        .replace('{2}', chatbotDataset['loans']) + "<br><br>";
    }

    if (chatbotTasksRegex.test(message)) {
        anyMatch = true;
        response += chatbotDataset['chatbot-tasks'] + "<br><br>";
    }

    if (accountTransferRegex.test(message)) {
        anyMatch = true;
        response += chatbotDataset['account-transfer'] + "<br><br>";
    }

    if (descriptionRegex.test(message)) {
        anyMatch = true;
        response += chatbotDataset['description'] + "<br><br>";
    }

    if (thanksRegex.test(message)) {
        anyMatch = true;
        response += chatbotDataset['thanks'] + "<br><br>";
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