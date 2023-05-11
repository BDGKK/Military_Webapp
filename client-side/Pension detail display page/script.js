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
  var currentDate = new Date();

  var currentMonth = currentDate.getMonth();

  var nextRenewalDate = new Date();
  nextRenewalDate.setMonth(currentMonth + 1, 1);

  var nextRenewalYear = nextRenewalDate.getFullYear();
  var nextRenewalMonth = nextRenewalDate.getMonth();

  var formattedNextRenewalDate = nextRenewalYear + ' / ' + (nextRenewalMonth + 1) + ' / ' + '01';

  renewDateEl.textContent = formattedNextRenewalDate;
}

calculateNextRenewalDate(renewDateEl);



function calculateMonthlyPayment(salaryEl, paymentEl, yearsOfServiceEl) {
  var yearsOfService = parseInt(yearsOfServiceEl);
  var salary = parseInt(salaryEl);

  if (yearsOfService > 22) {
     var monthlyPayment = (salary * 90) / 100;
  }
  paymentEl.textContent = monthlyPayment;
}

calculateMonthlyPayment(salaryEl, paymentEl, yearsOfServiceEl);
