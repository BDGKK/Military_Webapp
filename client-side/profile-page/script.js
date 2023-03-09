const registryData = {
  userId: 123,
  firstName: "John",
  lastName: "Doe",
  gender: "male",
  permanentAddress: {
    streetAddress: "123 Main St",
    city: "Anytown",
    province: "Ontario",
    postCode: "A1B 2C3"
  },
  temporaryAddress: {
    streetAddress: "456 High St",
    city: "Anycity",
    province: "Ontario",
    postCode: "X1Y 2Z3"
  },
  dateOfBirth: "1990-01-01",
  mobileNumber: "123-456-7890",
  landNumber: "987-654-3210",
  NIC: "1234567890V",
  emailAddr: "johndoe@example.com",
  password: "mypassword",
  force: "Army",
  regiment: "1st Infantry Regiment",
  rank: "Sergeant",
  soldierNumber: "123456",
  salary: 50000.00,
  recruitedDate: "2010-01-01",
  yearsOfService: 12,
  retiredDate: "2030-01-01"
}

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

// Put user data from JSON object into HTML elements
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