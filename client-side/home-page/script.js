const chatbotWindow = document.getElementById("chatbot-window");
const body = document.getElementById('messaging-body');
const textInput = document.getElementById('user-input');
const uname = document.getElementById('uname')
const email = document.getElementById('email')
const subject = document.getElementById('subject')
const comment = document.getElementById('comment')
const feedbackSubmitBtn = document.getElementById('feedback-submit-btn');

const userLoginLink = document.getElementById('user-login-link');
const profilePageLink = document.getElementById('profile-page-link');
const downloadAppPageLink = document.getElementById("download-app-page-link");
const needHelpPageLink = document.getElementById("need-help-page-link");

let section = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

let domain = window.location.origin;
const logoUrl = `${domain}/logo.png`;

document.querySelector('head').innerHTML += `<link rel="icon" type="image/x-icon" href="${logoUrl}">`;
document.querySelector('.navbar-header').innerHTML = `<img class="logo-img" src="${logoUrl}" alt="align box">`;

// Change Log button to 'Log in' or 'Log out' if user is logged in or not respectively
fetch('/userLoginStatus')
.then(response => response.json())
.then(loggedIn => {
    document.querySelector('#user-login-link').innerHTML = loggedIn ?
        '<a href="" onclick="logout()" title="user login" class="text-decoration-none text-white">Log Out</a>' :
        '<a href="/user-log" title="user login" class="text-decoration-none text-white">Log In</a>';
});

const logout = () => {
    fetch('/logout')
    .then(response => response.json())
    .then(data => {
        if (data.message !== 'Success') alert("Could not Log Out. Please try again");
    });
}

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

userLoginLink.addEventListener('click', () => {
    userLoginLink.href = `${domain}/user-log`;
});
profilePageLink.addEventListener('click', () => {
    profilePageLink.href = `${domain}/profile`; // Find a way to get the ?userid=<> here
});
document.querySelectorAll('.pension-page-link').forEach((item) => {
    item.addEventListener('click', () => {
        item.href = `${domain}/pension`;
    })
});
document.querySelectorAll('.loan-page-link').forEach((item) => {
    item.addEventListener('click', () => {
        item.href = `${domain}/loan`;
    })
});
downloadAppPageLink.addEventListener('click', () => {
    downloadAppPageLink.href = `${domain}/download-application`;
});
needHelpPageLink.addEventListener('click', () => {
    needHelpPageLink.href = `${domain}/need-help`;
});


function applyedloan() {
    // I closed these functions for now since they were getting kind of annoying - Kehan
    //alert("You have not applyed for loans !! check Need help? for instructions");
}

function applyedpension(){
    //alert("You are not applyed for pension, check Need help? for instructions")
}

let messages = [];

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
    return true;
}

feedbackSubmitBtn.addEventListener('click', async() => {
    if (!checkforblank()) return;

    const feedbackInfo = {
        name: uname.value,
        email: email.value,
        subject: subject.value,
        comment: comment.value
    }

    const response = await fetch(`${domain}/feedback`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackInfo)
    });

    if (response.ok) {
        alert("Thank you for your feedback!");
    } else {
        alert("Could not send feedback");
    }
});