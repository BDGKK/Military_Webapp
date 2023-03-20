const uemail = document.getElementById('uemail')
const upaw = document.getElementById('upaw')
const forgetPasswordPageLink = document.getElementById("forget-password-page-link");
const registrationPageLink = document.getElementById("registration-page-link")

const domain = window.location.origin;

forgetPasswordPageLink.addEventListener('click', () => {
    forgetPasswordPageLink.href = `${domain}/forget-password`;
});
registrationPageLink.addEventListener('click', () => {
    registrationPageLink.href = `${domain}/registration`;
});

function checkforblank(){

    if(uemail.value == ""){
        alert('please enter email');
        return false;
    }

    if(upaw.value == ""){
        alert('please enter password');
        return false;
    }

    if(upaw.value == 8){
        alert('password shuold be 8 charakters');
        return false;
    }

}