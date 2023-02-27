const chatbotWindow = document.getElementById("chatbot-window");
const body = document.getElementById('messaging-body');
const textInput = document.getElementById('user-input');
const messages = [];
const domain = 'http://localhost:3000';

const openChatbotWindow = () => {
    const windowVisibility = chatbotWindow.style.visibility;
    chatbotWindow.style.visibility = windowVisibility === 'visible' ? 'hidden' : 'visible';
}

const getMessage = async() => {
    const message = await fetch(`${domain}/homepage/messages`);
    return message.json();
}

const sendMessage = async(humanMessage) => {
    const res = await fetch(`${domain}/homepage/userinput`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({humanMessage})
    });
}

const generateMessage = async() => {
    const input = textInput.value;

    if (input === "") {
        alert('Please enter an input');
        return;
    }
    
    await sendMessage(input);
    let AIMessage = await getMessage();
    messages.push({human: input, ai: AIMessage.message});

    body.innerHTML = messages.map((message) => {
        return `<p>Human: ${message.human}</p><p style="color: green;">AI: ${message.ai}</p>`;
    }).join('');

    textInput.value = "";
}