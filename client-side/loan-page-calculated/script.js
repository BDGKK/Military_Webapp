const userIDEl          = document.getElementById('user-id');
const emailAddrEl       = document.getElementById("email-addr");
const reasonEl          = document.getElementById("reason");
const typeEl            = document.getElementById("type");
const amountEl          = document.getElementById("amount");
const timePeriodEl      = document.getElementById("time-period");
const paymentEl         = document.getElementById("monthly-payment");
const dueDateEl         = document.getElementById("due-date");
const partonName        = document.getElementById("parton-name");
const partonNIC         = document.getElementById("parton-nic");

const domain = window.location.origin;
document.querySelector('head').innerHTML += `<link rel="icon" type="image/x-icon" href="${domain}/logo.png">`;

function calculateDueDate(dueDateEl) {
  var currentDate = new Date();

  var currentMonth = currentDate.getMonth();
  var today = currentDate.getDate();

  var nextRenewalDate = new Date();
  nextRenewalDate.setMonth(currentMonth + 1, 1);

  var nextRenewalYear = nextRenewalDate.getFullYear();
  var nextRenewalMonth = nextRenewalDate.getMonth();

  if(today > 15){
    var formattedNextRenewalDate = nextRenewalYear + ' / ' + (nextRenewalMonth + 1) + ' / ' + '15';
  }else{
    var formattedNextRenewalDate = nextRenewalYear + ' / ' + (nextRenewalMonth) + ' / ' + '15';
  }

  dueDateEl.textContent = formattedNextRenewalDate;
}

calculateDueDate(dueDateEl);

function calculateMonthlyPayment(amountEl, timePeriodEl, paymentEl) {
  var amount = parseInt(amountEl.textContent);
  var timePeriod = parseInt(timePeriodEl.textContent);

  var fullPayment;
  var monthlyPayment;

  if (timePeriod === 12) {
    fullPayment = (amount * 105) / 100;
    monthlyPayment = fullPayment / 12;
  } else if (timePeriod === 24) {
    fullPayment = (amount * 108) / 100;
    monthlyPayment = fullPayment / 24;
  } else if (timePeriod >= 36 && timePeriod <= 60) {
    fullPayment = (amount * 110) / 100;
    monthlyPayment = fullPayment / timePeriod;
  }

  paymentEl.textContent = monthlyPayment.toFixed(2);
}

calculateMonthlyPayment(amountEl, timePeriodEl, paymentEl);