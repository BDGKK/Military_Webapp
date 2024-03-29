const userIDEl          = document.getElementById('user-id');
const fullNameEl        = document.getElementById('full-name');
const genderEl          = document.getElementById("gender");
const permanentAddrEl   = document.getElementById("permanent-address");
const tempAddrEl        = document.getElementById("temp-address");
const dobEl             = document.getElementById("dob");
const mobileTelEl       = document.getElementById("mobile-tel");
const landTelEl         = document.getElementById("land-tel");
const nicEl             = document.getElementById("nic");
const emailAddrEl       = document.getElementById("email-addr");
const forceEl           = document.getElementById("force");
const regimentEl        = document.getElementById("regiment");
const rankEl            = document.getElementById("rank");
const solidierNumEl     = document.getElementById("solidier-no");
const salaryEl          = document.getElementById("salary");
const recruitedDateEl   = document.getElementById("recruited-date");
const yearsOfServiceEl  = document.getElementById("years-of-service");
const retiredDateEl     = document.getElementById("retired-date");

const domain = window.location.origin;

document.querySelector('head').innerHTML += `<link rel="icon" type="image/x-icon" href="${domain}/logo.png">`;

const getUserDetails = async() => {
  const rawData = await fetch('/profile/userData');
  return await rawData.json();
}

const getFormattedAddress = (addressString) => {
  return addressString.replaceAll(',', '<br>');
}
const getFormattedDate = (dateString) => {
  return dateString.slice(0, 10);
}

const renderPage = async() => {
  const rawData = await getUserDetails();

  // Alert user and send them back to their previous page if user not found
  if ('error' in rawData && rawData.error === 'User not found') {
    alert("User not Found");
    history.go(-1);
    return;
  }
  
  const {
    userId, firstName, lastName, gender,
    permanentAddress, permanentPostCode,
    temporaryAddress, temporaryPostCode,
    dateOfBirth, mobileNumber, landNumber,
    NIC, emailAddr, force, regiment, rank,
    soldierNumber, salary, recruitedDate,
    yearsOfService, retirement_date
  } = rawData;
  
  userIDEl.innerHTML    = userId;
  fullNameEl.innerHTML  = `${firstName} ${lastName}`;
  genderEl.innerHTML    = gender;

  permanentAddrEl.innerHTML = `
    ${getFormattedAddress(permanentAddress)}<br>
    ${permanentPostCode}`;
  tempAddrEl.innerHTML = `
    ${getFormattedAddress(temporaryAddress)}<br>
    ${temporaryPostCode}`;

  dobEl.innerHTML             = getFormattedDate(dateOfBirth);
  mobileTelEl.innerHTML       = mobileNumber;
  landTelEl.innerHTML         = landNumber;
  nicEl.innerHTML             = NIC;
  emailAddrEl.innerHTML       = emailAddr;
  forceEl.innerHTML           = force;
  regimentEl.innerHTML        = regiment;
  rankEl.innerHTML            = rank;
  solidierNumEl.innerHTML     = soldierNumber;
  salaryEl.innerHTML          = salary;
  recruitedDateEl.innerHTML   = getFormattedDate(recruitedDate);
  yearsOfServiceEl.innerHTML  = yearsOfService;
  retiredDateEl.innerHTML     = getFormattedDate(retirement_date);

  // Increased line height for address values
  permanentAddrEl.style.lineHeight = '1.4em';
  tempAddrEl.style.lineHeight = '1.4em';
}

renderPage();