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
const passwordEl        = document.getElementById("password");
const forceEl           = document.getElementById("force");
const regimentEl        = document.getElementById("regiment");
const rankEl            = document.getElementById("rank");
const solidierNumEl     = document.getElementById("solidier-no");
const salaryEl          = document.getElementById("salary");
const recruitedDateEl   = document.getElementById("recruited-date");
const yearsOfServiceEl  = document.getElementById("years-of-service");
const retiredDateEl     = document.getElementById("retired-date");

const getUserDetails = async() => {
  const domain = window.location.origin;
  const url = new URLSearchParams(window.location.search);
  const uid = url.get('userid');

  const rawData = await fetch(`${domain}/profile/${uid}`);
  return await rawData.json();
}

const renderPage = async() => {
  const rawData = await getUserDetails();
  const registryData = rawData.registryData;

  userIDEl.innerHTML    = registryData.userId;
  fullNameEl.innerHTML  = `${registryData.firstName} ${registryData.lastName}`;
  genderEl.innerHTML    = registryData.gender;

  permanentAddrEl.innerHTML = `
    ${registryData.permanentAddress.streetAddress}<br>
    ${registryData.permanentAddress.city}<br>
    ${registryData.permanentAddress.province}<br>
    ${registryData.permanentAddress.postCode}`;
  tempAddrEl.innerHTML = `
    ${registryData.temporaryAddress.streetAddress}<br>
    ${registryData.temporaryAddress.city}<br>
    ${registryData.temporaryAddress.province}<br>
    ${registryData.temporaryAddress.postCode}`;

  dobEl.innerHTML             = registryData.dateOfBirth;
  mobileTelEl.innerHTML       = registryData.mobileNumber;
  landTelEl.innerHTML         = registryData.landNumber;
  nicEl.innerHTML             = registryData.NIC;
  emailAddrEl.innerHTML       = registryData.emailAddr;
  passwordEl.innerHTML        = registryData.password;
  forceEl.innerHTML           = registryData.force;
  regimentEl.innerHTML        = registryData.regiment;
  rankEl.innerHTML            = registryData.rank;
  solidierNumEl.innerHTML     = registryData.soldierNumber;
  salaryEl.innerHTML          = registryData.salary;
  recruitedDateEl.innerHTML   = registryData.recruitedDate;
  yearsOfServiceEl.innerHTML  = registryData.yearsOfService;
  retiredDateEl.innerHTML     = registryData.retiredDate;

  // Increased line height for address values
  permanentAddrEl.style.lineHeight = '1.4em';
  tempAddrEl.style.lineHeight = '1.4em';
}

renderPage();