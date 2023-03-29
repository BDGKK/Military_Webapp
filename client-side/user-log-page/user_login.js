const uemail = document.getElementById('uemail')
const upaw = document.getElementById('upaw')
const loginBtnEl = document.getElementById("login-btn");
const forgetPasswordPageLink = document.getElementById("forget-password-page-link");
const registrationPageLink = document.getElementById("registration-page-link")

const domain = window.location.origin;

function checkforblank(){
    if(uemail.value == ""){
        alert('please enter email');
        return false;
    }
    if(upaw.value == ""){
        alert('please enter password');
        return false;
    }
    if(upaw.value.length < 8){
        alert('password shuold be 8 charakters');
        return false;
    }
    return true;
}

forgetPasswordPageLink.addEventListener('click', () => {
    forgetPasswordPageLink.href = `${domain}/forget-password`;
});
registrationPageLink.addEventListener('click', () => {
    registrationPageLink.href = `${domain}/registration`;
});
loginBtnEl.addEventListener('click', async() => {
    if (!checkforblank()) return;

    const loginInfo = {
        email: uemail.value,
        password: upaw.value
    }

    const response = await fetch(`${domain}/user-log/userLoginInfo`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    });

    if (response.ok) {
        window.location.href = `${domain}`;
    } else {
        const responseData = await response.json();
        alert(responseData.message);
    }
});