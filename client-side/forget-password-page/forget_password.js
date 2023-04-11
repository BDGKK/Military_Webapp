const userEmail = document.getElementById("uemail");
const newPassword = document.getElementById("newpw");
const confirmedPassword = document.getElementById('cmpw');
const verificationCode = document.getElementById('digit');

const sendVerificationCodeBtn = document.getElementById('send-vc-btn');
const setNewPasswordBtn = document.getElementById('set-password-btn');

const domain = window.location.origin;

function checkblank(x){
    if (userEmail.value === "") {
        alert("Enter your email address");
        return true;
    }
    if (newPassword.value === "" || confirmedPassword === "") {
        alert("Enter your new password");
        return true;
    }
    if(newPassword.value != confirmedPassword.value) {
        alert('New password and the comfirm password does not match');
        return true;
    }

    if (x === 0) return false;
    if(verificationCode.value == "") {
        alert('Enter the digit number that you got from email');
        return true;
    }

    return false;
}

sendVerificationCodeBtn.addEventListener('click', async() => {
    if (checkblank(0)) return;

    const newUserData = {
        email: userEmail.value,
        password: newPassword.value
    }

    const response = await fetch(`${domain}/forget-password/newUserData`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData)
    });
    
    const responseData = await response.json();
    alert(responseData.message);
});

setNewPasswordBtn.addEventListener('click', async() => {
    if (checkblank(1)) return;

    const userVerificationData = {
        email: userEmail.value,
        verificationCode: verificationCode.value
    }

    const response = await fetch(`${domain}/forget-password/userVerificationData`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(userVerificationData)
    });

    if (response.ok) {
        window.location.href = `${domain}/user-log`;
    } else {
        const responseData = await response.json();
        alert(responseData.message);
    }
});