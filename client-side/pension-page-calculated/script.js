const userIDEl          = document.getElementById('user-id');
const emailAddrEl       = document.getElementById("email-addr");
const rankEl            = document.getElementById("rank");
const salaryEl          = document.getElementById("salary");
const yearsOfServiceEl  = document.getElementById("years");
const disabilities      = document.getElementById("disabilities");
const granterName       = document.getElementById("granter-name");
const granterRelation   = document.getElementById("granter-relation");
const renewDateEl       = document.getElementById("renew-date");
const paymentEl         = document.getElementById("payment");

const domain = window.location.origin;
document.querySelector('head').innerHTML += `<link rel="icon" type="image/x-icon" href="${domain}/logo.png">`;

const loadData = async() => {
    const userDataResponse = await fetch(`${domain}/profile/userData`);
    const userData = await userDataResponse.json();

    userIDEl.innerHTML = userData.userId;
    emailAddrEl.innerHTML = userData.emailAddr;
    rankEl.innerHTML = userData.rank;
    yearsOfServiceEl.innerHTML = userData.yearsOfService;
    salaryEl.innerHTML = userData.salary;

    disabilities.innerHTML = localStorage.getItem('disabilities') || null;
    granterName.innerHTML = localStorage.getItem('granterName') || null;
    granterRelation.innerHTML = localStorage.getItem('granterRelationship') || null;
    renewDateEl.innerHTML = localStorage.getItem('renewalDate') || null;
    paymentEl.innerHTML = localStorage.getItem('monthlyPayment') || null;

    localStorage.clear();
}
loadData();