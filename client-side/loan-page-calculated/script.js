const userIDEl = document.getElementById('user-id');
const emailAddrEl = document.getElementById("email-addr");
const reasonEl = document.getElementById("reason");
const typeEl = document.getElementById("type");
const amountEl = document.getElementById("amount");
const timePeriodEl = document.getElementById("time-period");
const paymentEl = document.getElementById("monthly-payment");
const dueDateEl = document.getElementById("due-date");
const partonName = document.getElementById("parton-name");
const partonNIC = document.getElementById("parton-nic");

const domain = window.location.origin;
document.querySelector('head').innerHTML += `<link rel="icon" type="image/x-icon" href="${domain}/logo.png">`;

const loadData = async () => {
  const userDataResponse = await fetch(`${domain}/profile/userData`);
  const userData = await userDataResponse.json();

  userIDEl.innerHTML = userData.userId;
  emailAddrEl.innerHTML = userData.emailAddr;

  reasonEl.innerHTML = localStorage.getItem('reasonForLoan') || null;
  typeEl.innerHTML = localStorage.getItem('typeOfLoan') || null;
  amountEl.innerHTML = localStorage.getItem('loanAmount') || null;
  timePeriodEl.innerHTML = localStorage.getItem('timePeriod') || null;
  paymentEl.innerHTML = localStorage.getItem('monthlyPayment') || null;
  dueDateEl.innerHTML = localStorage.getItem('dueDate') || null;
  partonName.innerHTML = localStorage.getItem('partonName') || null;
  partonNIC.innerHTML = localStorage.getItem('partonNIC') || null;

  localStorage.clear();
}
loadData();