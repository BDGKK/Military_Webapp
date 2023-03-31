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

const domain = window.location.origin;

const hasLettersOnly = (value) => {
	return /^[a-z]+$/i.test(value);
}
const hasNumbersOnly = (value) => {
	return /^[0-9]+$/i.test(value);
}
const hasEmailFormat = (value) => {
	return /^[^\s@]+@gmail\.com$/i.test(value);
}

const getGender = () => {
	return genderMale.checked ? 'male' : genderFemale.checked ? 'female' : 'invalid';
}
const getForce = () => {
	const isArmy = armyRadio.checked && !navyRadio.checked && !airForceRadio.checked;
	const isNavy = !armyRadio.checked && navyRadio.checked && !airForceRadio.checked;
	const isAirForce = !armyRadio.checked && !navyRadio.checked && airForceRadio.checked;
	
	return isArmy ? "F001" : isNavy ? "F002" : isAirForce ? "F003" : "invalid";
}

const removeSpaces = (value) => {
	return value.replaceAll(" ", "");
}

armyRadio.addEventListener('click', () => {
	const usersForce = getForce();

	fetch(`${domain}/registration/columnData`)
	.then(res => res.json())
	.then(data => {
		regimentInput.innerHTML = data.regiments.map((item) => {
			if (item.forceID === usersForce) {
				return `<option value=${item.id}>${item.name}</option>`;
			}
		});
		rankInput.innerHTML = data.ranks.map((item) => {
			if (item.forceID === usersForce) {
				return `<option value="${item.id}">${item.name}</option>`;
			}
		});
	});
});
navyRadio.addEventListener('click', () => {
	const usersForce = getForce();

	fetch(`${domain}/registration/columnData`)
	.then(res => res.json())
	.then(data => {
		regimentInput.innerHTML = data.regiments.map((item) => {
			if (item.forceID === usersForce) {
				return `<option value=${item.id}>${item.name}</option>`;
			}
		});
		rankInput.innerHTML = data.ranks.map((item) => {
			if (item.forceID === usersForce) {
				return `<option value="${item.id}">${item.name}</option>`;
			}
		});
	});
});
airForceRadio.addEventListener('click', () => {
	const usersForce = getForce();

	fetch(`${domain}/registration/columnData`)
	.then(res => res.json())
	.then(data => {
		regimentInput.innerHTML = data.regiments.map((item) => {
			if (item.forceID === usersForce) {
				return `<option value=${item.id}>${item.name}</option>`;
			}
		});
		rankInput.innerHTML = data.ranks.map((item) => {
			if (item.forceID === usersForce) {
				return `<option value="${item.id}">${item.name}</option>`;
			}
		});
	});
});

fetch(`${domain}/registration/columnData`)
.then(res => res.json())
.then(data => {
	const citiesHTML = data.SLCities.map((item) => `<option value="${item}">${item}</option>`);
	const provincesHTML = data.SLProvinces.map((item) => `<option value="${item}">${item}</option>`);

	permanentCityInput.innerHTML += citiesHTML;
	tempCityInput.innerHTML += citiesHTML;
	permanentProvinceInput.innerHTML += provincesHTML;
	tempProvinceInput.innerHTML += provincesHTML;
});

const isFirstNameValid = () => {
	const firstName = firstNameInput.value.trim()

	if (firstName === "") {
		alert("Please fill in your first name");
		return false;
	} else if (!hasLettersOnly(firstName)) {
		alert("Please enter letters only in your first name");
		return false;
	}

	return true;
}
const isLastNameValid = () => {
	const lastName = lastNameInput.value.trim()

	if (lastName === "") {
		alert("Please fill in your last name");
		return false;
	} else if (!hasLettersOnly(lastName)) {
		alert("Please enter letters only in your last name");
		return false;
	}

	return true;
}
const isGenderValid = () => {
	if (getGender() === 'invalid') {
		alert("Please select your gender");
		return false;
	}
	return true;
}
const isPermaStreetAddressValid = () => {
	if (permanentStreetInput.value.trim() === "") {
		alert("Please fill in your permanent street address");
		return false;
	}
	return true;
}
const isPermaCityValid = () => {
	if (permanentCityInput.value === "") {
		alert("Please select in your permanent city");
		return false;
	}
	return true;
}
const isPermaProvinceValid = () => {
	if (permanentProvinceInput.value === "") {
		alert("Please select in your permanent province");
		return false;
	}
	return true;
}
const isPermaPostCodeValid = () => {
	const permanentPostCode = removeSpaces(permanentPostCodeInput.value);

	if (permanentPostCode === "") {
		alert("Please fill in your permanent postal code");
		return false;
	} else if (!hasNumbersOnly(permanentPostCode)) {
		alert("Please enter numbers only in your permanent postal code");
		return false;
	}

	return true;
}
const isTempStreetAddressValid = () => {
	if (tempStreetInput.value.trim() === "") {
		alert("Please fill in your temporary street address");
		return false;
	}
	return true;
}
const isTempCityValid = () => {
	if (tempCityInput.value === "") {
		alert("Please select in your temporary city");
		return false;
	}
	return true;
}
const isTempProvinceValid = () => {
	if (tempProvinceInput.value === "") {
		alert("Please select in your temporary province");
		return false;
	}
	return true;
}
const isTempPostCodeValid = () => {
	const temporaryPostCode = removeSpaces(tempPostCodeInput.value);

	if (temporaryPostCode === "") {
		alert("Please fill in your temporary postal code");
		return false;
	} else if (!hasNumbersOnly(temporaryPostCode)) {
		alert("Please enter numbers only in your temporary postal code");
		return false;
	}

	return true;
}
const isDobValid = () => {
	if (dobInput.value.trim() === "") {
		alert("Please select your date of birth");
		return false;
	}
	return true;
}
const isMobileNumValid = () => {
	const mobileNum = removeSpaces(mobileNumberInput.value);

	if (mobileNum === "") {
		alert("Please fill in your mobile number");
		return false;
	} else if (!hasNumbersOnly(mobileNum) || mobileNum.length !== 10) {
		alert("Please enter only a 10-digit number for your mobile number");
		return false;
	}

	return true;
}
const isLandNumValid = () => {
	const landNum = removeSpaces(landNumberInput.value);

	if (landNum === "") {
		alert("Please fill in your land number");
		return false;
	} else if (!hasNumbersOnly(landNum) || landNum.length !== 10) {
		alert("Please enter only a 10-digit number for your land number");
		return false;
	}

	return true;
}
const isNICValid = () => {
	if (removeSpaces(NICInput.value) === "") {
		alert("Please fill in your NIC number");
		return false;
	}
	return true;
}
const isEmailValid = () => {
	const email = removeSpaces(emailAddrInput.value);

	if (email === "") {
		alert("Please fill in your email address");
		return false;
	} else if (!hasEmailFormat(email)) {
		alert("Please enter email address in 'someone@gmail.com' format");
		return false;
	}

	return true;
}
const isPasswordValid = () => {
	const password = removeSpaces(passwordInput.value);

	if (password === "") {
		alert("Please fill in your desired password");
		return false;
	} else if (password.length < 4) {
		alert("Password must have more than 4 characters");
		return false;
	}

	return true;
}
const isConfirmedPasswordValid = () => {
	const password = removeSpaces(passwordInput.value);
	const confirmedPassword = removeSpaces(confirmedPasswordInput.value);

	if (confirmedPassword === "") {
		alert("Please fill your confirming password");
		return false;
	} else if (password !== confirmedPassword) {
		alert("Passwords do not match!");
		return false;
	}

	return true;
}
const isForceValid = () => {
	if (getForce() === 'invalid') {
		alert("Please select your force");
		return false;
	}
	return true;
}
const isRegimentValid = () => {
	if (regimentInput.value === "" || regimentInput.value === undefined) {
		alert("Please select your regiment");
		return false;
	}
	return true;
}
const isRankValid = () => {
	if (rankInput.value === ""|| rankInput.value === undefined) {
		alert("Please select your rank");
		return false;
	}
	return true;
}
const isSoldierNumValid = () => {
	if (removeSpaces(soldierNoInput.value) === "") {
		alert("Please enter your solider number");
		return false;
	}
	return true;
}
const isSalaryValid = () => {
	const salary = removeSpaces(salaryInput.value);

	if (salary === "") {
		alert("Please enter your salary");
		return false;
	} else if (!hasNumbersOnly(salary)) {
		alert("Please enter numbers only for your salary");
		return false;
	}

	return true;
}
const isRecruitedDateValid = () => {
	if (recruitedDateInput.value.trim() === "") {
		alert("Please select your recruited date");
		return false;
	}
	return true;
}
const isYearsOfServiceValid = () => {
	const yearsOfService = removeSpaces(yearsOfServiceInput.value);

	if (yearsOfService === "") {
		alert("Please enter your years of military service");
		return false;
	} else if (!hasNumbersOnly(yearsOfService)) {
		alert("Please enter numbers only for your years of military service");
		return false;
	}

	return true;
}
const isRetiredDateValid = () => {
	if (retiredDateInput.value.trim() === "") {
		alert("Please select your retired date");
		return false;
	}
	return true;
}

const validateInputs = [
	isFirstNameValid, isLastNameValid,
	isGenderValid, isPermaStreetAddressValid,
	isPermaPostCodeValid, isTempStreetAddressValid,
	isTempPostCodeValid, isDobValid,
	isMobileNumValid, isLandNumValid,
	isNICValid, isEmailValid,
	isPasswordValid, isConfirmedPasswordValid,
	isForceValid, isSoldierNumValid,
	isSalaryValid, isRecruitedDateValid,
	isYearsOfServiceValid, isRetiredDateValid
];

const isDataValid = (index) => {
	// Change the index to match with the correct function in the array
	if (index >= 3) index--;
	if (index >= 4) {
		isPermaCityValid();
		isPermaProvinceValid();
	}
	if (index >= 6) {
		isTempCityValid();
		isTempProvinceValid();
	}
	if (index === 15) index--;
	if (index >= 16) index -= 2;
	if (index >= 18) {
		isRegimentValid();
		isRankValid();
	}
	for (let i = 0; i < index; i++) {
		if(!validateInputs[i]()) return false;
	}
	return true;
}

document.querySelectorAll('input').forEach((item, index) =>
	item.addEventListener('focus', () => {
		// Remove 'focus' event from the element - chrome has issue that focus is kept even after the alert
		if (!isDataValid(index)) {
			item.blur();
		}
	})
);

const getRegistryData = () => {
	return {
		firstName: firstNameInput.value.trim(),
		lastName: lastNameInput.value.trim(),
		gender: getGender(),
		permanentAddress: {
			streetAddress: permanentStreetInput.value.trim(),
			city: permanentCityInput.value,
			province: permanentProvinceInput.value,
			postCode: removeSpaces(permanentPostCodeInput.value)
		},
		temporaryAddress: {
			streetAddress: tempStreetInput.value.trim(),
			city: tempCityInput.value,
			province: tempProvinceInput.value,
			postCode: removeSpaces(tempPostCodeInput.value)
		},
		dateOfBirth: dobInput.value.trim(),
		mobileNumber: removeSpaces(mobileNumberInput.value),
		landNumber: removeSpaces(landNumberInput.value),
		NIC: removeSpaces(NICInput.value),
		emailAddr: removeSpaces(emailAddrInput.value),
		password: removeSpaces(passwordInput.value),
		soldierNumber: removeSpaces(soldierNoInput.value),
		salary: parseFloat(salaryInput.value),
		recruitedDate: recruitedDateInput.value.trim(),
		yearsOfService: parseInt(yearsOfServiceInput.value),
		retiredDate: retiredDateInput.value.trim(),
		rankID: rankInput.value,
		regimentID: regimentInput.value
	};
}

const submit = async() => {
	if(!isDataValid(20)) return;

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
		const responseData = await response.json();
        alert(responseData.message);
	}
}