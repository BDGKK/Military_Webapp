const userIDEl          = document.getElementById('user-id');
const emailAddrEl       = document.getElementById("email-addr");
const rankEl            = document.getElementById("rank");
const salaryEl          = document.getElementById("salary").getAttribute("data-value");
const yearsOfServiceEl  = document.getElementById("years").getAttribute("data-value");
const disabilities      = document.getElementById("disabilities");
const granterName       = document.getElementById("granter-name");
const granterRelation   = document.getElementById("granter-relation");
const renewDateEl       = document.getElementById("renew-date");
const paymentEl         = document.getElementById("payment");

function calculateNextRenewalDate(renewDateEl) {
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let nextRenewalDate = new Date();

  nextRenewalDate.setMonth(currentMonth + 1, 1);
  let nextRenewalYear = nextRenewalDate.getFullYear();
  let nextRenewalMonth = (nextRenewalDate.getMonth() + 1).toString().padStart(2, '0');
  let formattedNextRenewalDate = nextRenewalYear + ' / ' + (nextRenewalMonth) + ' / ' + '01';

  renewDateEl.textContent = formattedNextRenewalDate;
}

calculateNextRenewalDate(renewDateEl);

function calculateMonthlyPayment(salaryEl, paymentEl, yearsOfServiceEl) {
  let yearsOfService = parseInt(yearsOfServiceEl);
  let salary = parseInt(salaryEl);
  paymentEl.textContent = yearsOfService > 22 ? (salary * 90) / 100 : 0;
}

calculateMonthlyPayment(salaryEl, paymentEl, yearsOfServiceEl);
