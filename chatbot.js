// Use template literals and pass username to this file
const chatbotDataset = {
    "hello": "Hello! How can I assist you today?",
    "goodbye": "Goodbye! Have a great day!",
    "help me": "Of course! What can I help you with?",
    "helpnono": "I'm sorry ${name}, I am not able to help you with that"
}

const response = (message) => {
    if (message === "hi") {
        return chatbotDataset["hello"];
    } else {
        return chatbotDataset['helpnono'];
    }
}

module.exports = response;