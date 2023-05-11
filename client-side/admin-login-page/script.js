const adminEmailEl = document.getElementById("email");
const adminPasswordEl = document.getElementById("password");
const loginBtnEl = document.getElementById("login-btn");
const domain = window.location.origin;

document.querySelector('head').innerHTML += `<link rel="icon" type="image/x-icon" href="${domain}/logo.png">`;

const areInputsValid = () => {
    // Add input validation here
    return true;
}

loginBtnEl.addEventListener('click', async() => {
    if (!areInputsValid()) return;

    const loginInfo = {
        email: adminEmailEl.value,
        password: adminPasswordEl.value
    }

    const response = await fetch(`${domain}/adminLogin/adminLoginInfo`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    });

    if (response.ok) {
        window.location.href = `${domain}/adminHomepage`;
    } else {
        const responseData = await response.json();
        alert(responseData.message);
    }
});