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
        !interestRateHigherCheckEl.checked;
    const months24 = 
        !interestRate12MonthsCheckEl.checked &&
        interestRate24MonthsCheckEl.checked &&
        !interestRate36MonthsCheckEl.checked &&
        !interestRateHigherCheckEl.checked;
    const months36 = 
        !interestRate12MonthsCheckEl.checked &&
        !interestRate24MonthsCheckEl.checked &&
        interestRate36MonthsCheckEl.checked &&
        !interestRateHigherCheckEl.checked;
    const monthsAbove = 
        !interestRate12MonthsCheckEl.checked &&
        !interestRate24MonthsCheckEl.checked &&
        !interestRate36MonthsCheckEl.checked &&
        interestRateHigherCheckEl.checked;
    
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
        if(!validateInputs[i]()) return false;
    }
    return true;
}

document.querySelectorAll('input').forEach((item, index) => {
    item.addEventListener('focus', () => {
        isDataValid(index);
    })
});

document.querySelector('button').addEventListener('click', async() => {
    if (!isDataValid(19)) {
        console.log("Invalid");
        return;
    }

    // Replace these data with the real amount, interestRate, timePeriod, partonName and userId
    const loanInfo = {
        amount: 123,
        interestRate: 5,
        timePeriod: 12, // Put time period in either years or months (not both at once)
        partonName: 'Johnny',
        userId: '1'
    }

    const response = await fetch(`${domain}/loan/loanInfo`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(loanInfo)
    });

    if (response.ok) {
        alert("Successfully Submitted");
    }
});