// Use template literals and pass username to this file
const chatbotDataset = {
    "greeting": "Hello! How can I assist you today?",
    "farewell": "Goodbye! Have a great day!",
    "help": "Of course! What can I help you with?",
    "no help": "I'm sorry, I am not able to help you with that"
}

const greetingRegex = /(hello|hi|hey|morning|afternoon|evening)\b/i;
const farewellRegex = /(bye|see you later|farewell|adios|night)\b/i;
const helpRegex = /(help)\b/i;

const getResponse = (message) => {
    let response = "";

    if (greetingRegex.test(message)) {
        response += chatbotDataset["greeting"] + "<br><br>";
    }

    if (farewellRegex.test(message)) {
        response += chatbotDataset['farewell'] + "<br><br>";
    }
    
    if (helpRegex.test(message)) {
        response += chatbotDataset['help'] + "<br><br>";
    }

    return response.slice(0, -8);
}

module.exports = getResponse;