const chatbotWindow = document.getElementById("chatbot-window");
const body = document.getElementById('messaging-body');
const textInput = document.getElementById('user-input');
let messages = [];
const domain = 'http://localhost:3000';

const openChatbotWindow = () => {
    const windowVisibility = chatbotWindow.style.visibility;
    chatbotWindow.style.visibility = windowVisibility === 'visible' ? 'hidden' : 'visible';
}

textInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') generateMessage();
});

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

    body.innerHTML = messages.map((message, index) => {
        return `
            <div class="message human-text">
                <p>${message.human}</p>
            </div>
            <div class="message ai-text">
                <p>${message.ai}</p>
            </div>`;
    }).join('');
    

    textInput.value = "";
}