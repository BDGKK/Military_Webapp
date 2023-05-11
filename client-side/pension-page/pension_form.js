const unid = document.getElementById("uid")
const email = document.getElementById("email")
const yes = document.getElementById("radio-yes")
const no = document.getElementById("radio-no")
const rank = document.getElementById("rank")
const service = document.getElementById("years")
const quantity = document.getElementById("quantity")
const fileInput = document.getElementById("myFileInput")
const text = document.getElementById("comment")
const gname = document.getElementById("gname")
const grelation = document.getElementById("grelationship")

const domain = window.location.origin;

function checkblank(){
	if(email.value == ""){
        alert('please enter email');
        return false;
    }

	if(rank.value == ""){
        alert('please enter rank');
        return false;
    }

	if(text.value == ""){
        alert('please enter a comment');
        return false;
    }
    if(gname.value == ""){
        alert('please enter a granter name');
        return false;
    }

    if(grelation.value == ""){
        alert('please enter a granter relation')
        return false;
    }

    const extension = fileInput.files[0].name.split('.').at(-1);
    if (extension !== 'docx' && extension !== 'doc' && extension !== 'pdf') {
        alert('Please upload DOCX, DOC or PDF files only');
        return false;
    }
    return true;
}
function checknumber(inputText){
    if(/^\d+$/.test(inputText)){
        return true;
    } else {
        alert('please enter number');
        return false;
    }
}
function calculateRenewalDate() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let nextRenewalDate = new Date();
  
    nextRenewalDate.setMonth(currentMonth + 1, 1);
    let nextRenewalYear = nextRenewalDate.getFullYear();
    let nextRenewalMonth = (nextRenewalDate.getMonth() + 1).toString().padStart(2, '0');
    let formattedNextRenewalDate = nextRenewalYear + '/' + (nextRenewalMonth) + '/' + '01';
  
    return formattedNextRenewalDate;
}
function calculateMonthlyPayment() {
    let yearsOfService = parseInt(service.value);
    let salary = parseInt(quantity.value);

    return yearsOfService > 22 ? (salary * 90) / 100 : 0;
}

const submitPension = async() => {
    if (!checkblank() || !checknumber(service.value)) {
        return;
    }

    const renewalDate = calculateRenewalDate();
    const monthlyPayment = calculateMonthlyPayment();

    const pensionInfo = {
        totalAmount: monthlyPayment,
        renewDate: renewalDate,
    }
    
    const infoResponse = await fetch(`${domain}/pension/pensionInfo`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(pensionInfo)
    });

    if (!infoResponse.ok) {
        alert("Failed to submit the form");
        return;
    }

    // Submit the pension document
    const formData = new FormData();
    const file = fileInput.files[0];
    formData.append('myFile', file);

    const fileUploadResponse = await fetch(`${domain}/pension/uploadDocument`, {
        method: 'POST',
        body: formData
    });

    if (fileUploadResponse.ok) {
        localStorage.setItem('disabilities', text.value);
        localStorage.setItem('granterName', gname.value);
        localStorage.setItem('granterRelationship', grelation.value);
        localStorage.setItem('renewalDate', renewalDate);
        localStorage.setItem('monthlyPayment', monthlyPayment);

        window.location.href = `${domain}/pension-calculated`;
    } else {
        alert("Could not submit successfully");
    }
}