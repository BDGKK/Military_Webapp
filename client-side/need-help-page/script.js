const registryPageLink = document.getElementById('registration-page-link');
const forgetPasswordPageLink = document.getElementById('forget-password-page-link');
const pensionPageLink = document.getElementById('pension-page-link');
const loanPageLink = document.getElementById('loan-page-link');

const domain = window.location.origin;
document.querySelector('head').innerHTML += `<link rel="icon" type="image/x-icon" href="${domain}/logo.png">`;

registryPageLink.addEventListener('click', () => {
    registryPageLink.href = `${domain}/registration`;
});
forgetPasswordPageLink.addEventListener('click', () => {
    forgetPasswordPageLink.href = `${domain}/forget-password`;
});
pensionPageLink.addEventListener('click', () => {
    pensionPageLink.href = `${domain}/pension`;
});
loanPageLink.addEventListener('click', () => {
    loanPageLink.href = `${domain}/loan`;
});