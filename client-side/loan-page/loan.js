const userIdEl = document.getElementById("uid")
const userNameEl = document.getElementById("Uname");
const loanPurposeCheck1El = document.getElementById("check1");
const loanPurposeCheck2El = document.getElementById("check2");
const loanPurposeCheck3El = document.getElementById("check3");
const sourceOfIncomeYesCheckEl = document.getElementById("yes-checkbox");
const sourceOfIncomeNoCheckEl = document.getElementById("no-checkbox");
const sourceOfIncomePensionCheckEl = document.getElementById("pension-checkbox");
const sourceOfIncomeSavingsCheckEl = document.getElementById("savings-checkbox");
const sourceOfIncomeJobCheckEl = document.getElementById("job-checkbox");
const loanAmountEl = document.getElementById("quantity");
const interestRate12MonthsCheckEl = document.getElementById("12_months");
const interestRate24MonthsCheckEl = document.getElementById("24_months");
const interestRate36MonthsCheckEl = document.getElementById("36_months");
const interestRateHigherCheckEl = document.getElementById("above");
const incomeEvidenceEl = document.getElementById("evidence");
const patronNameEl = document.getElementById("gname");
const patronNICEl = document.getElementById("NIC");
const patronIncomeEvidenceEl = document.getElementById("parton_evi");

const domain = window.location.origin;
document.querySelector('head').innerHTML += `<link rel="icon" type="image/x-icon" href="${domain}/logo.png">`;

const hasNumbersOnly = (value) => {
    return /^[0-9]+$/i.test(value);
}
const isADocument = (value) => {
    return /(\.pdf|\.docx?)/i.test(value);
}

const getLoanPurpose = () => {
    const isPersonalLoan =
        loanPurposeCheck1El.checked &&
        !loanPurposeCheck2El.checked &&
        !loanPurposeCheck3El.checked;

    const isHouseLoan =
        !loanPurposeCheck1El.checked &&
        loanPurposeCheck2El.checked &&
        !loanPurposeCheck3El.checked;

    const ishouseLoan =
        !loanPurposeCheck1El.checked &&
        !loanPurposeCheck2El.checked &&
        loanPurposeCheck3El.checked;

    return isPersonalLoan ? 'personal loan' : isHouseLoan ?
        'house loan' : ishouseLoan ? 'house loan' : 'invalid';
}
const getHasSourceOfIncome = () => {
    const yes = sourceOfIncomeYesCheckEl.checked && !sourceOfIncomeNoCheckEl.checked;
    const no = !sourceOfIncomeYesCheckEl.checked && sourceOfIncomeNoCheckEl.checked;
    return yes ? 'yes' : no ? 'no' : 'invalid';
}
const getSourceOfIncome = () => {
    const pension =
        sourceOfIncomePensionCheckEl.checked &&
        !sourceOfIncomeSavingsCheckEl.checked &&
        !sourceOfIncomeJobCheckEl.checked;

    const savings =
        !sourceOfIncomePensionCheckEl.checked &&
        sourceOfIncomeSavingsCheckEl.checked &&
        !sourceOfIncomeJobCheckEl.checked;

    const job =
        !sourceOfIncomePensionCheckEl.checked &&
        !sourceOfIncomeSavingsCheckEl.checked &&
        sourceOfIncomeJobCheckEl.checked;

    return pension ? 'pension' : savings ? 'savings' : job ? 'job' : 'invalid';
}
const getInterestRateForTimePeriod = () => {
    const months12 =
        interestRate12MonthsCheckEl.checked &&
        !interestRate24MonthsCheckEl.checked &&
        !interestRate36MonthsCheckEl.checked &&
        interestRateHigherCheckEl.value.trim() === "";
    const months24 =
        !interestRate12MonthsCheckEl.checked &&
        interestRate24MonthsCheckEl.checked &&
        !interestRate36MonthsCheckEl.checked &&
        interestRateHigherCheckEl.value.trim() === "";
    const months36 =
        !interestRate12MonthsCheckEl.checked &&
        !interestRate24MonthsCheckEl.checked &&
        interestRate36MonthsCheckEl.checked &&
        interestRateHigherCheckEl.value.trim() === "";
    const monthsAbove =
        !interestRate12MonthsCheckEl.checked &&
        !interestRate24MonthsCheckEl.checked &&
        !interestRate36MonthsCheckEl.checked &&
        interestRateHigherCheckEl.value.trim() !== "";

    return months12 ? '12 months' : months24 ? '24 months' : months36 ? '36 months'
        : monthsAbove ? 'above 5 years' : 'invalid';
}

const isUIDValid = () => {
    const userId = userIdEl.value;
    if (userId.trim() === "") {
        alert("Please enter your user ID");
        return false;
    } else if (!hasNumbersOnly(userId)) {
        alert("Please enter only numbers for your user ID");
        return false;
    }
    return true;
}
const isUserNameValid = () => {
    if (userNameEl.value.trim() === "") {
        alert("Please enter user name");
        return false;
    }
    return true;
}
const isLoanPurposeCheckValid = () => {
    if (getLoanPurpose() === 'invalid') {
        alert("Please select your reason for applying a loan");
        return false;
    }
    return true;
}
const isHasSourceOfIncomeValid = () => {
    if (getHasSourceOfIncome() === 'invalid') {
        alert("Please select whether you have a source of income to pay back or not");
        return false;
    }
    return true;
}
const isSourceOfIncomeValid = () => {
    if (getSourceOfIncome() === 'invalid') {
        alert("Please select your source of income");
        return false;
    }
    return true;
}
const isLoanAmountValid = () => {
    const loanAmount = loanAmountEl.value;
    if (loanAmount.trim() === "") {
        alert("Please enter your loan amount");
        return false;
    } else if (!hasNumbersOnly(loanAmount)) {
        alert("Please enter numbers only for your loan amount");
        return false;
    }
    return true;
}
const isInterestRateForTimePeriodValid = () => {
    if (getInterestRateForTimePeriod() === "invalid") {
        alert("Please select your interest rate for time period");
        return false;
    }
    return true;
}
const isIncomeEvidenceValid = () => {
    const incomeEvidence = incomeEvidenceEl.value;

    if (incomeEvidence.trim() === "") {
        alert("Please upload your income evidence");
        return false;
    } else if (!isADocument(incomeEvidence)) {
        alert("Please upload a pdf or a word document");
        return false;
    }
    return true;
}
const isPatronNameValid = () => {
    if (patronNameEl.value.trim() === "") {
        alert("Please recommend a patron name for your loan");
        return false;
    }
    return true;
}
const isPatronNICValid = () => {
    if (patronNICEl.value.trim() === "") {
        alert("Please enter the patron NIC");
        return false;
    }
    return true;
}
const isPatronIncomeEvidenceValid = () => {
    const incomeEvidence = patronIncomeEvidenceEl.value;

    if (incomeEvidence.trim() === "") {
        alert("Please upload your patron income evidence");
        return false;
    } else if (!isADocument(incomeEvidence)) {
        alert("Please upload a pdf or a word document");
        return false;
    }
    return true;
}

const validateInputs = [
    isUIDValid, isUserNameValid, isLoanPurposeCheckValid,
    isHasSourceOfIncomeValid, isSourceOfIncomeValid, isLoanAmountValid,
    isInterestRateForTimePeriodValid, isIncomeEvidenceValid,
    isPatronNameValid, isPatronNICValid, isPatronIncomeEvidenceValid
];
const isDataValid = (index) => {
    // Change the index to match with the correct function in the array
    if (index === 3) index--;
    if (index >= 4) index -= 2;
    if (index > 3) index--;
    if (index === 5) index--;
    if (index >= 6) index -= 2;
    for (let i = 0; i < 3; i++) {
        if (index > 6) index--;
    }

    for (let i = 0; i < index; i++) {
        if (!validateInputs[i]()) return false;
    }
    return true;
}
document.querySelectorAll('input').forEach((item, index) => {
    item.addEventListener('focus', () => {
        if (!isDataValid(index)) item.blur();
    });
});

function calculateDueDate() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let today = currentDate.getDate();

    let nextRenewalDate = new Date();
    nextRenewalDate.setMonth(currentMonth + 1, 1);

    let nextRenewalYear = nextRenewalDate.getFullYear();
    let nextRenewalMonth = (nextRenewalDate.getMonth() + (today > 15 ? 2 : 1) ).toString().padStart(2, '0');
    let formattedNextRenewalDate = nextRenewalYear + '/' + (nextRenewalMonth) + '/' + '15';

    return formattedNextRenewalDate;
}
function calculateMonthlyPayment(amount, timePeriod) {
    let fullPayment;

    if (timePeriod === 12) {
        fullPayment = (amount * 105) / 100;

    } else if (timePeriod === 24) {
        fullPayment = (amount * 108) / 100;

    } else if (timePeriod > 35 && timePeriod < 61) {
        fullPayment = (amount * 110) / 100;
    }

    const monthlyPayment = fullPayment / timePeriod;
    return monthlyPayment.toFixed(2);
}

document.querySelector('button').addEventListener('click', async () => {
    if (!isDataValid(19)) { return; }

    const amount = loanAmountEl.value;

    let interestRate = getInterestRateForTimePeriod();
    interestRate = (interestRate === '12 months') ? 5 : (interestRate === '24 months') ? 8 : (interestRate === '36 months') ? 10 : 12;

    let timePeriod = getInterestRateForTimePeriod();
    timePeriod = (timePeriod === '12 months') ? 12 : (timePeriod === '24 months') ? 24 : (timePeriod === '36 months') ? 36 :
        parseInt(interestRateHigherCheckEl.value);

    const partonName = patronNameEl.value;

    const loanInfo = {
        amount,
        interestRate,
        timePeriod,
        partonName
    }
    const response = await fetch(`${domain}/loan/loanInfo`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loanInfo)
    });

    if (!response.ok) {
        alert("Failed to submit the form");
        return;
    }

    // Submit the loan document
    const formData = new FormData();
    const file = incomeEvidenceEl.files[0];
    formData.append('myFile', file);

    const fileUploadResponse = await fetch(`${domain}/loan/uploadDocument`, {
        method: 'POST',
        body: formData
    });

    if (fileUploadResponse.ok) {
        localStorage.setItem('reasonForLoan', getLoanPurpose());
        localStorage.setItem('typeOfLoan', getSourceOfIncome());
        localStorage.setItem('loanAmount', amount);
        localStorage.setItem('timePeriod', timePeriod);
        localStorage.setItem('monthlyPayment', calculateMonthlyPayment(amount, timePeriod));
        localStorage.setItem('dueDate', calculateDueDate());
        localStorage.setItem('partonName', partonName);
        localStorage.setItem('partonNIC', patronNICEl.value);
    
        window.location.href = `${domain}/loan-calculated`;
    } else {
        alert("Could not submit successfully");
    }
});