const chatbotWindow = document.getElementById("chatbot-window");
const body = document.getElementById('messaging-body');
const textInput = document.getElementById('user-input');
const uname = document.getElementById('uname')
const email = document.getElementById('email')
const subject = document.getElementById('subject')
const comment = document.getElementById('comment')

let section = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () =>{
    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navlinks.forEach(links =>{
                links.classList.remove('active');
                document.querySelector('header nav a[herf*='+ id +']').classList.add('active');
            });
        };
    });
};



function applyedloan() {
    alert("You have not applyed for loans !! check Need help? for instructions");
 }

 function applyedpension(){
    alert("You are not applyed for pension, check Need help? for instructions")
 }

let messages = [];
let domain = window.location.origin;

const openChatbotWindow = () => {
    const windowVisibility = chatbotWindow.style.visibility;
    chatbotWindow.style.visibility = windowVisibility === 'visible' ? 'hidden' : 'visible';
}

textInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') generateMessage();
});

const getMessage = async() => {
    const message = await fetch(`${domain}/chatbot/messages`);
    return message.json();
}

const sendMessage = async(humanMessage) => {
    await fetch(`${domain}/chatbot/userinput`, {
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
        return `
            <div class="message human-text">
                <p>${message.human}</p>
            </div>
            <div class="message ai-text">
                <p>${message.ai}</p>
            </div>`;
    }).join('');
    

    textInput.value = "";
    body.scrollTop = body.scrollHeight;
}

function checkforblank(){

    if(uname.value == ""){
        alert('please enter Name');
        return false;
    }

    if(email.value == ""){
        alert('please enter Email');
        return false;
    }

    if(subject.value == ""){
        alert('please enter Subject');
        return false;
    }

    if(comment.value == ""){
        alert('please enter Comment');
        return false;
    }

}