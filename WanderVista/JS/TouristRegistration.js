console.log("TouristRegistration.js Connected");
function getValue(id) {
    return document.getElementById(id).value.trim();
}

function showError(id, message) {
    document.getElementById(id).textContent = message;
    return message === "";
}

function validatePhone(phone) {
    let digits = phone.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
}

function validateTouristForm() {

    let validName = showError("NameError",
        getValue("TouristName").length >= 2 ? "" : "Enter your full name.");

    let age = Number(getValue("TouristAge"));
    let validAge = showError("AgeError",
        age >= 1 && age <= 120 && Number.isInteger(age) ? "" : "Enter age from 1 to 120.");

    let validEmail = showError("EmailError",
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getValue("TouristEmail")) ? "" : "Enter a valid email.");

    let validPhone = showError("PhoneError",
        validatePhone(getValue("TouristPhone")) ? "" : "Enter a valid phone number.");

    let gender = document.querySelector('input[name="gender"]:checked');
    let validGender = showError("GenderError",
        gender ? "" : "Select your gender.");

    let validDestination = showError("DestinationError",
        getValue("Destination") ? "" : "Select a destination.");

    let validAddress = showError("AddressError",
        getValue("Address").length >= 10 ? "" : "Enter at least 10 characters.");

    let validNationality = showError("NationalityError",
        getValue("Nationality") ? "" : "Select your nationality.");

    let interests = document.querySelectorAll('input[name="interest"]:checked');
    let validInterest = showError("InterestError",
        interests.length > 0 ? "" : "Select at least one interest.");

    let emergency = getValue("EmergencyPhone");
    let validEmergency = showError("EmergencyError",
        validatePhone(emergency) &&
        emergency.replace(/\D/g, "") !== getValue("TouristPhone").replace(/\D/g, "")
        ? "" : "Enter a different valid emergency number.");

    let file = document.getElementById("TravelDocument").files[0];
    let validFile = showError("FileError",
        !file || (/\.(pdf|jpg|jpeg|png)$/i.test(file.name) && file.size <= 2097152)
        ? "" : "Select PDF, JPG or PNG up to 2 MB.");

    let username = getValue("UserName");
    let validUsername = showError("UserNameError",
        /^[A-Za-z0-9_]{4,15}$/.test(username) ? "" : "Username must be 4-15 characters.");

    let password = document.getElementById("Password").value;
    let validPassword = showError("PasswordError",
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
        ? "" : "Use 8 characters with uppercase, lowercase and number.");

    let validConfirm = showError("ConfirmError",
        password === document.getElementById("ConfirmPassword").value && password !== ""
        ? "" : "Passwords do not match.");

    let isValid = validName && validAge && validEmail && validPhone &&
        validGender && validDestination && validAddress && validNationality &&
        validInterest && validEmergency && validFile && validUsername &&
        validPassword && validConfirm;

    if (isValid) {
        saveTouristAccount();
    } else {
        showResult(false, "Please correct the highlighted fields.");
    }

    return false;
}

function saveTouristAccount() {

    let accounts = JSON.parse(localStorage.getItem("wandervista-tourist-accounts") || "[]");
    let username = getValue("UserName");

    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].username.toLowerCase() === username.toLowerCase()) {
            showError("UserNameError", "Username already exists.");
            showResult(false, "Choose another username.");
            return;
        }
    }

    let gender = document.querySelector('input[name="gender"]:checked').value;

    let interests = [];
    let selectedInterests = document.querySelectorAll('input[name="interest"]:checked');

    for (let i = 0; i < selectedInterests.length; i++) {
        interests.push(selectedInterests[i].value);
    }

    let profile = {
        TouristName: getValue("TouristName"),
        TouristAge: getValue("TouristAge"),
        TouristEmail: getValue("TouristEmail"),
        TouristPhone: getValue("TouristPhone"),
        gender: gender,
        Destination: getValue("Destination"),
        Address: getValue("Address"),
        Nationality: getValue("Nationality"),
        interest: interests,
        EmergencyPhone: getValue("EmergencyPhone"),
        UserName: username
    };

    let account = {
        username: username,
        password: document.getElementById("Password").value,
        name: getValue("TouristName"),
        profile: profile
    };

    accounts.push(account);

    localStorage.setItem("wandervista-tourist-accounts", JSON.stringify(accounts));

    showResult(true, "Tourist registered successfully!");

    document.getElementById("LoginAfterRegister").style.display = "inline-block";
}

function showResult(success, message) {
    let result = document.getElementById("ResultText");
    result.textContent = message;
    result.className = success ? "success" : "error";
}

function clearAllErrors() {

    let errors = document.querySelectorAll(".error");

    for (let i = 0; i < errors.length; i++) {
        errors[i].textContent = "";
    }

    document.getElementById("ResultText").textContent = "";
    document.getElementById("ResultText").className = "";
    document.getElementById("LoginAfterRegister").style.display = "none";
}
