const firstNameInput 	= document.getElementById("first-name-input");
const lastNameInput 	= document.getElementById("last-name-input");
const genderMale 		= document.getElementById("radio-male");
const genderFemale 		= document.getElementById("radio-female");
const dobInput 			= document.getElementById("dob");
const mobileNumberInput	= document.getElementById("mobile-number");
const landNumberInput 	= document.getElementById("land-number");
const NICInput 			= document.getElementById("NIC");
const emailAddrInput 	= document.getElementById("email-address");

const armyRadio	 	= document.getElementById("army-radio");
const navyRadio 	= document.getElementById("navy-radio");
const airForceRadio = document.getElementById("air-force-radio");

const regimentInput 		= document.getElementById("regiment");
const rankInput				= document.getElementById("rank");
const soldierNoInput 		= document.getElementById("soldier-number");
const salaryInput 			= document.getElementById("salary");
const recruitedDateInput 	= document.getElementById("recruited-date");
const yearsOfServiceInput 	= document.getElementById("years-of-service");
const retiredDateInput 		= document.getElementById("retired-date");

const passwordInput 			= document.getElementById("password");
const confirmedPasswordInput 	= document.getElementById("confirmed-password");

const permanentStreetInput 		= document.getElementById("permanent-street-addr");
const permanentCityInput 		= document.getElementById("permanent-city-addr");
const permanentProvinceInput 	= document.getElementById("permanent-province-addr");
const permanentPostCodeInput 	= document.getElementById("permanent-post-code");

const tempStreetInput 		= document.getElementById("temp-street-addr");
const tempCityInput 		= document.getElementById("temp-city-addr");
const tempProvinceInput 	= document.getElementById("temp-province-addr");
const tempPostCodeInput 	= document.getElementById("temp-post-code");

const lettersOnlyRegex = /^[a-z]+$/i;
const numbersOnlyRegex = /^[0-9]+$/i;
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const domain = window.location.origin;

// Use google maps api on personal server to get SL cities & provinces
// Use server-side caching to reduce number of api requests
// Remove when using Maps API
const cities = ['AA', 'BB', 'CC'];
const provinces = ['North', 'West', 'South', 'East'];
const citiesHTML = cities.map((item) => `<option value="${item}">${item}</option>`);
const provincesHTML = provinces.map((item) => `<option value="${item}">${item}</option>`);

// Add regiments and ranks in this array
const regiments = ['Reg1', 'Reg2', 'Reg3'];
const ranks = ['Rank1', 'Rank2', 'Rank3'];

const validateFullName = () => {
	return lettersOnlyRegex.test(firstNameInput.value) && lettersOnlyRegex.test(lastNameInput.value);
}

const getGender = () => {
	return genderMale.checked ? 'male' : genderFemale.checked ? 'female' : 'invalid';
}

permanentCityInput.innerHTML += citiesHTML;
tempCityInput.innerHTML += citiesHTML;
permanentProvinceInput.innerHTML += provincesHTML;
tempProvinceInput.innerHTML += provincesHTML;

const validatePostalCode = () => {
	return numbersOnlyRegex.test(permanentPostCodeInput.value) && numbersOnlyRegex.test(tempPostCodeInput.value);
}

const validatePhoneNumbers = () => {
	const mobileNumber = mobileNumberInput.value;
	const landNumber = landNumberInput.value;
	if (mobileNumber.length != 10 || landNumber.length != 10) return false;
	return numbersOnlyRegex.test(mobileNumber) && numbersOnlyRegex.test(landNumber);
}

const validateEmail = () => {
	return emailRegex.test(emailAddrInput.value);
}

const getForce = () => {
	const isArmy =
		armyRadio.checked &&
		!navyRadio.checked &&
		!airForceRadio.checked;

	const isNavy =
		!armyRadio.checked &&
		navyRadio.checked &&
		!airForceRadio.checked;
	
	const isAirForce =
		!armyRadio.checked &&
		!navyRadio.checked &&
		airForceRadio.checked;
	
	return isArmy ? "army" : isNavy ? "navy" : isAirForce ? "air force" : "invalid";
}

regimentInput.innerHTML += regiments.map((item) => {
	return `<option value="${item}">${item}</option>`;
});
rankInput.innerHTML += ranks.map((item) => {
	return `<option value="${item}">${item}</option>`;
});

const validateSalary = () => {
	return numbersOnlyRegex.test(salaryInput.value);
}

const validateYearsOfService = () => {
	return numbersOnlyRegex.test(yearsOfServiceInput.value);
}

const isDataValid = () => {
	if (firstNameInput.value === "" || lastNameInput.value === "") {
		alert("Please fill in your full name");
		return false;
	} else if (!validateFullName()) {
		alert("Please enter letters only in your full name");
		return false;
	}

	if (getGender() === 'invalid') {
		alert("Please select your gender");
		return false;
	}

	const isPermanentAddressFilled = 
		permanentStreetInput.value !== "" && permanentCityInput.value !== "" &&
		permanentProvinceInput.value !== "" && permanentPostCodeInput.value !== "";
	
	const isTempAddressFilled =
		tempStreetInput.value !== "" && tempCityInput.value !== "" &&
		tempProvinceInput.value !== "" && tempPostCodeInput.value !== "";
	
	if (!isPermanentAddressFilled) {
		alert("Please fill in your permanent address");
		return false;
	}
	if (!isTempAddressFilled) {
		alert("Please fill in your temporary address");
		return false;
	}
	if (!validatePostalCode()) {
		alert("Please enter numbers only for your postal code");
		return false;
	}

	if (dobInput.value === "") {
		alert("Please select your date of birth");
		return false;
	}
	
	if (mobileNumberInput.value === "" || landNumberInput.value === "") {
		alert("Please fill in your mobile and land numbers");
		return false;
	} else if (!validatePhoneNumbers()) {
		alert("Please enter only a 10-digit number for your mobile and land number");
		return false;
	}

	if (NICInput.value === "") {
		alert("Please fill in your NIC number");
		return false;
	}

	if (emailAddrInput.value === "") {
		alert("Please fill in your email address");
		return false;
	} else if (!validateEmail()) {
		alert("Please enter email address in 'someone@example.com' format");
		return false;
	}

	if (passwordInput.value === "" || confirmedPasswordInput.value === "") {
		alert("Please enter your desired password and confirm it");
		return false;
	} else if (passwordInput.value.length < 4) {
		alert("Password must have more than 4 characters");
		return false;
	} else if (passwordInput.value !== confirmedPasswordInput.value) {
		alert("Please ensure you entered the correct password in both fields");
		return false;
	}

	if (getForce() === 'invalid') {
		alert("Please select your force");
		return false;
	}

	if (regimentInput.value === "") {
		alert("Please select your regiment");
		return false;
	}
	if (rankInput.value === "") {
		alert("Please select your rank");
		return false;
	}
	if (soldierNoInput.value === "") {
		alert("Please enter your solider number");
		return false;
	}

	if (salaryInput.value === "") {
		alert("Please enter your salary");
		return false;
	} else if (!validateSalary()) {
		alert("Please enter numbers only for your salary");
		return false;
	}

	if (recruitedDateInput.value === "") {
		alert("Please select your recruited date");
		return false;
	}
	if (yearsOfServiceInput.value === "") {
		alert("Please enter your years of military service");
		return false;
	} else if (!validateYearsOfService()) {
		alert("Please enter numbers only for your years of military service");
		return false;
	}
	if (retiredDateInput.value === "") {
		alert("Please select your retired date");
		return false;
	}
	return true;
}

const getRegistryData = () => {
	return {
		firstName: firstNameInput.value,
		lastName: lastNameInput.value,
		gender: getGender(),
		permanentAddress: {
			streetAddress: permanentStreetInput.value,
			city: permanentCityInput.value,
			province: permanentProvinceInput.value,
			postCode: permanentPostCodeInput.value
		},
		temporaryAddress: {
			streetAddress: tempStreetInput.value,
			city: tempCityInput.value,
			province: tempProvinceInput.value,
			postCode: tempPostCodeInput.value
		},
		dateOfBirth: dobInput.value,
		mobileNumber: mobileNumberInput.value,
		landNumber: landNumberInput.value,
		NIC: NICInput.value,
		emailAddr: emailAddrInput.value,
		password: passwordInput.value,
		force: getForce(),
		regiment: regimentInput.value,
		rank: rankInput.value,
		soldierNumber: soldierNoInput.value,
		salary: parseFloat(salaryInput.value),
		recruitedDate: recruitedDateInput.value,
		yearsOfService: parseInt(yearsOfServiceInput.value),
		retiredDate: retiredDateInput.value
	};
}

const submit = async() => {
	if (!isDataValid()) return;
	const registryData = getRegistryData();

	const response = await fetch(`${domain}/registration/registryData`, {
		method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({registryData})
	});

	if (response.ok) {
		const userId = await response.json();
		window.location.href = `${domain}/profile?userid=${userId.userId}`;
	} else {
		alert("Submission Failed");
	}
}